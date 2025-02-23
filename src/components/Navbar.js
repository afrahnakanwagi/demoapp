import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  FlatList
} from 'react-native';
import { Bell, Search, ChevronDown, ChevronLeft, LogOut, X } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
// import i18n from '../i18n';  // Import i18n for language change

const Navbar = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const [searchQuery, setSearchQuery] = useState("");
  // const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [currencyModalVisible, setCurrencyModalVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  // const [selectedCurrency, setSelectedCurrency] = useState("UGX");

  // const languages = [
  //   { code: 'en', name: 'English', flag: require('../../assets/flag-en.png') },
  //   { code: 'fr', name: 'French', flag: require('../../assets/flag-fr.png') },
  // ];

  const currencies = [
    { code: 'UGX', name: 'Ugandan Shillings' },
    { code: 'RWF', name: 'Rwandan Franc' },
  ];

  // const handleLanguageChange = (code) => {
  //   i18n.changeLanguage(code);  // Change the language
  //   setLanguageModalVisible(false);  // Close modal after language change
  // };

  const handleCurrencyChange = (code) => {
    setSelectedCurrency(code);  // Update selected currency
    setCurrencyModalVisible(false);  // Close modal after currency change
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logging out...');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ChevronLeft size={24} color="#374151" />
      </TouchableOpacity>

      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.searchContainer}>
        <Search color="#374151" size={20} />
        <TextInput
          placeholder={t('search')}  // Dynamic placeholder text
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
{/* 
      <View style={styles.actions}>
        <TouchableOpacity style={styles.dropdown} onPress={() => setCurrencyModalVisible(true)}>
          <Text>{selectedCurrency}</Text>
          <ChevronDown size={16} />
        </TouchableOpacity>
      </View> */}

      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => setNotificationsVisible(!notificationsVisible)}>
          <Bell color="#374151" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut color="#fff" size={20} />
      </TouchableOpacity>



      {/* Notifications Modal */}
      <Modal visible={notificationsVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationsVisible(false)}>
                <X size={20} color="black" />
              </TouchableOpacity>
            </View>
            <Text>No new notifications</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    width: '100%',  
    alignItems: 'center',
    justifyContent: 'space-between',  
    paddingLeft: 400,  
    paddingRight: 20, 
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 10,
  },
  actions: { 
    flexDirection: 'row', 
    alignItems: 'center',
    marginLeft: 'auto', 
  },
  iconGroup: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12,
    marginLeft: 20,  // Add spacing between actions and icons
  },
  backButton: { padding: 8 },
  logo: { width: 65, height: 65, resizeMode: 'contain' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  searchInput: { marginLeft: 8, fontSize: 14, flex: 1, height: 36 },  // Fixed height issue
  actions: { flexDirection: 'row', alignItems: 'center' },
  dropdown: { flexDirection: 'row', alignItems: 'center', padding: 6, marginLeft: 8 },
  iconGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoutButton: { backgroundColor: '#ff4d4d', padding: 8, borderRadius: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 25, borderRadius: 10, width: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  modalText: { fontSize: 16, marginLeft: 10 },
  flag: { width: 24, height: 16 },
});

export default Navbar;
