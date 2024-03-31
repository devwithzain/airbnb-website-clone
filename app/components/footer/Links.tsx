import Link from "next/link";
import { footerLinks } from "@/constants";

export default function Links() {
	return (
		<div className="w-full py-[60px] border-t-[1.5px] border-[#ddd]">
			<div className="w-full flex gap-[20px] px-[40px]">
				{footerLinks.map((item) => (
					<div
						key={item.id}
						className="w-1/3 flex flex-col gap-[10px]">
						<div>
							<h3 className="text-[16px] leading-[18px] font-semibold mb-[10px]">
								{item.title}
							</h3>
						</div>
						{item.links.map((item) => (
							<div key={item.id}>
								<Link
									className="text-[15px] font-normal tracking-wide hover:underline"
									href={"/"}>
									{item.title}
								</Link>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
