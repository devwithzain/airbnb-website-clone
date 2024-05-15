import {
	getCurrentUser,
	getReservations,
	getListingById,
	EmptyState,
	TListingPageProps,
} from "@/app";
import ListingClient from "./ListingClient";

export default async function ListingPage({
	params,
}: {
	params: TListingPageProps;
}) {
	const listing = await getListingById(params);
	const reservations = await getReservations(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return <EmptyState />;
	}

	return (
		<ListingClient
			listing={listing}
			reservations={reservations}
			currentUser={currentUser}
		/>
	);
}
