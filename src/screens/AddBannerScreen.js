import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AddBannerScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [country, setCountry] = useState('UG');
    const [season, setSeason] = useState('none');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        // Basic validation
        if (!title || !startDate || !endDate) {
            setError('Please fill in all fields.');
            return;
        }

        const newBanner = { title, country, season, start_date: startDate, end_date: endDate };

        try {
            await axios.post('http://your-api-url/banners/', newBanner);
            navigation.goBack();
        } catch (err) {
            setError('Failed to create banner. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Country (UG/RW)"
                value={country}
                onChangeText={setCountry}
            />
            <TextInput
                style={styles.input}
                placeholder="Season"
                value={season}
                onChangeText={setSeason}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Date (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
            />
            <TextInput
                style={styles.input}
                placeholder="End Date (YYYY-MM-DD)"
                value={endDate}
                onChangeText={setEndDate}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Add Banner" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default AddBannerScreen;