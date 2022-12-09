import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Me from "../screens/Me";
import CoffeeShop from "../screens/CoffeeShop";
import { Image } from "react-native";
import useMe from "../hooks/useMe";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
    const { data, loading } = useMe();
    return (
    <Stack.Navigator
        screenOptions={{
            headerMode: "screen",
            headerBackTitleVisible: false,
            headerTintColor: "white",
            headerStyle: {
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
                shadowColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "black",
            },
        }}
    >
        {screenName === "Home" ? (
        <Stack.Screen
            name={"SharedStackHome"}
            component={Home}
            options={{
                headerTitle: () => (
                    <Image
                        style={{
                            width: 120,
                            height: 40,
                        }}
                        resizeMode="contain"
                        source={require("../assets/logo.png")}
                    />
                ),
            }}
        />
        ) : null}
        {screenName === "Search" ? (
            <Stack.Screen name={"SharedStackSearch"} component={Search} />
        ) : null}
        {screenName === "Me" ? (
            <Stack.Screen 
                name={"SharedStackMe"} 
                component={Me}
                options={{
                    title: data?.me?.username,
                }}
            /> 
        ) : null}
        {screenName === "CoffeeShop" ? (
            <Stack.Screen name={"SharedStackCoffeeShop"} component={CoffeeShop} /> 
        ) : null}
        
        {screenName === "LogIn" ? (
            <Stack.Screen 
                name="SharedStackLogIn" 
                component={LogIn} 
                options={{
                    headerTitle: () => null,
                }}
            />
        ) : null }
        <Stack.Screen name="SharedStackSignUp" component={SignUp} />
    </Stack.Navigator>
    );
}

