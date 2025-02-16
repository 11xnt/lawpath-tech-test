"use client";

import Dashboard from "@/app/dashboard/page";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/app/lib/apolloClient";
export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<ApolloProvider client={apolloClient}>
				<Dashboard/>
			</ApolloProvider>
		</div>
	);
}
