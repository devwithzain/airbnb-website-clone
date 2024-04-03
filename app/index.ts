// exported differents components types
import { IconType } from "react-icons";
import { Range, RangeKeyDict } from "react-date-range";
import { Listing, Reservation, User } from "@prisma/client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { StaticImageData } from "next/image";

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

// exported differents components

export { default as getCurrentUser } from '../app/actions/getCurrentUser';
export { default as getListings } from '../app/actions/getListings';
export { default as Container } from '../app/components/Container';
// export { default as ListingCard } from '../app/components/listings/ListingCard';
export { default as EmptyState } from '../app/components/EmptyState';
export { default as ClientOnly } from '../app/components/ClientOnly';
export { default as Loader } from '../app/components/Loader';
export { default as Navbar } from '../app/components/navbar/Navbar';
export { default as LoginModal } from '../app/components/modals/LoginModal';
export { default as RegisterModal } from '../app/components/modals/RegisterModal';
export { default as SearchModal } from '../app/components/modals/SearchModal';
export { default as RentModal } from '../app/components/modals/RentModal';
export { default as ToasterProvider } from '../app/providers/ToasterProvider';
export { default as Heading } from '../app/components/Heading';
export { default as Button } from '../app/components/Button';
export { default as useFavorite } from '../app/hooks/useFavorite';
export { default as useCountries } from '../app/hooks/useCountries';
export { default as HeartButton } from '../app/components/HeartButton';
export { default as Avatar } from '../app/components/Avatar';
export { default as ListingCategory } from '../app/components/listings/ListingCategory';
export { default as Calendar } from '../app/components/inputs/Calendar';
export { default as useRegisterModal } from '../app/hooks/useRegisterModal';
export { default as useLoginModal } from '../app/hooks/useLoginModal';
export { default as useRentModal } from '../app/hooks/useRentModal';
export { default as useSearchModal } from '../app/hooks/useSearchModal';
export { default as Modal } from '../app/components/modals/Modal';
export { default as Input } from '../app/components/inputs/Input';
export { default as Counter } from '../app/components/inputs/Counter';
export { default as ImageUpload } from '../app/components/inputs/ImageUpload';
export { default as CategoryInput } from '../app/components/inputs/CategoryInput';
export { default as CountrySelect } from '../app/components/inputs/CountrySelect';
export { default as Categories } from '../app/components/navbar/Categories';
export { default as CategoryBox } from '../app/components/CategoryBox';
export { default as Logo } from '../app/components/navbar/Logo';
export { default as Search } from '../app/components/navbar/Search';
export { default as UserMenu } from '../app/components/navbar/UserMenu';
export { default as MenuItem } from '../app/components/navbar/MenuItem';
export { default as getFavoriteListings } from '../app/actions/getFavoriteListings';
export { default as getListingById } from '../app/actions/getListingById';
export { default as ListingReservation } from '../app/components/listings/ListingReservation';
export { default as ListingInfo } from '../app/components/listings/ListingInfo';
export { default as ListingHead } from '../app/components/listings/ListingHead';
export { default as getReservations } from '../app/actions/getReservations';
export { default as ListingCard } from '../app/components/listings/ListingCard';
export { default as authOptions } from '../app/libs/prismadb';
export { default as prisma } from "../app/libs/prismadb";