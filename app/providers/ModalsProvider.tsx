"use client";
import { LoginModal, RegisterModal, RentModal, SearchModal } from "@/export";

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
