"use client";
import dynamic from "next/dynamic";
import { useCountries } from "@/app/hooks";
import { TListingInfoProps } from "@/types";
import { Avatar, ListingCategory } from "@/app/components";

const Map = dynamic(() => import("../Map"), {
	ssr: false,
});

export default function ListingInfo({
	user,
	description,
	guestCount,
	roomCount,
	bathroomCount,
	category,
	locationValue,
}: TListingInfoProps) {
	const { getByValue } = useCountries();
	const coordinates = getByValue(locationValue)?.latlng;

	return (
		<div className="col-span-4 flex flex-col gap-8">
			<div className="flex flex-col gap-2">
				<div
					className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          ">
					<div>Hosted by {user?.name}</div>
					<Avatar src={user?.image} />
				</div>
				<div
					className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          ">
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					src={category.src}
					label={category?.label}
					description={category?.description}
				/>
			)}
			<hr />
			<div
				className="
      text-lg font-light text-neutral-500">
				{description}
			</div>
			<hr />
			<Map center={coordinates} />
		</div>
	);
}
