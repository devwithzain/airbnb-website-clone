"use client";
import qs from "query-string";
import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import {
	useSearchModal,
	Modal,
	Calendar,
	Counter,
	CountrySelect,
	Heading,
	TCountrySelectValue,
	SearchModalSTEPS,
} from "@/app";

export default function SearchModal() {
	const router = useRouter();
	const searchModal = useSearchModal();
	const params = useSearchParams();

	const [step, setStep] = useState(SearchModalSTEPS.LOCATION);

	const [location, setLocation] = useState<TCountrySelectValue>();
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[],
	);

	const onBack = useCallback(() => {
		setStep((value) => value - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((value) => value + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== SearchModalSTEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true },
		);

		setStep(SearchModalSTEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		searchModal,
		location,
		router,
		guestCount,
		roomCount,
		dateRange,
		onNext,
		bathroomCount,
		params,
	]);

	const actionLabel = useMemo(() => {
		if (step === SearchModalSTEPS.INFO) {
			return "Search";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === SearchModalSTEPS.LOCATION) {
			return undefined;
		}

		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Where do you wanna go?"
				subtitle="Find the perfect location!"
			/>
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as TCountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	if (step === SearchModalSTEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="When do you plan to go?"
					subtitle="Make sure everyone is free!"
				/>
				<Calendar
					onChange={(value) => setDateRange(value.selection)}
					value={dateRange}
				/>
			</div>
		);
	}

	if (step === SearchModalSTEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="More information"
					subtitle="Find your perfect place!"
				/>
				<Counter
					onChange={(value) => setGuestCount(value)}
					value={guestCount}
					title="Guests"
					subtitle="How many guests are coming?"
				/>
				<hr />
				<Counter
					onChange={(value) => setRoomCount(value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many rooms do you need?"
				/>
				<hr />
				<Counter
					onChange={(value) => {
						setBathroomCount(value);
					}}
					value={bathroomCount}
					title="Bathrooms"
					subtitle="How many bahtrooms do you need?"
				/>
			</div>
		);
	}

	return (
		<Modal
			isOpen={searchModal.isOpen}
			title="Filters"
			actionLabel={actionLabel}
			onSubmit={onSubmit}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === SearchModalSTEPS.LOCATION ? undefined : onBack}
			onClose={searchModal.onClose}
			body={bodyContent}
		/>
	);
}
