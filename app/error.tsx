"use client";
import { TErrorStateProps } from "@/types";
import { EmptyState } from "@/app/components";

export default function ErrorState({ error }: TErrorStateProps) {
	return (
		<EmptyState
			title="Uh Oh"
			subtitle="Something went wrong!"
		/>
	);
}
