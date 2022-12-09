import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text`
    margin-top: 15px;
    color: white;
    font-weight: 600;
`;
export default function Message({ loading, text }){
    return (
        <Container>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                null
            )}
            <Text> {text} </Text>
        </Container>
    );
}