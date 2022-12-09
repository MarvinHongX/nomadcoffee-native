import React, { useEffect } from "react";
import {
    FlatList,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    View,
    Text,
} from "react-native";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";
import DismissKeyboard from "../components/DismissKeyboard";
import Message from "../components/Message";

export default function Me() {
    const numColumns = 3;
    const { width } = useWindowDimensions();
    const { data, loading } = useMe();
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
    return(
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <TouchableOpacity onPress={() => logUserOut()}>
                <Text 
                    style={{ 
                        color: "white",
                        textAlign: "center",
                        marginTop: 20
                    }}
                >
                    Log Out
                </Text>
            </TouchableOpacity>
            <DismissKeyboard>
                <View style={{ flex: 1, backgroundColor: "black" }}>
                {loading ? (
                    <Message text="Searching..." />
                ) : null}
                {data?.me !== undefined ? (
                    data?.me?.length === 0 ? (
                        <Message text={`No results found for ${data?.me?.username}`}  />
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={numColumns}
                            data={data?.me?.coffeeShops}
                            keyExtractor={(coffeeShop) => "" + coffeeShop.id}
                            renderItem={renderCoffeShop}
                        />
                    )
                ) : null}
                </View>
            </DismissKeyboard>
        </View>
    );
}