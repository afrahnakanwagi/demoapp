import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample transaction data
const transactions = [
  { id: 1, date: "2025-02-15", type: "Sale", amount: "UGX 5000", status: "Completed" },
  { id: 2, date: "2025-02-14", type: "Sale", amount: "UGX 12000", status: "Completed" },
  { id: 3, date: "2025-02-13", type: "Sale", amount: "UGX 35000", status: "Pending" },
  { id: 4, date: "2025-02-12", type: "Refund", amount: "UGX 1500", status: "Completed" },
  { id: 5, date: "2025-02-11", type: "Sale", amount: "UGX 28000", status: "Completed" },
];

// Get today's date
const today = new Date().toISOString().split("T")[0];

// Get last week's date
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const lastWeekDate = lastWeek.toISOString().split("T")[0];

// Filtered transactions
const recentTransactions = transactions.filter((t) => t.date === today);
const thisWeekTransactions = transactions.filter((t) => new Date(t.date) >= lastWeek);
const lastWeekTransactions = transactions.filter((t) => new Date(t.date) < lastWeek);

const TransactionsScreen = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("today");

  // Choose transactions based on filter
  const filteredTransactions =
    filter === "today"
      ? recentTransactions
      : filter === "thisWeek"
      ? thisWeekTransactions
      : lastWeekTransactions;

  return (
    <ScrollView style={styles.container}>
      {/* Back to Dashboard Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Transactions</Text>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "today" && styles.activeFilter]}
          onPress={() => setFilter("today")}
        >
          <Text style={styles.filterText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "thisWeek" && styles.activeFilter]}
          onPress={() => setFilter("thisWeek")}
        >
          <Text style={styles.filterText}>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === "lastWeek" && styles.activeFilter]}
          onPress={() => setFilter("lastWeek")}
        >
          <Text style={styles.filterText}>Last Week</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions Cards */}
      <View style={styles.recentTransactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filteredTransactions.map((transaction, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{transaction.type}</Text>
              <Text style={styles.cardAmount}>{transaction.amount}</Text>
              <Text style={styles.cardDate}>{transaction.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Transaction History Table */}
      <Text style={styles.sectionTitle}>Transaction History</Text>
      <View style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]}>
            <Text style={styles.tableHeader}>Date</Text>
            <Text style={styles.tableHeader}>Type</Text>
            <Text style={styles.tableHeader}>Amount</Text>
            <Text style={styles.tableHeader}>Status</Text>
            <Text style={styles.tableHeader}>Action</Text>
          </View>

          {/* Table Rows */}
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.tableRow}>
              <Text style={styles.tableText}>{transaction.date}</Text>
              <Text style={styles.tableText}>{transaction.type}</Text>
              <Text style={styles.tableText}>{transaction.amount}</Text>
              <Text style={[styles.tableText, transaction.status === "Pending" ? styles.pendingStatus : styles.completedStatus]}>
                {transaction.status}
              </Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },

  // Back to Dashboard Button
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  backButtonText: { color: "#F9622C", fontWeight: "bold" },

  // Filters
  filters: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  filterButton: { padding: 10, marginHorizontal: 5, borderRadius: 5, backgroundColor: "#ddd" },
  activeFilter: { backgroundColor: "#F9622C" },
  filterText: { color: "#fff", fontWeight: "bold" },

  // Recent Transactions Section
  recentTransactionsContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    width: 150,
    marginRight: 10,
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: "#F9622C" },
  cardAmount: { fontSize: 14, color: "#F9622C" },
  cardDate: { fontSize: 12, color: "#F9622C" },

  // Transaction Table Section
  tableContainer: { marginTop: 20 },
  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd", alignItems: "center" },
  tableHeaderRow: { backgroundColor: "#F9622C" },
  tableHeader: { fontWeight: "bold", color: "#fff", width: "20%", textAlign: "center" },
  tableText: { fontSize: 14, width: "20%", textAlign: "center" },
  completedStatus: { color: "green", fontWeight: "bold" },
  pendingStatus: { color: "red", fontWeight: "bold" },

  // View Button
  viewButton: { backgroundColor: "#F9622C", padding: 8, borderRadius: 5 },
  viewButtonText: { color: "#fff", fontWeight: "bold" },
});

export default TransactionsScreen;
