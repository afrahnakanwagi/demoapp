import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Button } from "react-native-paper";
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
      const response = await axios.get("http://192.168.1.44:8000/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Button mode="contained" onPress={() => navigation.goBack()} style={styles.backButton}>
        ← Back to Admin Dashboard
      </Button>

      <Text style={styles.title}>Customers</Text>

      {/* Scrollable Table */}
      <ScrollView horizontal style={styles.scrollContainer}>
        <View style={styles.tableWrapper}>
          <DataTable style={styles.table}>
            {/* Table Header */}
            <DataTable.Header style={styles.header}>
              <DataTable.Title style={styles.columnHeader}>ID</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>User</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>Email</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>Phone</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>Status</DataTable.Title>
              <DataTable.Title style={styles.columnHeader}>Wallet</DataTable.Title>
            </DataTable.Header>

            {/* Table Rows */}
            <ScrollView style={styles.tableBody}>
              {customers.map((customer, index) => (
                <DataTable.Row
                  key={customer.id}
                  style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}
                >
                  <DataTable.Cell style={styles.column}>{customer.id}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{customer.user.username}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{customer.user.email}</DataTable.Cell>
                  <DataTable.Cell style={styles.column}>{customer.full_phone_number}</DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      styles.column,
                      customer.status === "Active" ? styles.activeStatus : styles.inactiveStatus,
                    ]}
                  >
                    {customer.status}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.column}>UGX {customer.wallet}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          </DataTable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 15,
    backgroundColor: "#F9622C",
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  tableWrapper: {
    minWidth: 900, // Wider table
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: "center", // Centers the table
    justifyContent: "center", // Centers content inside
  },
  table: {
    minWidth: 900,
  },
  header: {
    backgroundColor: "#F9622C", // Orange header
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  columnHeader: {
    flex: 1,
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableBody: {
    maxHeight: 400, // Allow vertical scrolling
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  activeStatus: {
    color: "green",
    fontWeight: "bold",
  },
  inactiveStatus: {
    color: "red",
    fontWeight: "bold",
  },
});

export default CustomersScreen;
