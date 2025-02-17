import Login from "@/app/login/page";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/next-auth";
import Dashboard from "@/app/dashboard/page";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const user = session?.user;
	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-100">
			{user ? (
				<Dashboard/>
			) : (
				<Login/>
			)}
		</main>
	)
}
