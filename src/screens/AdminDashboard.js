import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { BarChart, LineChart } from "react-native-chart-kit";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BannerSection from "../screens/BannerSection"; // Adjust the path as necessary
import BannerManagement from "../screens/BannerManagement"; // Adjust the path as necessary


const screenWidth = Dimensions.get("window").width;

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");

  const salesData = { Today: 500000, "Last Week": 3200000, "Last Month": 950000, "All Time": 2700000 };
  const ordersData = { Today: 12, "Last Week": 80, "Last Month": 300, "All Time": 5000 };
  const loanData = { Today: 10, "Last Week": 50, "Last Month": 150, "All Time": 2000 };
  const userData = { Today: 5, "Last Week": 30, "Last Month": 100, "All Time": 500 };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ data: [5000, 12000, 15000, 22000, 28000, 35000], strokeWidth: 2 }],
  };

  const stats = {
    wallet: {
      balance: 100000,
      pendingTransactions: 5,
      totalTransactions: 100,
    },
  };

  const [country, setCountry] = useState("UG");
  const [bannerUrl, setBannerUrl] = useState("");
  const [banners, setBanners] = useState([]);

  const uploadBanner = () => {
    const newBanner = { country, url: bannerUrl };
    setBanners([...banners, newBanner]);
    setBannerUrl("");
  };

  const viewBanners = () => {
    console.log("All Banners: ", banners);
  };

  return (
    <View style={styles.rootContainer}>
      <Navbar />
      <View style={styles.container}>
        <Sidebar />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.mainContainer}>
            <Text style={styles.heading}>Dashboard Overview</Text>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
              {["Today", "Last Week", "Last Month", "All Time"].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[styles.filterButton, selectedFilter === filter && styles.selectedFilter]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text style={[styles.filterText, selectedFilter === filter && styles.selectedFilterText]}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Stats Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardScrollView}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Total Sales</Text>
                <Text style={styles.cardValue}>UGX {salesData[selectedFilter]}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>New Orders</Text>
                <Text style={styles.cardValue}>{ordersData[selectedFilter]}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Loan Requests</Text>
                <Text style={styles.cardValue}>{loanData[selectedFilter]}</Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>User  Signups</Text>
                <Text style={styles.cardValue}>{userData[selectedFilter]}</Text>
              </View>
            </ScrollView>

            {/* Wallet Section */}
            <View style={styles.walletContainer}>
              <Text style={styles.sectionTitle}>Wallet</Text>
              <View style={styles.walletCardContainer}>
                <View>
                  <View style={styles.walletCard}>
                    <Text style={styles.cardTitle}>Main Balance</Text>
                    <Text style={styles.cardValue}>UGX {stats.wallet.balance.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity style={styles.walletButton} onPress={() => navigation.navigate("Deposit")}>
                    <Text style={styles.walletButtonText}>Deposit</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.walletCard}>
                    <Text style={styles.cardTitle}>Total Transactions</Text>
                    <Text style={styles.cardValue}>{stats.wallet.totalTransactions.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity style={styles.walletButton}>
                    <Text style={styles.walletButtonText}>View History</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.walletCard}>
                    <Text style={styles.cardTitle}>Pending Transactions</Text>
                    <Text style={styles.cardValue}>{stats.wallet.pendingTransactions}</Text>
                  </View>
                  <TouchableOpacity style={styles.walletButton}>
                    <Text style={styles.walletButtonText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Banner Section Container */}
            <View style={styles.bannerContainer}>
              <BannerSection />
            </View>

            <View style={styles.chartArea}>
              {/* Revenue Graph */}
              <View style={styles.chartContainer}>
                <Text style={styles.sectionTitle}>Revenue Growth</Text>
                <LineChart
                  data={revenueData}
                  width={450}
                  height={250}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#f4f4f4",
                    backgroundGradientTo: "#f4f4f4",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: () => "#333",
                  }}
                  bezier
                  style={{ borderRadius: 10, flex: 1 }}
                />
              </View>
              {/* Sales Graph */}
              <View style={styles.chartContainer}>
                <Text style={styles.sectionTitle}>Sales</Text>
                <BarChart
                  data={revenueData}
                  width={450}
                  height={250}
                  chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#f4f4f4",
                    backgroundGradientTo: "#f4f4f4",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: () => "#333",
                  }}
                  bezier
                  style={{ borderRadius: 10, flex: 1 }}
                />
              </View>
            </View>

            {/* Order Summary Table */}
            <View style={styles.statsContainer}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <View style={styles.table}>
                {Object.entries(ordersData).map(([key, value], index) => (
                  <View key={key} style={[styles.tableRow, index === 0 && styles.tableHeaderRow]}>
                    <Text style={[styles.tableText, index === 0 && styles.tableHeader]}>{key}</Text>
                    <Text style={[styles.tableText, index === 0 && styles.tableHeader]}>{value}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: { flex: 1, backgroundColor: "#f4f4f4" },
  container: { flexDirection: "row", flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 100, minHeight: "45%", position: "absolute" },

  mainContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  filterContainer: { flexDirection: "row", marginBottom: 15 },
  filterButton: { padding: 8, borderRadius: 10, backgroundColor: "#fff", marginRight: 10 },
  selectedFilter: { backgroundColor: "#280300" },
  filterText: { fontSize: 14, color: "#333" },
  selectedFilterText: { color: "#fff" },

  cardScrollView: { marginBottom: 20, padding: 25 },
  card: {
    width: 210,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 10,
    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
  },
  cardTitle: { fontSize: 14, fontWeight: "bold", color: "#F9622C" },
  cardValue: { fontSize: 18, fontWeight: "bold", marginTop: 5 },

  walletContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 950,
    marginBottom: 20,
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)"
  },

  walletCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    width: 900,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.01)"
  },

  walletCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    width: 250,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)"
  },

  walletButton: {
    backgroundColor: "#F9622C",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  walletButtonText: { color: "#fff", fontWeight: "bold" },

  chartArea: {
    flex: 1,
    flexDirection: "row",
    elevation: 5,
    width: 1000,
    padding: 10,
  },
  chartContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "50%",
  },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  statsContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20 },
  table: { borderWidth: 1, borderColor: "#ddd", borderRadius: 10, width: 900 },
  tableRow: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  tableHeaderRow: { backgroundColor: "#F9622C" },
  tableText: { fontSize: 14 },
  tableHeader: { fontWeight: "bold", color: "#fff" },

  bannerContainer: {
    backgroundColor: "#fff", // Same background color as other containers
    borderRadius: 10, // Same border radius
    padding: 20, // Padding for the banner section
    marginVertical: 20, // Vertical margin
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    width: 948, // Width for banner section
  },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 5, padding: 10, marginBottom: 10 },
  countryButtons: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10},
  bannersList: { marginTop: 10 },
  bannerItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
});

export default AdminDashboard;