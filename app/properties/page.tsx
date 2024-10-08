import { EmptyState } from "@/app/components";
import PropertiesClient from "./PropertiesClient";
import { getCurrentUser, getListings } from "@/app/actions";

export default async function PropertiesPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<EmptyState
				title="Unauthorized"
				subtitle="Please login"
			/>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No properties found"
				subtitle="Looks like you have no properties."
			/>
		);
	}

	return (
		<PropertiesClient
			listings={listings}
			currentUser={currentUser}
		/>
	);
}
