"use client";

import { useState } from "react";
import { Input, Dropdown, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; 
import type { MenuProps } from "antd";
import "tailwindcss/tailwind.css";

const SearchComponent = () => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<{ id: string; name: string }[]>([]);
	const router = useRouter(); 

	const handleSearch = async (value: string) => {
		setQuery(value);
		setLoading(true);

		try {
			const response = await fetch(`/api/search?search=${encodeURIComponent(value)}`);
			if (!response.ok) throw new Error("Failed to fetch");
			const data = await response.json();
			setResults(data.companies); // Adjust according to your API response structure
		} catch (error) {
			console.error("Search failed", error);
			setResults([]);
		} finally {
			setLoading(false);
		}
	};

	const handleSelect = (key: string) => {
		router.push(`/company/${key}`); // Navigate to the new page
	};

	const menuItems: MenuProps["items"] = results.map((result) => ({
		key: result.id, 
		label: result.name,
		onClick: () => handleSelect(result.id), 
	}));

	return (
		<div className="flex w-full justify-center items-center my-5">
			<div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
				<Dropdown
					menu={{ items: menuItems }}
					open={query.length > 0 && results.length > 0 && !loading}
					trigger={["click"]}
				>
					<div>
						<Input
							className=" focus:border-blue-500 focus:ring-blue-500 transition-all text-lg lg:text-xl h-14 lg:h-15"
							size="large"
							placeholder="Search company..."
							prefix={
								<SearchOutlined className="text-gray-500 text-xl" />
							}
							value={query}
							onChange={(e) => handleSearch(e.target.value)}
							suffix={loading ? <Spin /> : null}
						/>
					</div>
				</Dropdown>
				{!loading && query.length > 0 && results.length === 0 && (
					<div className="mt-2 text-center text-gray-500">
						No results found.
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchComponent;
