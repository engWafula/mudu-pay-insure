"use client";

import { useState } from "react";
import { Input, Dropdown, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import type { MenuProps } from "antd";
import "tailwindcss/tailwind.css";

const SearchComponent = () => {
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<{ id: number; name: string }[]>([]);
	const router = useRouter(); // Initialize the router

	const handleSearch = async (value: string) => {
		setQuery(value);
		setLoading(true);

		// Simulate an API call for search results
		setTimeout(() => {
			setResults(
				value
					? Array.from({ length: 5 }, (_, i) => ({
							id: i + 1,
							name: `${value} Result ${i + 1}`,
					  }))
					: []
			);
			setLoading(false);
		}, 1000);
	};

	const handleSelect = (key: string) => {
		// Navigate to the details page based on the selected result's id
		router.push(`/details/${key}`);
	};

	const menuItems: MenuProps["items"] = results.map((result) => ({
		key: result.id.toString(), // Use id as the key
		label: result.name,
		onClick: () => handleSelect(result.id.toString()), // Handle selection
	}));

	return (
		<div className="flex w-full justify-center items-center h-[20%] my-5">
			<div className="w-full max-w-md">
				<Dropdown
					menu={{ items: menuItems }}
					open={
						query.length > 0 && results.length > 0 && !loading
					}
					trigger={["click"]}
				>
					<div>
						<Input
							className="border-2  border-gray-400 rounded-lg shadow-lg focus:border-blue-500 focus:ring-blue-500 transition-all"
							size="large"
							placeholder="Search company..."
							prefix={
								<SearchOutlined className="text-gray-500" />
							}
							value={query}
							onChange={(e) =>
								handleSearch(e.target.value)
							}
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
