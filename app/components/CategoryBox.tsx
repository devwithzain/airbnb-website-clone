"use client";
import qs from "query-string";
import Image from "next/image";
import { useCallback } from "react";
import { TCategoryBoxProps } from "@/export";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryBox({
	src,
	label,
	selected,
}: TCategoryBoxProps) {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true },
		);

		router.push(url);
	}, [label, router, params]);

	return (
		<div
			onClick={handleClick}
			className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-3
        p-3
		  first:pl-0
		  last:pr-0
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
		  w-fit
		  shrink-0
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}>
			<Image
				src={src}
				width={24}
				height={24}
				alt="Category"
			/>
			<div className="font-medium text-xs">{label}</div>
		</div>
	);
}
