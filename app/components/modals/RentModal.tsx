"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { categories } from "@/constants";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
	Modal,
	Heading,
	Input,
	Counter,
	ImageUpload,
	CategoryInput,
	CountrySelect,
} from "@/app/components";
import { RentModalSTEPS } from "@/types";
import { useRentModal } from "@/app/hooks";

export default function RentModal() {
	const router = useRouter();
	const rentModal = useRentModal();

	const [isLoading, setIsLoading] = useState(false);
	const [step, setStep] = useState(RentModalSTEPS.CATEGORY);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const location = watch("location");
	const category = watch("category");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(
		() =>
			dynamic(() => import("../Map"), {
				ssr: false,
			}),
		[],
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== RentModalSTEPS.PRICE) {
			return onNext();
		}

		setIsLoading(true);

		axios
			.post("/api/listings", data)
			.then(() => {
				toast.success("Listing created!");
				router.refresh();
				reset();
				setStep(RentModalSTEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch(() => {
				toast.error("Something went wrong.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === RentModalSTEPS.PRICE) {
			return "Create";
		}

		return "Next";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === RentModalSTEPS.CATEGORY) {
			return undefined;
		}

		return "Back";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describes your place?"
				subtitle="Pick a category"
			/>
			<div
				className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        ">
				{categories.map((item) => (
					<div
						key={item.label}
						className="col-span-1">
						<CategoryInput
							onClick={(category) => setCustomValue("category", category)}
							selected={category === item.label}
							label={item.label}
							src={item.src}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === RentModalSTEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you!"
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === RentModalSTEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenitis do you have?"
				/>
				<Counter
					onChange={(value) => setCustomValue("guestCount", value)}
					value={guestCount}
					title="Guests"
					subtitle="How many guests do you allow?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue("roomCount", value)}
					value={roomCount}
					title="Rooms"
					subtitle="How many rooms do you have?"
				/>
				<hr />
				<Counter
					onChange={(value) => setCustomValue("bathroomCount", value)}
					value={bathroomCount}
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
				/>
			</div>
		);
	}

	if (step === RentModalSTEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add a photo of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload
					onChange={(value) => setCustomValue("imageSrc", value)}
					value={imageSrc}
				/>
			</div>
		);
	}

	if (step === RentModalSTEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subtitle="Short and sweet works best!"
				/>
				<Input
					id="title"
					label="Title"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === RentModalSTEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Now, set your price"
					subtitle="How much do you charge per night?"
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			disabled={isLoading}
			isOpen={rentModal.isOpen}
			title="Airbnb your home!"
			actionLabel={actionLabel}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === RentModalSTEPS.CATEGORY ? undefined : onBack}
			onClose={rentModal.onClose}
			body={bodyContent}
		/>
	);
}
