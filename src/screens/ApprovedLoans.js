import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample data for approved loans
const approvedLoans = [
  { id: 1, name: "Aisha Nambatya", amount: "UGX 5,000", status: "Approved", dateGiven: "2025-01-15", shop: "John's Electronics" },
  { id: 2, name: "Vivian Ahereza", amount: "UGX 3,000", status: "Approved", dateGiven: "2025-01-20", shop: "Jane's Boutique" },
  { id: 3, name: "Tracy Keeya", amount: "UGX 7,500", status: "Approved", dateGiven: "2025-01-25", shop: "Mark's Hardware" },
];

const ApprovedLoans = () => {
  const navigation = useNavigation();

  const viewDetails = (loan) => {
    // Navigate to a details screen or show a modal with loan details
    alert(`Viewing details for ${loan.name}`);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Approved Loans</Text>
      {approvedLoans.map((loan) => (
        <View key={loan.id} style={styles.card}>
          <Text style={styles.text}>Name: {loan.name}</Text>
          <Text style={styles.text}>Amount: {loan.amount}</Text>
          <Text style={styles.text}>Status: {loan.status}</Text>
          <Text style={styles.text}>Date Given: {loan.dateGiven}</Text>
          <Text style={styles.text}>Shop: {loan.shop}</Text>
          <TouchableOpacity style={styles.detailsButton} onPress={() => viewDetails(loan)}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 10 },
  backText: { color: "#F9622C", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: { fontSize: 16 },
  detailsButton: {
    marginTop: 10,
    backgroundColor: "#F9622C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  detailsButtonText: { color: "#fff", fontSize: 16 },
});

export default ApprovedLoans;