import PropertiesClient from "./PropertiesClient";
import { EmptyState, ClientOnly, getCurrentUser, getListings } from "@/app";

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

	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="No properties found"
					subtitle="Looks like you have no properties."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<PropertiesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
}
