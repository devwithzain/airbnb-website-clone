import {
	Navbar,
	LoginModal,
	RegisterModal,
	RentModal,
	ToasterProvider,
	getCurrentUser,
	SearchModal,
	Footer,
} from "@/app";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import { Suspense } from "react";

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
