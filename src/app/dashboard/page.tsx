"use client";

import dynamic from "next/dynamic";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/app/lib/apolloClient";
import LogoutForm from "@/app/components/logoutForm";

const DashboardForm = dynamic(() => import("@/app/components/dashboardForm"), { ssr: false });

export default function Dashboard() {
	return (
		<div>
			<LogoutForm/>
			<ApolloProvider client={apolloClient}>
				<DashboardForm/>
			</ApolloProvider>
		</div>
	);
}