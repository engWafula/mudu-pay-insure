"use client";
import { useParams } from "next/navigation";

const DetailsPage = () => {
	const { id } = useParams();

	return (
		<div className="flex w-full justify-center items-center h-screen bg-gray-50">
			<div className="text-center">
				<h1 className="text-3xl font-semibold">
					Details for Item {id}
				</h1>
				<p className="mt-4 text-lg">
					This is the details page for item with ID: {id}.
				</p>
			</div>
		</div>
	);
};

export default DetailsPage;
