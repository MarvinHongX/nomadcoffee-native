import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";

export default function Profile() {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>My Profile</Text>
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
    </View>

  );
}