import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
    query me($photosPage: Int!) {
        me {
            id
            username
            email
            name
            location
            avatarURL
            coffeeShops {
                id
                name
                slug
                latitude
                longitude
                photos(page: $photosPage) {
                    id
                    url
                }
                categories {
                    id
                    name
                }
                createdAt
                updatedAt
            }
        }
    }
`;


export default function useMe() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const { data, loading } = useQuery(ME_QUERY, {
        skip: !hasToken,
        variables: {
            photosPage:1,
        }
    });
    useEffect(() => {
        if (data?.me === null) {
            logUserOut();
        }
    }, [data]);
    return { data, loading };
}