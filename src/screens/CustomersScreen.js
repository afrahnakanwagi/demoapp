import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CustomersScreen = () => {
  const [customers, setCustomers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://192.168.28.83:8000/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Back to Admin Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Customers</Text>

      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.customerCard}>
            <Text style={styles.sectionTitle}>Customer Details</Text>

            <View style={styles.row}>
              <Text style={styles.label}>ID:</Text>
              <TextInput style={styles.input} value={String(item.id)} editable={false} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>User:</Text>
              <TextInput style={styles.input} value={item.user.username} editable={false} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <TextInput style={styles.input} value={item.user.email} editable={false} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <TextInput style={styles.input} value={item.full_phone_number} editable={false} />
            </View>

            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Status:</Text>
              <TextInput style={[styles.input, styles.status(item.status)]} value={item.status} editable={false} />
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Wallet:</Text>
              <TextInput style={styles.input} value={`UGX ${item.wallet}`} editable={false} />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.blockButton}>
                <Text style={styles.blockText}>Block</Text>
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
  backButton: { marginBottom: 10, padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  backButtonText: { fontSize: 16, color: "#333" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  customerCard: {
    padding: 20,
    marginVertical: 10,
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
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  label: { fontSize: 14, fontWeight: "bold", color: "#555" },
  input: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 8,
    borderRadius: 5,
    textAlign: "right",
  },
  status: (status) => ({
    color: status === "Active" ? "green" : status === "Inactive" ? "orange" : "red",
    fontWeight: "bold",
  }),
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  contactButton: { backgroundColor: "black", padding: 10, borderRadius: 5 },
  contactText: { color: "#fff", fontWeight: "bold" },
  blockButton: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", padding: 10, borderRadius: 5 },
  blockText: { color: "#000", fontWeight: "bold" },
});

export default CustomersScreen;
