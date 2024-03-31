import {
	getCurrentUser,
	getReservations,
	getListingById,
	ClientOnly,
	EmptyState,
	TListingPageProps,
} from "@/export";
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
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient
				listing={listing}
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
}
