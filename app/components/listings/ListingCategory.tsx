import Image from "next/image";
import { TCategoryViewProps } from "@/types";

export default function CategoryView({
	src,
	label,
	description,
}: TCategoryViewProps) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row items-center gap-4">
				<Image
					src={src}
					alt="icon"
					className="text-neutral-600"
				/>
				<div className="flex flex-col">
					<div className="text-lg font-semibold">{label}</div>
					<div className="text-neutral-500 font-light">{description}</div>
				</div>
			</div>
		</div>
	);
}
