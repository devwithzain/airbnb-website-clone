// exported differents components types

import * as z from "zod";
import { IconType } from "react-icons";
import { StaticImageData } from "next/image";
import { Range, RangeKeyDict } from "react-date-range";
import { Listing, Reservation, User } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


export const loginFormSchema = z.object({
   email: z.string().email().optional(),
   password: z.string().min(1, {
      message: "Password is required",
   }).optional(),
});

export const registerFormSchema = z.object({
   name: z.string().min(1, {
      message: "Name is required",
   }).optional(),
   email: z.string().email({
      message: "Email is required",
   }).optional(),
   password: z.string().min(6, {
      message: "Minimum 6 characters required",
   }).optional(),
});

export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TregisterFormData = z.infer<typeof registerFormSchema>;

export type SafeListing = Omit<Listing, "createdAt"> & {
   createdAt: string;
};

export type SafeReservation = Omit<
   Reservation,
   "createdAt" | "startDate" | "endDate" | "listing"
> & {
   createdAt: string;
   startDate: string;
   endDate: string;
   listing: SafeListing;
};

export type SafeUser = Omit<
   User,
   "createdAt" | "updatedAt" | "emailVerified"
> & {
   createdAt: string;
   updatedAt: string;
   emailVerified: string | null;
};

export type TButtonProps = {
   label: string;
   onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
   disabled?: boolean;
   outline?: boolean;
   small?: boolean;
   icon?: IconType;
};

export type TCategoryBoxProps = {
   src: StaticImageData;
   label: string;
   selected?: boolean;
};

export type THomeProps = {
   searchParams: TListingsProps;
};
export type TErrorStateProps = {
   error: Error;
};
export type TAvatarProps = {
   src: string | null | undefined;
};

export type TEmptyStateProps = {
   title?: string;
   subtitle?: string;
   showReset?: boolean;
};


export type THeadingProps = {
   title: string;
   subtitle?: string;
   center?: boolean;
};

export type THeartButtonProps = {
   listingId: string;
   currentUser?: SafeUser | null;
};

export type TMapProps = {
   center?: number[];
};

export type TDatePickerProps = {
   value: Range,
   onChange: (value: RangeKeyDict) => void;
   disabledDates?: Date[];
};

export type TCategoryInputProps = {
   src: StaticImageData;
   label: string;
   selected?: boolean;
   onClick: (value: string) => void;
};

export type TCounterProps = {
   title: string;
   subtitle: string;
   value: number;
   onChange: (value: number) => void;
};

export type TCountrySelectValue = {
   flag: string;
   label: string;
   latlng: number[];
   region: string;
   value: string;
};

export type TCountrySelectProps = {
   value?: TCountrySelectValue;
   onChange: (value: TCountrySelectValue) => void;
};

export type TInputProps = {
   id: string;
   label: string;
   type?: string;
   disabled?: boolean;
   formatPrice?: boolean;
   required?: boolean;
   register: UseFormRegister<FieldValues>,
   errors: FieldErrors;
};

export type TImageUploadProps = {
   onChange: (value: string) => void;
   value: string;
};

export type TListingCardProps = {
   data: SafeListing;
   reservation?: SafeReservation;
   onAction?: (id: string) => void;
   disabled?: boolean;
   actionLabel?: string;
   actionId?: string;
   currentUser?: SafeUser | null;
};

export type TCategoryViewProps = {
   src: StaticImageData;
   label: string,
   description: string;
};

export type TListingHeadProps = {
   title: string;
   locationValue: string;
   imageSrc: string;
   id: string;
   currentUser?: SafeUser | null;
};

export type TListingInfoProps = {
   user: SafeUser,
   description: string;
   guestCount: number;
   roomCount: number;
   bathroomCount: number;
   category: {
      src: StaticImageData,
      label: string;
      description: string;
   } | undefined;
   locationValue: string;
};

export type TListingReservationProps = {
   price: number;
   dateRange: Range,
   totalPrice: number;
   onChangeDate: (value: Range) => void;
   onSubmit: () => void;
   disabled?: boolean;
   disabledDates: Date[];
};

export type TModalProps = {
   isOpen?: boolean;
   onClose: () => void;
   onSubmit: () => void;
   title?: string;
   body?: React.ReactElement;
   footer?: React.ReactElement;
   actionLabel: string;
   disabled?: boolean;
   secondaryAction?: () => void;
   secondaryActionLabel?: string;
};

export enum RentModalSTEPS {
   CATEGORY = 0,
   LOCATION = 1,
   INFO = 2,
   IMAGES = 3,
   DESCRIPTION = 4,
   PRICE = 5,
}

export enum SearchModalSTEPS {
   LOCATION = 0,
   DATE = 1,
   INFO = 2,
}

export type TMenuItemProps = {
   onClick: () => void;
   label: string;
};

export type TNavbarProps = {
   currentUser?: SafeUser | null;
};

export type TUserMenuProps = {
   currentUser?: SafeUser | null;
};

export type TGetListinByIdProps = {
   listingId?: string;
};

export type TListingsProps = {
   userId?: string;
   guestCount?: number;
   roomCount?: number;
   bathroomCount?: number;
   startDate?: string;
   endDate?: string;
   locationValue?: string;
   category?: string;
};

export type TGetReservationsIProps = {
   listingId?: string;
   userId?: string;
   authorId?: string;
};

export type TFavoritesClientProps = {
   listings: SafeListing[];
   currentUser?: SafeUser | null;
};

export type TIUseFavorite = {
   listingId: string;
   currentUser?: SafeUser | null;
};

export type ThooksProps = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
};

export type TListingClientProps = {
   reservations?: SafeReservation[];
   listing: SafeListing & {
      user: SafeUser;
   };
   currentUser?: SafeUser | null;
};

export type TListingPageProps = {
   listingId?: string;
};

export type TPropertiesClientProps = {
   listings: SafeListing[],
   currentUser?: SafeUser | null,
};

export type TReservationsClientProps = {
   reservations: SafeReservation[];
   currentUser?: SafeUser | null;
};

export type TTripsClientProps = {
   reservations: SafeReservation[],
   currentUser?: SafeUser | null,
};

export type THooksProps = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
};