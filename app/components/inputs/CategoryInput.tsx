import { TCategoryInputProps } from "@/types";
import Image from "next/image";

export default function CategoryBox({
	src,
	label,
	selected,
	onClick,
}: TCategoryInputProps) {
	return (
		<div
			onClick={() => onClick(label)}
			className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}>
			<Image
				src={src}
				alt="icon"
				width={30}
				height={30}
				sizes="30px"
			/>
			<div className="font-semibold">{label}</div>
		</div>
	);
}
