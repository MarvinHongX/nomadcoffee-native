import React, { useEffect } from "react";
import { Text, View } from "react-native";


export default function CoffeeShop( navigate ) {
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Coffee Shop</Text>
        </View>
        
    );
}