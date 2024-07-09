"use client";
import { LoginModal, RegisterModal, RentModal, SearchModal } from "@/app";
import { Suspense } from "react";

export default function ModalsProvider() {
	return (
		<>
			<LoginModal />
			<RegisterModal />
			<Suspense>
				<SearchModal />
			</Suspense>
			<RentModal />
		</>
	);
}
