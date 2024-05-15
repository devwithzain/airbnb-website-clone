"use client";
import { EmptyState, TErrorStateProps } from "@/app";

export default function ErrorState({ error }: TErrorStateProps) {
	return (
		<EmptyState
			title="Uh Oh"
			subtitle="Something went wrong!"
		/>
	);
}
