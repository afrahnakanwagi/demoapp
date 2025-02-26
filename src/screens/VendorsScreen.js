import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Button } from "react-native-paper";
import axios from "axios";

const VendorsScreen = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://192.168.1.44:8000/vendor");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Button mode="contained" onPress={() => navigation.navigate("AdminDashboard")} style={styles.backButton}>
        Back to Admin Dashboard
      </Button>

      <Text style={styles.title}>Vendors</Text>

      {/* Centered Table */}
      <ScrollView horizontal contentContainerStyle={styles.tableContainer}>
        <DataTable style={styles.table}>
          {/* Table Header */}
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.headerText} style={styles.column}>Shop Name</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.column}>Shop Address</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.column}>Description</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.column}>Status</DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.column}>User</DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {vendors.map((vendor) => (
            <DataTable.Row key={vendor.id}>
              <DataTable.Cell style={styles.column}>{vendor.shop_name}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{vendor.shop_address}</DataTable.Cell>
              <DataTable.Cell style={styles.column}>{vendor.shop_description}</DataTable.Cell>
              <DataTable.Cell style={[styles.column, vendor.status === "active" ? styles.activeStatus : styles.blockedStatus]}>
                {vendor.status}
              </DataTable.Cell>
              <DataTable.Cell style={styles.column}>{vendor.user}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8", alignItems: "center" },
  backButton: { marginBottom: 15, backgroundColor: "#F9622C" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  
  // Table Styling
  tableContainer: { alignItems: "center", justifyContent: "center", width: "100%" },
  table: { minWidth: 600, backgroundColor: "#fff", borderRadius: 8, overflow: "hidden", elevation: 2 },
  
  // Header Styling
  header: { backgroundColor: "#F9622C", borderRadius: 8 },
  headerText: { color: "#fff", fontWeight: "bold" },

  // Columns & Rows
  column: { flex: 1, justifyContent: "center", paddingHorizontal: 10 },
  activeStatus: { color: "green", fontWeight: "bold" },
  blockedStatus: { color: "red", fontWeight: "bold" },
});

export default VendorsScreen;
