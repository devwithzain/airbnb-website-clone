"use client";
import {
	LoginModal,
	RegisterModal,
	RentModal,
	SearchModal,
} from "@/app/components";

export default function ModalsProvider() {
	return (
		<>
			<LoginModal />
			<RegisterModal />
			<SearchModal />
			<RentModal />
		</>
	);
}
