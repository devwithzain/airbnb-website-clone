"use client";
import { useEffect } from "react";
import { EmptyState, TErrorStateProps } from "@/export";

export default function ErrorState({ error }: TErrorStateProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<EmptyState
			title="Uh Oh"
			subtitle="Something went wrong!"
		/>
	);
}
