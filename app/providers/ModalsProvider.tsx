"use client";
import { LoginModal, RegisterModal, RentModal, SearchModal } from "@/app";

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
