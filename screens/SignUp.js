import React, { useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/auth/AuthShared";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $name: String!
        $password: String!
    ) {
        createAccount(
            username: $username
            email: $email
            name: $name
            password: $password
        ) {
            ok
            error
        }
    }
`;


export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onCompleted = (data) => {
        const {
            createAccount: { ok },
        } = data;
        const { username, password } = getValues();
        if (ok) {
            navigation.navigate("LogIn", {
                username,
                password,
            });
        }
    };
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION,{
        onCompleted,
    });
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
  
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                },
            });
        }
    };
    useEffect(() => {
        register("name", {
            required: true
        });
        register("username", {
            required: true
        });
        register("email", {
            required: true
        });
        register("password", {
            required: true
        });
      }, [register]);
    return (
        <AuthLayout>
            <TextInput
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("name", text)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("email", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                lastOne={true}
                onSubmitEditing={handleSubmit(onValid)}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Sign up"
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>  
    );
}