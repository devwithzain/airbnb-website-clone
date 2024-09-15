"use client";
import { THeartButtonProps } from "@/types";
import useFavorite from "@/app/hooks/useFavorite";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function HeartButton({
	listingId,
	currentUser,
}: THeartButtonProps) {
	const { hasFavorited, toggleFavorite } = useFavorite({
		listingId,
		currentUser,
	});

	return (
		<div
			onClick={toggleFavorite}
			className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      ">
			<AiOutlineHeart
				size={28}
				className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
			/>
			<AiFillHeart
				size={24}
				className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
			/>
		</div>
	);
}
