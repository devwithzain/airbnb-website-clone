import Image from "next/image";
import { TAvatarProps } from "@/app";

export default function Avatar({ src }: TAvatarProps) {
	return (
		<Image
			className="rounded-full"
			height="30"
			width="30"
			alt="Avatar"
			src={src || "/placeholder.svg"}
		/>
	);
}
