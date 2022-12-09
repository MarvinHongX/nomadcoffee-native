import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import Message from "../components/Message";
import { TextInput, TextInputWrapper } from "../components/SearchShared";

const SEARCH_COFFEE_SHOPS_QUERY = gql`
    query searchCoffeeShops($keyword: String!, $offset: Int!, $photosPage: Int!) {
        searchCoffeeShops(keyword: $keyword, offset: $offset) {
            id
            name
            photos(page: $photosPage) {
                id
                url
            }
        }
    }
`;


export default function Search({ navigation }) {
    const numColumns = 3;
    const { width } = useWindowDimensions();
    const { setValue, register, watch, handleSubmit } = useForm();
    const [startQueryFn, { loading, data, called, refetch, fetchMore }] = useLazyQuery(SEARCH_COFFEE_SHOPS_QUERY);
    const onValid = ({ keyword }) => {
        startQueryFn({
            variables: {
                keyword,
                offset: 0,
                photosPage: 1,
            },
        });
    };

    const SearchBox = () => (
        <TextInputWrapper width={width}>
            <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.5)" />
            <TextInput
                width={width}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                placeholder="Search"
                autoCapitalize="none"
                returnKeyLabel="Search"
                returnKeyType="search"
                autoCorrect={false}
                onChangeText={(text) => setValue("keyword", text)}
                onSubmitEditing={handleSubmit(onValid)}
            />
        </TextInputWrapper>
        
    );
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        });
        register("keyword", {
            required: true,
            minLength: 1,
        });
    }, []);
    const renderCoffeShop = ({ item: coffeeShop }) => (
        <TouchableOpacity>
            <Image
                source={{ uri: coffeeShop.photos[0].url }}
                style={{
                    width: width / numColumns,
                    height: width / numColumns,
                }}
            />
        </TouchableOpacity>
    );
    return ( 
        <DismissKeyboard>
            <View style={{ flex: 1, backgroundColor: "black" }}>
            {loading ? (
                <Message text="Searching..." />
            ) : null}
            {!called ? (
                <Message text="Search by keyword" />
            ) : null}
            {data?.searchCoffeeShops !== undefined ? (
                data?.searchCoffeeShops?.length === 0 ? (
                    <Message text={`No results found for "${watch("keyword")}"`}  />
                ) : (
                    <FlatList
                        onEndReachedThreshold={0.02}
                        onEndReached={() =>
                            fetchMore({
                                variables: {
                                    offset: data?.searchCoffeeShops?.length,
                                    photosPage: 1
                                },
                            })
                        }
                        showsVerticalScrollIndicator={false}
                        numColumns={numColumns}
                        data={data?.searchCoffeeShops}
                        keyExtractor={(coffeeShop) => "" + coffeeShop.id}
                        renderItem={renderCoffeShop}
                    />
                )
            ) : null}
            </View>
        </DismissKeyboard>
    );
}
