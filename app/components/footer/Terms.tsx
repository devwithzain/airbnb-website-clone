import Link from "next/link";
import Image from "next/image";
import { facebook, instagram, language, privacy, twitter } from "@/public";

export default function Terms() {
	const date = new Date();
	return (
		<div className="w-full flex items-center justify-between py-[20px] border-t border-[#21212122] px-[40px]">
			<div className="flex gap-[20px] items-center">
				<p className="text-[14px] leading-[18px] font-normal">
					© {date.getFullYear()} Airbnb, Inc.
				</p>
				<div className="flex gap-4">
					<Link
						href={"/"}
						className="text-[14px] font-normal">
						Terms
					</Link>
					<Link
						href={"/"}
						className="text-[14px] font-normal">
						Sitemap
					</Link>
					<Link
						href={"/"}
						className="text-[14px] font-normal">
						Privacy
					</Link>
					<div className="flex items-center gap-2">
						<Link
							href={"/"}
							className="text-[14px] font-normal">
							Your Privacy Choices
						</Link>
						<Image
							src={privacy}
							alt="img"
							width={25}
							height={25}
							sizes="25px"
						/>
					</div>
				</div>
			</div>
			<div className="flex gap-[20px] items-center">
				<div className="flex gap-6 items-center">
					<div className="flex items-center gap-2">
						<Image
							src={language}
							alt="img"
							width={20}
							height={20}
							sizes="20px"
						/>
						<Link
							href={"/"}
							className="text-[14px] font-extrabold">
							English (US)
						</Link>
					</div>
					<Link
						href={"/"}
						className="text-[14px] font-extrabold">
						$ USD
					</Link>
					<div className="flex gap-3 items-center">
						<Image
							src={facebook}
							alt="img"
							width={20}
							height={20}
							sizes="20px"
						/>
						<Image
							src={twitter}
							alt="img"
							width={20}
							sizes="20px"
							height={20}
						/>
						<Image
							src={instagram}
							alt="img"
							width={20}
							sizes="20px"
							height={20}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
