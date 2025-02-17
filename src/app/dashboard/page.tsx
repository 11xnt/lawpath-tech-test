"use client";

import dynamic from "next/dynamic";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/app/lib/apolloClient";

const DashboardForm = dynamic(() => import("@/app/components/dashboardForm"), { ssr: false });

export default function Dashboard() {
	return (
		<ApolloProvider client={apolloClient}>
			<DashboardForm />
		</ApolloProvider>
	);
}