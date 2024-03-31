"use client";
import { TMenuItemProps } from "@/export";

export default function MenuItem({ onClick, label }: TMenuItemProps) {
	return (
		<div
			onClick={onClick}
			className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      ">
			{label}
		</div>
	);
}
