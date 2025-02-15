"use client";

import AddressForm from "./pages/addressForm";
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "@/app/lib/apolloClient";

export default function Home() {
	return (
		<ApolloProvider client={apolloClient}>
			<AddressForm/>
		</ApolloProvider>
	);
}
