import { TFavoritesClientProps } from "@/types";
import { Heading, Container, ListingCard } from "@/app/components";

export default function FavoritesClient({
	listings,
	currentUser,
}: TFavoritesClientProps) {
	return (
		<Container>
			<Heading
				title="Favorites"
				subtitle="List of places you favorited!"
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
						currentUser={currentUser}
						key={listing.id}
						data={listing}
					/>
				))}
			</div>
		</Container>
	);
}
