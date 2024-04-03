import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import {
	Navbar,
	LoginModal,
	RegisterModal,
	RentModal,
	ToasterProvider,
	ClientOnly,
	getCurrentUser,
	SearchModal,
} from "@/app";

export const metadata = {
	title: "Airbnb | Vacation rentals, cabins ,beach houses & more",
	description: "Airbnb Clone",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en">
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<LoginModal />
					<RegisterModal />
					<SearchModal />
					<RentModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="pt-28">{children}</div>
			</body>
		</html>
	);
}
