import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function CommonNav({ isLoggedIn }) {
    const { data, loading } = useMe();
    return (
        <Tabs.Navigator  
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderTopColor: "rgba(255, 255, 255, 0.5)",
                    backgroundColor: "black",
                },
                tabBarActiveTintColor: "white",
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Home" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Search"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="CoffeeShop"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"cafe"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={"CoffeeShop"} />}
            </Tabs.Screen>
            <Tabs.Screen
                name="Me"
                options={{
                    tabBarIcon: ({ focused, color, size }) =>
                        data?.me?.avatarURL ? (
                            <Image
                                source={{ uri: data.me.avatarURL }}
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 10,
                                    ...(focused && { borderColor: "white", borderWidth: 1 }),
                                }}
                            />
                        ) : (
                            <TabIcon iconName={"person"} color={color} focused={focused} />
                        ),
                }}
            >
                {() => <SharedStackNav screenName={isLoggedIn ? "Me" : "LogIn"} />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
