import {ApolloClient, InMemoryCache} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTHORIZATION_TOKEN;

if (!API_URL || !AUTH_TOKEN) {
	throw new Error("API_URL or AUTH_TOKEN is missing in environment variables.");
}

const restLink = new RestLink({
	uri: API_URL,
	headers: {
		Authorization: "Bearer "+AUTH_TOKEN,
	}
});

const createApolloClient = () => {
	return new ApolloClient({
		link: restLink,
		cache: new InMemoryCache(),
	});
};

export const apolloClient = createApolloClient();