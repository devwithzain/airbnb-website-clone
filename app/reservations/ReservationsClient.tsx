"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TReservationsClientProps } from "@/types";
import { Heading, Container, ListingCard } from "@/app/components";

export default function ReservationsClient({
	reservations,
	currentUser,
}: TReservationsClientProps) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reservation cancelled");
					router.refresh();
				})
				.catch(() => {
					toast.error("Something went wrong.");
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
				title="Reservations"
				subtitle="Bookings on your properties"
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
				{reservations.map((reservation: any) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancel guest reservation"
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
