import { EmptyState } from "@/app/components";
import FavoritesClient from "./FavoritesClient";
import { getCurrentUser, getFavoriteListings } from "@/app/actions";

export default async function ListingPage() {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<EmptyState
				title="No favorites found"
				subtitle="Looks like you have no favorite listings."
			/>
		);
	}

	return (
		<FavoritesClient
			listings={listings}
			currentUser={currentUser}
		/>
	);
}
