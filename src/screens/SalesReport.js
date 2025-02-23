import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SalesReport = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("Today");

  // Sample Sales Data
  const salesData = [
    {
      id: "001",
      date: "2025-02-17",
      product: "Wall painting",
      customerId: "C001",
      amount: "UGX 10,000",
      status: "Completed",
      actions: ["View", "Edit", "Delete"],
    },
    {
      id: "002",
      date: "2025-02-16",
      product: "Bead Bag",
      customerId: "C002",
      amount: "UGX 5,500",
      status: "Pending",
      actions: ["View", "Edit", "Delete"],
    },
    {
      id: "003",
      date: "2025-02-15",
      product: "Bead Bracelets",
      customerId: "C003",
      amount: "UGX 3,200",
      status: "Completed",
      actions: ["View", "Edit", "Delete"],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("AdminDashboard")}
      >
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Sales Report</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {["Today", "This Week", "Last Week"].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filterButton, filter === item && styles.activeFilter]}
            onPress={() => setFilter(item)}
          >
            <Text style={styles.filterText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sales Summary Cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Sales</Text>
          <Text style={styles.cardAmount}>UGX 18,700</Text>
        </View>
      </View>

      {/* Sales Table */}
      <Text style={styles.sectionTitle}>Sales History</Text>
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>ID</Text>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Product</Text>
              <Text style={styles.headerText}>Customer</Text>
              <Text style={styles.headerText}>Amount</Text>
              <Text style={styles.headerText}>Status</Text>
              <Text style={styles.headerText}>Actions</Text>
            </View>
            {salesData.map((sale) => (
              <View key={sale.id} style={styles.tableRow}>
                <Text style={styles.rowText}>{sale.id}</Text>
                <Text style={styles.rowText}>{sale.date}</Text>
                <Text style={styles.rowText}>{sale.product}</Text>
                <Text style={styles.rowText}>{sale.customerId}</Text>
                <Text style={styles.rowText}>{sale.amount}</Text>
                <Text
                  style={[
                    styles.rowText,
                    sale.status === "Completed"
                      ? styles.completedStatus
                      : styles.pendingStatus,
                  ]}
                >
                  {sale.status}
                </Text>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },

  backButton: { marginBottom: 10 },
  backText: { color: "#F9622C", fontSize: 16 },

  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  // Filter Buttons
  filterContainer: { flexDirection: "row", marginBottom: 15 },
  filterButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  activeFilter: { backgroundColor: "#F9622C" },
  filterText: { color: "#fff", fontWeight: "bold" },

  // Cards
  cardContainer: { flexDirection: "row", marginBottom: 15, justifyContent: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    alignItems: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#555" },
  cardAmount: { fontSize: 22, fontWeight: "bold", color: "#F9622C", marginTop: 5 },

  // Sales Table
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },

  tableContainer: { alignSelf: "center", width: "100%" },
  table: { width: 1200, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden", alignSelf: "center" },


  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    paddingBottom: 5,
    backgroundColor: "#F9622C",
    borderRadius: 8,
    padding: 10,
  },
  headerText: {
    flex: 2,
    fontWeight: "bold", 
    color: "#fff", 
    textAlign: "center"
  },

  tableRow: { 
    flexDirection: "row", 
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee" 
  },
  rowText: { 
    flex: 2, 
    fontSize: 14, 
    color: "#333" 
  },

  completedStatus: { color: "green", fontWeight: "bold" },
  pendingStatus: { color: "red", fontWeight: "bold" },

  viewButton: { 
    backgroundColor: "#F9622C", 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    alignSelf: "flex-end", 
    marginHorizontal: 10, 
    marginTop: 5, 
    marginBottom: 5, 
    justifyContent: "center",
    borderRadius: 5 
  },
  viewButtonText: { color: "#fff", fontWeight: "bold" },
});

export default SalesReport;
