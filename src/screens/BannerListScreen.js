import React, { useEffect, useState } from 'react';  
import {  
    View,  
    Text,  
    FlatList,  
    Button,  
    StyleSheet,  
    TouchableOpacity,  
    TextInput,  
    Modal,  
    Alert,  
    Image,  
    ScrollView,  
} from 'react-native';  
import { MaterialIcons } from '@expo/vector-icons'; // Import icons  

// Dummy data for banners  
const dummyBanners = [  
    { id: 1, title: 'Summer Sale', country: 'UG', season: 'none', image: 'https://via.placeholder.com/150' },  
    { id: 2, title: 'Black Friday Deals', country: 'RW', season: 'black_friday', image: 'https://via.placeholder.com/150' },  
    { id: 3, title: 'Christmas Specials', country: 'UG', season: 'christmas', image: 'https://via.placeholder.com/150' },  
];  

const BannerListScreen = ({ navigation }) => {  
    const [banners, setBanners] = useState([]);  
    const [modalVisible, setModalVisible] = useState(false);  
    const [newBannerTitle, setNewBannerTitle] = useState('');  
    const [newBannerCountry, setNewBannerCountry] = useState('UG');  
    const [newBannerSeason, setNewBannerSeason] = useState('none');  
    const [newBannerImage, setNewBannerImage] = useState('');  
    const [editingBanner, setEditingBanner] = useState(null);  

    useEffect(() => {  
        fetchBanners();  
    }, []);  

    const fetchBanners = () => {  
        setTimeout(() => {  
            setBanners(dummyBanners);  
        }, 1000);  
    };  

    const handleAddBanner = () => {  
        if (!newBannerTitle || !newBannerImage) {  
            Alert.alert('Error', 'Please enter a banner title and image URL.');  
            return;  
        }  
        const newBanner = {  
            id: banners.length + 1,  
            title: newBannerTitle,  
            country: newBannerCountry,  
            season: newBannerSeason,  
            image: newBannerImage,  
        };  
        setBanners([...banners, newBanner]);  
        resetModal();  
    };  

    const handleDeleteBanner = (id) => {  
        setBanners(banners.filter((banner) => banner.id !== id));  
    };  

    const handleEditBanner = (id) => {  
        const bannerToEdit = banners.find((banner) => banner.id === id);  
        setEditingBanner(bannerToEdit);  
        setNewBannerTitle(bannerToEdit.title);  
        setNewBannerCountry(bannerToEdit.country);  
        setNewBannerSeason(bannerToEdit.season);  
        setNewBannerImage(bannerToEdit.image);  
        setModalVisible(true);  
    };  

    const handleUpdateBanner = () => {  
        if (!newBannerTitle || !newBannerImage) {  
            Alert.alert('Error', 'Please enter a banner title and image URL.');  
            return;  
        }  
        const updatedBanners = banners.map((banner) => {  
            if (banner.id === editingBanner.id) {  
                return {  
                    ...banner,  
                    title: newBannerTitle,  
                    country: newBannerCountry,  
                    season: newBannerSeason,  
                    image: newBannerImage,  
                };  
            }  
            return banner;  
        });  
        setBanners(updatedBanners);  
        resetModal();  
    };  

    const resetModal = () => {  
        setNewBannerTitle('');  
        setNewBannerCountry('UG');  
        setNewBannerSeason('none');  
        setNewBannerImage('');  
        setEditingBanner(null);  
        setModalVisible(false);  
    };  

    const renderBannerItem = ({ item }) => (  
        <View style={styles.bannerItem}>  
            <Image source={{ uri: item.image }} style={styles.bannerImage} />  
            <Text style={styles.bannerTitle}>{item.title}</Text>  
            <Text style={styles.bannerDetails}>Country: {item.country}</Text>  
            <Text style={styles.bannerDetails}>Season: {item.season}</Text>  
            <View style={styles.buttonRow}>  
                <Button title="View" onPress={() => navigation.navigate('BannerDetail', { bannerId: item.id })} />  
                <TouchableOpacity onPress={() => handleEditBanner(item.id)}>  
                    <MaterialIcons name="edit" size={24} color="blue" />  
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => handleDeleteBanner(item.id)}>  
                    <MaterialIcons name="delete" size={24} color="red" />  
                </TouchableOpacity>  
            </View>  
        </View>  
    );  

    return (  
        <ScrollView contentContainerStyle={styles.scrollContainer}>  
            <View style={styles.container}>  
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('AdminDashboard')}>  
                    <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>  
                </TouchableOpacity>  

                <Text style={styles.title}>Banner List</Text>  

                {/* Add Banner Button at the Top */}  
                <Button title="Add Banner" onPress={() => setModalVisible(true)} />  

                {/* Banner List */}  
                <FlatList  
                    data={banners}  
                    keyExtractor={(item) => item.id.toString()}  
                    renderItem={renderBannerItem}  
                    numColumns={2}  
                    columnWrapperStyle={styles.row}  
                    contentContainerStyle={{ paddingBottom: 20 }}  
                />  
            </View>  

            {/* Modal for Adding or Editing a Banner */}  
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={resetModal}>  
                <View style={styles.modalContainer}>  
                    <View style={styles.modalView}>  
                        <Text style={styles.modalTitle}>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</Text>  
                        <TextInput style={styles.input} placeholder="Banner Title" value={newBannerTitle} onChangeText={setNewBannerTitle} />  
                        <TextInput style={styles.input} placeholder="Country (UG/RW)" value={newBannerCountry} onChangeText={setNewBannerCountry} />  
                        <TextInput style={styles.input} placeholder="Season" value={newBannerSeason} onChangeText={setNewBannerSeason} />  
                        <TextInput style={styles.input} placeholder="Image URL" value={newBannerImage} onChangeText={setNewBannerImage} />  
                        <Button title={editingBanner ? 'Update' : 'Submit'} onPress={editingBanner ? handleUpdateBanner : handleAddBanner} />  
                        <Button title="Cancel" onPress={resetModal} color="#FF0000" />  
                    </View>  
                </View>  
            </Modal>  
        </ScrollView>  
    );  
};  

const styles = StyleSheet.create({  
    scrollContainer: {  
        flexGrow: 1,  
    },  
    container: {  
        flex: 1,  
        padding: 20,  
        backgroundColor: 'aliceblue',  
    },  
    backButton: {  
        marginBottom: 20,  
        padding: 10,  
        backgroundColor: '#007bff',  
        borderRadius: 5,  
    },  
    backButtonText: {  
        color: '#fff',  
        textAlign: 'center',  
        fontWeight: 'bold',  
    },  
    title: {  
        fontSize: 24,  
        fontWeight: 'bold',  
        marginBottom: 20,  
    },  
    bannerItem: {  
        flex: 1,  
        margin: 10,  
        padding: 10,  
        backgroundColor: '#fff',  
        borderRadius: 5,  
        alignItems: 'center',  
    },  
    bannerImage: {  
        width: 150,  
        height: 150,  
        marginBottom: 10,  
    },  
    bannerTitle: {  
        fontSize: 18,  
        fontWeight: 'bold',  
        marginBottom: 5,  
    },  
    bannerDetails: {  
        fontSize: 14,  
        color: '#555',  
        marginBottom: 5,  
    },  
    buttonRow: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        gap: 10,  
    },  
    row: {  
        flex: 1,  
        justifyContent: 'space-between',  
    },  
    modalContainer: {  
        flex: 1,  
        justifyContent: 'center',  
        alignItems: 'center',  
        backgroundColor: 'rgba(0,0,0,0.5)',  
    },  
    modalView: {  
        width: '80%',  
        backgroundColor: 'white',  
        borderRadius: 10,  
        padding: 20,  
        alignItems: 'center',  
        shadowColor: '#000',  
        shadowOffset: {  
            width: 0,  
            height: 2,  
        },  
        shadowOpacity: 0.25,  
        shadowRadius: 4,  
        elevation: 5,  
    },  
    modalTitle: {  
        fontSize: 20,  
        fontWeight: 'bold',  
        marginBottom: 20,  
    },  
    input: {  
        width: '100%',  
        padding: 10,  
        borderWidth: 1,  
        borderColor: '#ccc',  
        borderRadius: 5,  
        marginBottom: 10,  
    },  
});  

export default BannerListScreen;