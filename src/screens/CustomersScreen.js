import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Button, Dialog, Portal, TextInput } from "react-native-paper"; 

const CustomersScreen = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmDialogVisible, setConfirmDialogVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://your-api.com/customers/");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const toggleCustomerStatus = async (customerId, isActive) => {
    try {
      await axios.post(`https://your-api.com/customers/${customerId}/`, {
        is_active: isActive,
      });
      fetchCustomers();
    } catch (error) {
      console.error("Error updating customer status:", error);
    }
  };

  const handleDisableEnable = (customer) => {
    setSelectedCustomer(customer);
    setConfirmDialogVisible(true); // Open confirmation dialog
  };

  const confirmStatusChange = (status) => {
    if (selectedCustomer) {
      toggleCustomerStatus(selectedCustomer.id, status);
      setConfirmDialogVisible(false);
      setModalVisible(false); // Close the modal after action
    }
  };

  return (
    <View style={styles.container}>
      {/* Back to Admin Dashboard Button */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AdminDashboard")}
        style={styles.backButton}
      >
        Back to Admin Dashboard
      </Button>

      <Text style={styles.title}>Customers</Text>

      {/* Customers List */}
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCustomer(item);
              setModalVisible(true);
            }}
          >
            <View style={styles.customerCard}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerEmail}>{item.email}</Text>
              <Text style={styles.customerStatus}>
                {item.is_active ? "Active" : "Disabled"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <Portal>
          <Dialog visible={isModalVisible} onDismiss={() => setModalVisible(false)}>
            <Dialog.Title>Customer Details</Dialog.Title>
            <Dialog.Content>
              <Text>Name: {selectedCustomer.name}</Text>
              <Text>Email: {selectedCustomer.email}</Text>
              <Text>Status: {selectedCustomer.is_active ? "Active" : "Disabled"}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setModalVisible(false)}>Close</Button>
              <Button
                onPress={() =>
                  handleDisableEnable(selectedCustomer)
                }
                style={{ backgroundColor: "#F9622C" }}
              >
                {selectedCustomer.is_active ? "Disable" : "Enable"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}

      {/* Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={isConfirmDialogVisible}
          onDismiss={() => setConfirmDialogVisible(false)}
        >
          <Dialog.Title>Confirm Status Change</Dialog.Title>
          <Dialog.Content>
            <Text>
              Are you sure you want to {selectedCustomer?.is_active ? "disable" : "enable"} this customer?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDialogVisible(false)}>Cancel</Button>
            <Button
              onPress={() => confirmStatusChange(!selectedCustomer?.is_active)}
              style={{ backgroundColor: "#F9622C" }}
            >
              Confirm
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CustomersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  backButton: { marginBottom: 15, backgroundColor: "#F9622C" }, // Style the back button
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, fontFamily: "sans-serif" }, // Sans-serif font
  customerCard: {
    flex: 1,
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "sans-serif", // Sans-serif font
  },
  customerEmail: {
    fontSize: 14,
    fontFamily: "sans-serif", // Sans-serif font
  },
  customerStatus: {
    fontSize: 12,
    fontStyle: "italic",
    fontFamily: "sans-serif", // Sans-serif font
  },
});
