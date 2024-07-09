"use client";
import { categories } from "@/constants";
import { CategoryBox, Container } from "@/app";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Categories() {
	const params = useSearchParams();
	const category = params?.get("category");
	const pathname = usePathname();
	const isMainPage = pathname === "/";

	if (!isMainPage) {
		return null;
	}

	return (
		<Container>
			<div
				className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
			 gap-3
        ">
				{categories.map((item) => (
					<Suspense key={item.label}>
						<CategoryBox
							label={item.label}
							src={item.src}
							selected={category === item.label}
						/>
					</Suspense>
				))}
			</div>
		</Container>
	);
}
