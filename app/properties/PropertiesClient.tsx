"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TPropertiesClientProps } from "@/types";
import { ListingCard, Container, Heading } from "@/app/components";

export default function PropertiesClient({
	listings,
	currentUser,
}: TPropertiesClientProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onDelete = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success("Listing deleted");
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router],
	);

	return (
		<Container>
			<Heading
				title="Properties"
				subtitle="List of your properties"
			/>
			<div
				className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
				{listings.map((listing: any) => (
					<ListingCard
						key={listing.id}
						data={listing}
						actionId={listing.id}
						onAction={onDelete}
						disabled={deletingId === listing.id}
						actionLabel="Delete property"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
