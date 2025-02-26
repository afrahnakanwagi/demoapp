import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

const BannerDetailScreen = ({ route, navigation }) => {
    const { bannerId } = route.params;
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        fetchBanner();
    }, []);

    const fetchBanner = async () => {
        const response = await axios.get(`http://your-api-url/banners/${bannerId}/`);
        setBanner(response.data);
    };

    const handleDelete = async () => {
        await axios.delete(`http://your-api-url/banners/${bannerId}/`);
        navigation.goBack();
    };

    if (!banner) return null;

    return (
        <View>
            <Text>{banner.title}</Text>
            <TextInput value={banner.title} onChangeText={(text) => setBanner({ ...banner, title: text })} />
            <Button title="Delete" onPress={handleDelete} />
            <Button title="Save" onPress={async () => {
                await axios.put(`http://your-api-url/banners/${bannerId}/`, banner);
                navigation.goBack();
            }} />
        </View>
    );
};

export default BannerDetailScreen;