import CommandBar from "@/components/InsightStream/CommandBar";
import Footer from "@/components/InsightStream/Footer";
import Navbar from "@/components/InsightStream/Navbar";
import Sidebar from "@/components/InsightStream/Sidebar"
import Modal from "@/components/Modal";
import DashboardBackground from "@/style/DashboardBackground";
import GradientAnimation from "@/style/GradientAnimation"
import { SessionProvider } from "next-auth/react";

// grid grid-cols-[15rem_1fr]

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SessionProvider>
			<div className="flex flex-col">
				<CommandBar />
				<div className="flex">
					<Sidebar />
					<div className="h-full min-h-screen max-lg:h-fit w-full">
						<Navbar />
						<Modal />
						{children}
					</div>
				</div>
				<GradientAnimation />
				<DashboardBackground />
				<Footer />
			</div>
		</SessionProvider>
	)
}