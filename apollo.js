import { ApolloClient, createHttpLink, gql, InMemoryCache, makeVar, useMutation } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async () => {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
    await client.cache.evict({ 
        id: "ROOT_QUERY", 
        field: "me",
    },);
    await client.cache.evict({ 
        id: "ROOT_QUERY", 
        field: "seeProfile"
    },);
    cache.gc();
};


const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            token: tokenVar(),
        },
    };
});

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                seeCoffeeShops: offsetLimitPagination(),
                searchCoffeeShops: {
                    keyArgs: ["keyword"],
                    merge(existing = [], incoming = []) {
                        return [...existing, ...incoming];
                    }
                },
            },
        },
        /*
		User: {
			keyFields: (obj) => `User:${obj.username}`,
		},
        */
    },
});
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
});
export default client;
