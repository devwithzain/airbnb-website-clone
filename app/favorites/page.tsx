import {
	EmptyState,
	ClientOnly,
	getCurrentUser,
	getFavoriteListings,
} from "@/app";
import FavoritesClient from "./FavoritesClient";

export default async function ListingPage() {
	const listings = await getFavoriteListings();
	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No favorites found"
					subtitle="Looks like you have no favorite listings."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
}
