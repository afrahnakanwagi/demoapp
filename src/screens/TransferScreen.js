import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

// Sample transfer history data
const transferHistory = [
  { id: 1, date: "2025-02-15", recipient: "John Doe", amount: "UGX 10000", method: "Bank Transfer", status: "Completed" },
  { id: 2, date: "2025-02-14", recipient: "Jane Smith", amount: "UGX 5000", method: "Cash", status: "Completed" },
  { id: 3, date: "2025-02-13", recipient: "Alex Johnson", amount: "UGX 15000", method: "Mobile Money", status: "Completed" },
  { id: 4, date: "2025-02-12", recipient: "Mary Brown", amount: "UGX 7000", method: "Bank Transfer", status: "Pending" },
];

const TransferScreen = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [method, setMethod] = useState("Bank Transfer");

  // Function to handle money transfer
  const handleTransfer = () => {
    if (amount && recipient) {
      alert(`Transferred UGX ${amount} to ${recipient} via ${method}`);
      setAmount("");
      setRecipient("");
      setMethod("Bank Transfer");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transfer Money</Text>

      {/* Money Transfer Form */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Recipient Name"
          value={recipient}
          onChangeText={setRecipient}
        />
      </View>

      <Text style={styles.label}>Transfer Method</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={method}
          style={styles.picker}
          onValueChange={(itemValue) => setMethod(itemValue)}
        >
          <Picker.Item label="Bank Transfer" value="Bank Transfer" />
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Mobile Money" value="Mobile Money" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
        <Text style={styles.transferButtonText}>Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      {/* Transfer History Table */}
      <Text style={styles.sectionTitle}>Transfer History</Text>
      <ScrollView style={styles.tableContainer}>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableHeaderText}>Date</Text>
            <Text style={styles.tableHeaderText}>Recipient</Text>
            <Text style={styles.tableHeaderText}>Amount</Text>
            <Text style={styles.tableHeaderText}>Method</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
            <Text style={styles.tableHeaderText}>Action</Text>
          </View>

          {/* Table Data */}
          {transferHistory.map((transfer) => (
            <View key={transfer.id} style={styles.tableRow}>
              <Text style={styles.tableText}>{transfer.date}</Text>
              <Text style={styles.tableText}>{transfer.recipient}</Text>
              <Text style={styles.tableText}>{transfer.amount}</Text>
              <Text style={styles.tableText}>{transfer.method}</Text>
              <Text style={styles.tableText}>{transfer.status}</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center" },
  header: { fontSize: 24, fontWeight: "bold", color: "#F9622C", marginBottom: 20, fontFamily: "sans-serif" },

  // Input Fields
  inputRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 15 },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    fontFamily: "sans-serif",
  },

  label: { fontSize: 16, fontWeight: "bold", alignSelf: "flex-start", marginBottom: 5, fontFamily: "sans-serif" },

  // Picker
  pickerContainer: { backgroundColor: "#f5f5f5", borderRadius: 8, width: "100%", marginBottom: 20 },
  picker: { height: 50, width: "100%" },

  // Transfer Button
  transferButton: {
    backgroundColor: "#F9622C",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  transferButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif" },

  // Back Button
  backButton: { padding: 12, width: "100%", alignItems: "center", marginBottom: 20 },
  backButtonText: { color: "#F9622C", fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif" },

  // Table Styling
  tableContainer: { width: "100%" },
  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden" },
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },

  // Table Header
  tableHeader: { backgroundColor: "#F9622C" },
  tableHeaderText: { fontWeight: "bold", color: "#fff", width: "16%", textAlign: "center", fontFamily: "sans-serif" },

  // Table Data
  tableText: { fontSize: 14, width: "16%", textAlign: "center", fontFamily: "sans-serif" },

  // View Button
  viewButton: { backgroundColor: "#F9622C", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 5 },
  viewButtonText: { color: "#fff", fontSize: 12, fontWeight: "bold", fontFamily: "sans-serif" },
});

export default TransferScreen;
