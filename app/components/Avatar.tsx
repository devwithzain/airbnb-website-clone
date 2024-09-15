import Image from "next/image";
import { TAvatarProps } from "@/types";

export default function Avatar({ src }: TAvatarProps) {
	return (
		<Image
			className="rounded-full"
			height="30"
			width="30"
			sizes="30px"
			alt="Avatar"
			src={src || "/placeholder.svg"}
		/>
	);
}
