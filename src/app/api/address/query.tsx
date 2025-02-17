import {gql} from '@apollo/client';

export const FETCH_DATA_QUERY = gql`
  query FetchAddress($q: String!, $state: String!) {
  fetchAddress(q: $q, state: $state)
  @rest(type: "Get", path: "?q={args.q}&state={args.state}") {
    localities {
    	locality {
    		postcode
    		state
    		location
    	}
    }
  }
}
`;