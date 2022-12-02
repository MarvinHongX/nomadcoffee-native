import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Search({ navigation }) {
    return (
    <View
        style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        }}
    >
        <Text style={{ color: "white" }}>Search</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CoffeeShop")}>
            <Text style={{ color: "white" }}>Coffee Shop</Text>
        </TouchableOpacity>
    </View>
  );
}