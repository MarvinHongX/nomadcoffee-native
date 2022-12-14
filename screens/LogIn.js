import { gql, useMutation } from "@apollo/client";
import React, { useRef, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

export default function Login({ navigation, route: { params } }) {
    const goToSignUp = () => navigation.navigate("SignUp");
    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            password: params?.password,
            username: params?.username,
        },
    });
    const passwordRef = useRef();
    const onCompleted = async (data) => {
        const {
            login: { ok, token },
        } = data;
        if (ok) {
            await logUserIn(token);
        }
    };
    const [logInMutation, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            logInMutation({
                variables: {
                    ...data,
                },
            });
        }
    };
  
    useEffect(() => {
        register("username", {
            required: true
        });
        register("password", {
            required: true
        });
    }, [register]);
    return (
        <AuthLayout>
            <TextInput
                value={watch("username")}
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize="none"
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                value={watch("password")}
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Log In"
                loading={loading}
                disabled={!watch("username") || !watch("password")}
                onPress={handleSubmit(onValid)}
            />
            <TouchableOpacity onPress={goToSignUp}>
                <Text 
                    style={{ 
                        color: "white",
                        textAlign: "center",
                        marginTop: 20
                    }}
                >
                    Sign up
                </Text>
            </TouchableOpacity>
        </AuthLayout>
        );
}