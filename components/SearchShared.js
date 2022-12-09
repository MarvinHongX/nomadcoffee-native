import styled from "styled-components/native";

export const TextInputWrapper = styled.View`
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.13);
    border-width: 2px;
    padding: 10px;
    border-radius: 15px;
    width: ${(props) => props.width / 1.1}px;
`;

export const TextInput = styled.TextInput`
    color: white;
    margin-left: 10px;
    width: ${(props) => props.width / 1.1 - 60}px;
`;