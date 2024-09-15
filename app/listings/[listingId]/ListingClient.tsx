"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	Container,
	ListingHead,
	ListingInfo,
	ListingReservation,
} from "@/app/components";
import { categories } from "@/constants";
import { useLoginModal } from "@/app/hooks";
import { TListingClientProps } from "@/types";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

export default function ListingClient({
	listing,
	reservations = [],
	currentUser,
}: TListingClientProps) {
	const router = useRouter();
	const loginModal = useLoginModal();

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation: any) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const category = useMemo(() => {
		return categories.find((items) => items.label === listing.category);
	}, [listing.category]);

	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}
		setIsLoading(true);

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			.then(() => {
				toast.success("Listing reserved!");
				setDateRange(initialDateRange);
				router.push("/trips");
			})
			.catch(() => {
				toast.error("Something went wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	return (
		<Container>
			<div
				className="
          max-w-screen-lg 
          mx-auto
        ">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div
						className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            ">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div
							className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              ">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value: any) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
