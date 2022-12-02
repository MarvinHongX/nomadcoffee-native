import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";

export const SEE_COFFEE_SHOPS_QUERY = gql`
    query seeCoffeeShops($page: Int!, $photosPage: Int!){
        seeCoffeeShops(page: $page){
            id
            name
            slug
            latitude
            longitude
            user {
                username
                avatarURL
            }
            photos(page: $photosPage) {
                id
                url
            }
            categories {
                id
                name
            }
        }       
    }
`;

export default function Home(){
    const page = 1;
    const photosPage = 1;
    const { data } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
        variables: {
            page,
            photosPage
        },
    });
    return (
        <View
        style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            <Text style={{ color: "white" }}>Home</Text>
        </View>
    );
}