import {
	Navbar,
	LoginModal,
	RegisterModal,
	RentModal,
	SearchModal,
	Footer,
} from "@/app/components";
import "@/styles/globals.css";
import { Suspense } from "react";
import { Nunito } from "next/font/google";
import { getCurrentUser } from "@/app/actions";
import { ToasterProvider } from "@/app/providers";

const font = Nunito({
	subsets: ["latin"],
});

export const metadata = {
	title: "Airbnb | Vacation rentals, cabins ,beach houses & more",
	description: "Airbnb website Clone By Zain Ali",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<LoginModal />
				<RegisterModal />
				<Suspense>
					<SearchModal />
				</Suspense>
				<RentModal />
				<Navbar currentUser={currentUser} />
				<div className="pt-28">
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
