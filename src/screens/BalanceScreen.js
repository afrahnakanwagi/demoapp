import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BalanceScreen = () => {
  const navigation = useNavigation();
  const balance = "UGX 1,250,000"; // Sample balance value

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Balance</Text>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{balance}</Text>
      </View>

      {/* Back to Dashboard Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#F9622C" },

  // Balance Card
  balanceCard: {
    backgroundColor: "#F9622C",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  balanceLabel: { fontSize: 18, color: "#fff", fontWeight: "bold", marginBottom: 5 },
  balanceAmount: { fontSize: 28, color: "#fff", fontWeight: "bold" },

  // Back Button
  backButton: {
    marginTop: 30,
    backgroundColor: "#F9622C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default BalanceScreen;
