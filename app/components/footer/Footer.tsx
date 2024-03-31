import Inspiration from "./Inspiration";
import Links from "./Links";
import Terms from "./Terms";

export default function Footer() {
	return (
		<section className="bg-[#f7f7f7]">
			<Inspiration />
			<Links />
			<Terms />
		</section>
	);
}