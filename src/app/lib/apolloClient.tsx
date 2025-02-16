import {ApolloClient, InMemoryCache} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
	uri: "/api/proxy"
});

const createApolloClient = () => {
	return new ApolloClient({
		link: restLink,
		cache: new InMemoryCache(),
	});
};

export const apolloClient = createApolloClient();