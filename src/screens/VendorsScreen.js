import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import VendorProductsModal from "./VendorProductsModal";
import { Button } from "react-native-paper"; // Import Button from react-native-paper

const VendorsScreen = ({ navigation }) => { // Receive navigation prop
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("https://your-api.com/vendors/");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back to Admin Dashboard Button */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdminDashboard")} // Navigate to Admin Dashboard
        style={styles.backButton}
      >
        Back to Admin Dashboard
      </Button>

      <Text style={styles.title}>Vendors</Text>

      {/* Vendors List */}
      <FlatList
        data={vendors}
        numColumns={2} // Set two columns for cards
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { setSelectedVendor(item); setModalVisible(true); }}>
            <View style={styles.vendorCard}>
              <Text style={styles.vendorName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Vendor Products Modal */}
      <VendorProductsModal
        vendor={selectedVendor}
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default VendorsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  backButton: { marginBottom: 15, backgroundColor: "#F9622C" }, // Style the back button
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, fontFamily: "sans-serif" }, // Sans-serif font
  vendorCard: { 
    flex: 1, 
    padding: 15, 
    margin: 10, 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    justifyContent: "center", 
    alignItems: "center",
  },
  vendorName: { 
    fontSize: 16, 
    fontWeight: "bold", 
    fontFamily: "sans-serif", // Sans-serif font
  },
});
