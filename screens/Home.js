import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CoffeeShop from "../components/CoffeeShop";
import ScreenLayout from "../components/ScreenLayout";

const SEE_COFFEE_SHOPS_QUERY = gql`
    query seeCoffeeShops($offset: Int!, $photosPage: Int!){
        seeCoffeeShops(offset: $offset){
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
            createdAt
            updatedAt
        }       
    }
`;

export default function Home(){
    const { data, loading, refetch, fetchMore } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
        variables: {
            offset: 0,
            photosPage: 1
        },
    });
    const renderCoffeShop = ({ item: coffeShop }) => {
        return <CoffeeShop {...coffeShop} />;
    };
    const refresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };
    const [refreshing, setRefreshing] = useState(false);
    return (
        <ScreenLayout loading={loading}>
            <FlatList
                onEndReachedThreshold={0.02}
                onEndReached={() =>
                    fetchMore({
                        variables: {
                            offset: data?.seeCoffeeShops?.length,
                            photosPage: 1
                        },
                    })
                }
                refreshing={refreshing} 
                onRefresh={refresh}
                style={{ width: "100%" }}m
                showsVerticalScrollIndicator={false}
                data={data?.seeCoffeeShops}
                keyExtractor={(coffeShop) => "" + coffeShop.id}
                renderItem={renderCoffeShop}
            />
        </ScreenLayout>
    );
}