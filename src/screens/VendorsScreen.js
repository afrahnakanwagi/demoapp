import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";

const VendorsScreen = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://192.168.28.83:8000/vendor");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate("AdminDashboard")} style={styles.backButton}>
        Back to Admin Dashboard
      </Button>

      <Text style={styles.title}>Vendors</Text>

      <FlatList
        data={vendors}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.vendorCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Shop Name:</Text>
              <Text style={styles.value}>{item.shop_name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Shop Address:</Text>
              <Text style={styles.value}>{item.shop_address}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{item.shop_description}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <Text style={[styles.value, styles.status]}>{item.status}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>User:</Text>
              <Text style={styles.value}>{item.user}</Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.blockButton}>
                <Text style={styles.blockButtonText}>Block</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8" },
  backButton: { marginBottom: 15, backgroundColor: "#F9622C" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  vendorCard: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: { fontSize: 12, fontWeight: "bold", color: "#555" },
  value: { fontSize: 14, color: "#333" },
  status: { color: "green", fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  contactButton: { backgroundColor: "#000", padding: 8, borderRadius: 5 },
  blockButton: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", padding: 8, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  blockButtonText: { color: "#000", fontWeight: "bold" },
});

export default VendorsScreen;
