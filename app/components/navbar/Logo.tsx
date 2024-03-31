import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";

export default function Logo() {
	return (
		<Link href={"/"}>
			<Image
				className="hidden md:block cursor-pointer"
				src={logo}
				height="100"
				width="100"
				alt="Logo"
			/>
		</Link>
	);
}
