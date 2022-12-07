import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function CommonNav({ isLoggedIn }) {
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
                name="CommonTabHome"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"home"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Home" />}
            </Tabs.Screen>
            <Tabs.Screen
                name="CommonTabSearch"
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"search"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName="Search" />}
            </Tabs.Screen>
            <Tabs.Screen
                name={ isLoggedIn ? "CommonTabProfile" : "CommonTabLogIn" }
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"person"} color={color} focused={focused} />
                    ),
                }}
            >
                {() => <SharedStackNav screenName={ isLoggedIn ? "Profile" : "LogIn" } />}
            </Tabs.Screen>
        </Tabs.Navigator>
    );
}
