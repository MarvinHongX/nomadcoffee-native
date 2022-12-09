import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, useWindowDimensions } from "react-native";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    margin-right: 10px;
    width: 25px;
    height: 25px;
    border-radius: 12.5px;
`;
const ShopName = styled.Text`
    color: white;
    font-weight: 600;
`;
const File = styled.Image``;

const ExtraContainer = styled.View`
    padding: 10px;
`;
const Category = styled.View`
    flex-direction: row;
`;
const CategoryText = styled.Text`
    color: white;
    margin-right: 5px;

`;

export default function CoffeeShop({ id, name, user, photos, categories }) {
    const navigation = useNavigation();
    const { width, height } = useWindowDimensions();
    const [imageHeight, setImageHeight] = useState(height - 450);
    useEffect(() => {
        Image.getSize(photos[0]?.url, (width, height) => {
            setImageHeight(height > 2000 ? 600 : height / 1.8);
        });
      }, [photos[0]?.url]);
    const goToProfile = () => {
        navigation.navigate("CoffeeShop", {
            id, name, photos, categories
        });
    };
    return (
        <Container>
            <Header onPress={goToProfile}>
                <UserAvatar resizeMode="cover" source={{ uri: user.avatarURL }} />
                <ShopName>{name}</ShopName>
            </Header>
            <File
                resizeMode="cover"
                style={{ 
                    width, 
                    height: imageHeight,
                }}
                source={{ uri: photos[0]?.url }}
            />
            <ExtraContainer>
                <Category>
                    {categories?.map((category) => (
                        <CategoryText key={category.id}>{"#" + category.name}</CategoryText>
                    ))}
                </Category>
            </ExtraContainer>
        </Container>
    );
}

