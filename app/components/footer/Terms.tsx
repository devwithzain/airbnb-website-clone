import { termsItems } from "@/constants";
import Link from "next/link";

export default function Terms() {
	const date = new Date();
	return (
		<div className="w-full flex items-center justify-between py-[20px] border-t border-[#f1f1f1]">
			<div className="flex gap-[20px] items-center">
				<p className="text-[14px] leading-[18px] font-normal">
					© {date.getFullYear()} Airbnb, Inc.
				</p>
				<div className="flex gap-[20px]">
					<li className="">
						<Link href={"/"}>Terms</Link>
					</li>
					<li className="">
						<Link href={"/"}>Terms</Link>
					</li>
					<li className="">
						<Link href={"/"}>Terms</Link>
					</li>
					<li className="">
						<Link href={"/"}>Terms</Link>
					</li>
					<li className="">
						<Link href={"/"}>Terms</Link>
					</li>
				</div>
			</div>
			{/* {termsItems.map((item) => (
			<>
				<p className="text-[14px] leading-[18px] font-normal">
					© {date.getFullYear()} Airbnb, Inc.
				</p>
				{item.links.map((link) => (
					<div key={link.id}>
						<ul>
							<li>
								<Link href={"/"}>{link.title}</Link>
							</li>
						</ul>
					</div>
				))}
			</>
			))} */}
			<div className=""></div>
		</div>
	);
}
