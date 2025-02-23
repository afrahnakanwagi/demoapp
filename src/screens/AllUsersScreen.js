import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Button, DataTable, Modal, Portal, Switch, Provider } from "react-native-paper";
import axios from "axios";

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionType, setActionType] = useState(""); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://your-api.com/users/");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateUserStatus = async () => {
    if (!selectedUser) return;
    try {
      await axios.post(`https://your-api.com/users/${selectedUser.id}/`, {
        is_approved: actionType === "approve",
        is_blocked: actionType === "block",
      });
      fetchUsers();
      setConfirmModalVisible(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const openConfirmModal = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setConfirmModalVisible(true);
  };

  const openUserDetailsModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  useEffect(() => {
    if (filter === "approved") {
      setFilteredUsers(users.filter((user) => user.is_approved));
    } else if (filter === "pending") {
      setFilteredUsers(users.filter((user) => !user.is_approved));
    } else {
      setFilteredUsers(users);
    }
  }, [filter, users]);

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Users Dashboard</Text>

        {/* Back to Dashboard Button */}
        <Button mode="contained" onPress={() => navigation.navigate("AdminDashboard")} style={styles.backButton}>
          Back to Dashboard
        </Button>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <Button mode={filter === "all" ? "contained" : "outlined"} onPress={() => setFilter("all")} color="#F9622C">All</Button>
          <Button mode={filter === "approved" ? "contained" : "outlined"} onPress={() => setFilter("approved")} color="#F9622C">Approved</Button>
          <Button mode={filter === "pending" ? "contained" : "outlined"} onPress={() => setFilter("pending")} color="#F9622C">Pending</Button>
        </View>

        {/* Users Table */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Role</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Actions</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => openUserDetailsModal(item)}>
                <DataTable.Row>
                  <DataTable.Cell>{item.username}</DataTable.Cell>
                  <DataTable.Cell>{item.email}</DataTable.Cell>
                  <DataTable.Cell>{item.role === "vendor" ? "Vendor" : "Customer"}</DataTable.Cell>
                  <DataTable.Cell>{item.is_approved ? "Approved" : "Pending"}</DataTable.Cell>
                  <DataTable.Cell>
                    <Switch 
                      value={item.is_approved} 
                      onValueChange={() => openConfirmModal(item, item.is_approved ? "decline" : "approve")} 
                      color="#F9622C"
                    />
                    <Button mode="text" onPress={() => openConfirmModal(item, "block")} color="red">
                      Block
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            )}
          />
        </DataTable>

        {/* User Details Modal */}
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
            {selectedUser && (
              <View>
                <Text style={styles.modalTitle}>User Details</Text>
                <Text>Username: {selectedUser.username}</Text>
                <Text>Email: {selectedUser.email}</Text>
                <Text>Role: {selectedUser.role === "vendor" ? "Vendor" : "Customer"}</Text>
                <Text>Status: {selectedUser.is_approved ? "Approved" : "Pending"}</Text>
                <Button onPress={() => setModalVisible(false)} color="#F9622C">Close</Button>
              </View>
            )}
          </Modal>
        </Portal>

        {/* Confirm Action Modal */}
        <Portal>
          <Modal visible={confirmModalVisible} onDismiss={() => setConfirmModalVisible(false)} contentContainerStyle={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Action</Text>
            {selectedUser && (
              <Text>
                Are you sure you want to {actionType} {selectedUser.username}?
              </Text>
            )}
            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={updateUserStatus} color="#F9622C">Yes</Button>
              <Button mode="outlined" onPress={() => setConfirmModalVisible(false)} color="#F9622C">No</Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  backButton: { marginBottom: 15, backgroundColor: "#F9622C" },
  filterContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  modalContainer: { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
});
