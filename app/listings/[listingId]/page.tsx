import ListingClient from "./ListingClient";
import { TListingPageProps } from "@/types";
import { EmptyState } from "@/app/components";
import { getCurrentUser, getListingById, getReservations } from "@/app/actions";

export default async function ListingPage({
	params,
}: {
	params: TListingPageProps;
}) {
	const currentUser = await getCurrentUser();
	const listing = await getListingById(params);
	const reservations = await getReservations(params);

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
