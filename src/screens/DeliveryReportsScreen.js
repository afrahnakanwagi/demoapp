import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample data for deliveries
const deliveries = [
  { id: 1, customerName: "Aisha Nambatya", deliveryDate: "2025-02-16", status: "Confirmed", deliveredBy: "Rwanda Express", location: "Kigali, Rwanda" },
  { id: 2, customerName: "Keeya Tracy", deliveryDate: "2025-02-15", status: "Returned", deliveredBy: "Uganda Delivery Co.", location: "Kampala, Uganda" },
  { id: 3, customerName: "Promise Tuhaise", deliveryDate: "2025-02-16", status: "Confirmed", deliveredBy: "Kigali Logistics", location: "Musanze, Rwanda" },
  { id: 4, customerName: "Mulungi Joy", deliveryDate: "2025-02-14", status: "Confirmed", deliveredBy: "Uganda Delivery Co.", location: "Entebbe, Uganda" },
];

const DeliveryReportsScreen = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("Today");

  // Function to filter deliveries based on selected date range
  const filterDeliveries = () => {
    const today = new Date("2025-02-16"); // Static date for testing
    return deliveries.filter((delivery) => {
      const deliveryDate = new Date(delivery.deliveryDate);
      const diffInDays = Math.floor((today - deliveryDate) / (1000 * 60 * 60 * 24));

      switch (selectedFilter) {
        case "Today":
          return diffInDays === 0;
        case "Yesterday":
          return diffInDays === 1;
        case "This Week":
          return diffInDays <= 6;
        case "Last Week":
          return diffInDays > 6 && diffInDays <= 13;
        case "Last Month":
          return diffInDays > 13 && diffInDays <= 30;
        default:
          return true;
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backButtonText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <Text style={styles.header}>Delivery Reports</Text>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          {["Today", "Yesterday", "This Week", "Last Week", "Last Month"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && styles.activeFilter]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Delivery Summary Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deliveryCardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Confirmed Deliveries</Text>
            <Text style={styles.cardValue}>{deliveries.filter((delivery) => delivery.status === "Confirmed").length}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Returned Deliveries</Text>
            <Text style={styles.cardValue}>{deliveries.filter((delivery) => delivery.status === "Returned").length}</Text>
          </View>
        </ScrollView>

        {/* Delivery Table */}
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={[styles.tableHeader, { width: 120 }]}>Customer</Text>
              <Text style={[styles.tableHeader, { width: 120 }]}>Date</Text>
              <Text style={[styles.tableHeader, { width: 150 }]}>Location</Text>
              <Text style={[styles.tableHeader, { width: 120 }]}>Status</Text>
              <Text style={[styles.tableHeader, { width: 160 }]}>Delivered By</Text>
              <Text style={[styles.tableHeader, { width: 100 }]}>Action</Text>
            </View>
            {filterDeliveries().map((delivery) => (
              <View key={delivery.id} style={styles.tableRow}>
                <Text style={[styles.tableText, { width: 120 }]}>{delivery.customerName}</Text>
                <Text style={[styles.tableText, { width: 120 }]}>{delivery.deliveryDate}</Text>
                <Text style={[styles.tableText, { width: 150 }]}>{delivery.location}</Text>
                <Text style={[styles.tableText, { width: 120 }]}>{delivery.status}</Text>
                <Text style={[styles.tableText, { width: 160 }]}>{delivery.deliveredBy}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: { marginBottom: 15 },
  backButtonText: { fontSize: 16, color: "#280300", fontWeight: "bold" },

  mainContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  header: { fontSize: 24, fontWeight: "bold", color: "#280300", marginBottom: 20 },

  filtersContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
  filterButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, backgroundColor: "#ddd" },
  activeFilter: { backgroundColor: "#F9622C" },
  filterText: { fontSize: 14, color: "#333" },
  activeFilterText: { color: "#fff" },

  deliveryCardsContainer: { flexDirection: "row", marginBottom: 15 },
  card: { padding: 15, backgroundColor: "#280300", borderRadius: 10, width: 200, marginRight: 10, paddingLeft: 20 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#F9622C" },
  cardValue: { fontSize: 20, fontWeight: "bold", color: "#F9622C" },

  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, overflow: "hidden"},
  tableContainer: {paddingLeft:150 },
  tableRowHeader: { flexDirection: "row", backgroundColor: "#F9622C", padding: 10 },
  tableHeader: { fontWeight: "bold", color: "#fff", textAlign: "center" },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ddd", padding: 10, alignItems: "center" },
  tableText: { fontSize: 14, textAlign: "center" },

  detailsButton: { backgroundColor: "#F9622C", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  detailsButtonText: { color: "#fff", fontWeight: "bold" },
});

export default DeliveryReportsScreen;
