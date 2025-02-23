import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  StyleSheet,
} from "react-native";
import { Search, ChevronDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../hooks/use-language";

const Sidebar = () => {
  const navigation = useNavigation();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState({});
  const [fadeAnim] = useState(new Animated.Value(0));
  const [search, setSearch] = useState("");
  const [activeRoute, setActiveRoute] = useState("");

  // Sidebar Menu Items
  const menuItems = [
    { label: t("dashboard"), route: "AdminDashboard" },
    {
      label: t("reports"),
      route: "Reports",
      subItems: [
        { label: t("salesReport"), route: "SalesReport" },
        { label: t("orderReport"), route: "OrderReport" },
        { label: t("deliveryReports"), route: "DeliveryReportsScreen" },
        { label: t("vendorReport"), route: "VendorReport" },
      ],
    },
    {
      label: t("products"),
      route: "Products",
      subItems: [
        { label: t("allProducts"), route: "ProductList" },
        { label: t("categories"), route: "ProductCategories" },
        { label: t("inventory"), route: "ProductInventory" },
      ],
    },
    {
      label: t("orders"),
      route: "Orders",
      subItems: [
        { label: t("allOrders"), route: "OrdersScreen" },
        { label: t("pending"), route: "PendingOrders" },
        { label: t("completed"), route: "CompletedOrders" },
        { label: t("cancelled"), route: "CancelledOrders" },
      ],
    },
    {
      label: t("wallet"),
      route: "Wallet",
      subItems: [
        { label: t("transactions"), route: "TransactionsScreen" },
        { label: t("balance"), route: "BalanceScreen" },
        { label: t("transfer"), route: "TransferScreen" },
        { label: t("withdraw"), route: "WithdrawScreen" },
        { label: t("deposit"), route: "DepositScreen" },
        // { label: t("TransactionHistory"), route: "TransactionHistoryScreen" },
        // { label: t("Wallet"), route: "WalletScreen" },
      ],
    },
    { label: t("chat"), route: "ChatList" },
    {
      label: t("users"),
      route: "Users",
      subItems: [
        { label: t("allusers"), route: "AllUsersScreen" },
        { label: t("customers"), route: "CustomersScreen" },
        { label: t("vendors"), route: "VendorsScreen" },
      ],
    },
    {
      label: t("employeeManagement"),
      route: "EmployeeManagement",
      subItems: [
        { label: t("employeeList"), route: "EmployeeList" },
        { label: t("addEmployee"), route: "AddEmployee" },
      ],
    },
    {
      label: t("loanManagement"),
      route: "LoanManagement",
      subItems: [
        { label: t("loanApplications"), route: "LoanApplications" },
        { label: t("approvedLoans"), route: "ApprovedLoans" },
        { label: t("loanRepayments"), route: "LoanRepayments" },
      ],
    },
    { label: t("settings"), route: "SettingsScreen" },
  ];

  // Toggle sub-menu expansion
  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
    Animated.timing(fadeAnim, {
      toValue: expanded[key] ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Handle Navigation
  const handleNavigation = (route) => {
    console.log("Navigating to:", route);
    setActiveRoute(route);
    navigation.navigate(route);
  };

  // Back to Dashboard
  const handleBackToDashboard = () => {
    setActiveRoute("AdminDashboard");
    navigation.navigate("AdminDashboard");
  };

  // Filter Menu Items
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.sidebar}>
      {/* Back to Dashboard Button */}
      {activeRoute !== "AdminDashboard" && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToDashboard}
        >
          <Text style={styles.menuText}>{t("backToDashboard")}</Text>
        </TouchableOpacity>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#374151" size={20} />
        <TextInput
          style={styles.searchInput}
          placeholder={t("search")}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Sidebar Menu */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredItems.map((item, index) => (
          <View key={index}>
            {/* Main Menu Item */}
            <TouchableOpacity
              style={[
                styles.menuItem,
                activeRoute === item.route && styles.menuItemActive,
                expanded[item.label] && { backgroundColor: "#e0f2fe" },
              ]}
              onPress={() =>
                item.subItems ? toggleExpand(item.label) : handleNavigation(item.route)
              }
            >
              <Text style={styles.menuText}>{item.label}</Text>
              {item.subItems && (
                <ChevronDown
                  size={16}
                  color={expanded[item.label] ? "#1e40af" : "#374151"}
                />
              )}
            </TouchableOpacity>

            {/* Submenu Items */}
            {expanded[item.label] && item.subItems && (
              <Animated.View style={{ opacity: fadeAnim }}>
                <View style={styles.subMenu}>
                  {item.subItems.map((subItem, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={styles.subMenuItem}
                      onPress={() => handleNavigation(subItem.route)}
                    >
                      <Text style={styles.subMenuText}>{subItem.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  sidebar: {
    width: 260,
    height: "100%",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    marginTop: -80,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    height: 30,
    fontSize: 14,
    flex: 1,
    color: "#374151",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
    marginBottom: 8,
  },
  menuItemActive: {
    backgroundColor: "#e0f2fe",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  subMenu: {
    paddingLeft: 20,
    marginTop: 5,
  },
  subMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    marginBottom: 6,
  },
  subMenuText: {
    fontSize: 14,
    color: "#555",
  },
});

export default Sidebar;
