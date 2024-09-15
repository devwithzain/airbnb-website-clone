"use client";
import Image from "next/image";
import { useCountries } from "@/app/hooks";
import { TListingHeadProps } from "@/types";
import { Heading, HeartButton } from "@/app/components";

export default function ListingHead({
	title,
	locationValue,
	imageSrc,
	id,
	currentUser,
}: TListingHeadProps) {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div
				className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        ">
				<Image
					src={imageSrc}
					fill
					className="object-cover w-full"
					alt="Image"
				/>
				<div
					className="
            absolute
            top-5
            right-5
          ">
					<HeartButton
						listingId={id}
						currentUser={currentUser}
					/>
				</div>
			</div>
		</>
	);
}
