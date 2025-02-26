import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, ActivityIndicator, ScrollView, TextInput, FlatList, Text, Button, Modal, TouchableOpacity, Switch } from "react-native";
import { DataTable, TextInput as PaperInput } from "react-native-paper";
import axios from "axios";

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.1.44:8000/api/users/");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query.toLowerCase()) ||
          user.last_name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const toggleApproval = (user) => {
    setSelectedUser(user);
    setIsApproved(user.is_approved);
    setConfirmationModalVisible(true);
  };

  const confirmApproval = async () => {
    try {
      await axios.post(`http://192.168.1.44:8000/api/approve-vendor/${selectedUser.id}/`, {
        is_approved: isApproved,
      });
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, is_approved: isApproved } : user
      );
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setConfirmationModalVisible(false);
      alert("Approval status updated successfully.");
    } catch (error) {
      console.error("Error updating approval:", error);
    }
  };

  const handleSwitchChange = (value) => {
    setIsApproved(value);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>All Users</Text>
      <View style={styles.container}>
        <Button
          title="Back to Dashboard"
          onPress={() => navigation.navigate("AdminDashboard")}
          color="black"
        />
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search by name or email..."
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.input}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <DataTable>
          <DataTable.Header style={{ backgroundColor: "#F9622C" }}>
            <DataTable.Title textStyle={{ color: "#fff", fontWeight: "bold" }}>First Name</DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff", fontWeight: "bold" }}>Last Name</DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff", fontWeight: "bold" }}>Email</DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff", fontWeight: "bold" }}>Role</DataTable.Title>
            <DataTable.Title textStyle={{ color: "#fff", fontWeight: "bold" }}>Approval</DataTable.Title>
          </DataTable.Header>

          <ScrollView style={{ flex: 1 }}>
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleRowClick(item)}>
                  <DataTable.Row>
                    <DataTable.Cell>{item.first_name}</DataTable.Cell>
                    <DataTable.Cell>{item.last_name}</DataTable.Cell>
                    <DataTable.Cell>{item.email}</DataTable.Cell>
                    <DataTable.Cell>{item.is_vendor ? "Vendor" : "Customer"}</DataTable.Cell>
                    <DataTable.Cell>
                      <Switch
                        value={item.is_approved}
                        onValueChange={() => toggleApproval(item)}
                      />
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }} // Ensures enough space at the bottom
            />
          </ScrollView>

        </DataTable>
      )}

      {/* Modal for User Details */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "#fff", borderRadius: 10, borderColor: "#F9622C", borderWidth: 1 }}>
            {selectedUser && (
              <View>
                <Text style={{ fontSize: 18, marginBottom: 20, color: "#F9622C" }}>User Details</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                  <PaperInput label="First Name" value={selectedUser.first_name} style={{ width: "45%", marginBottom: 10 }} disabled />
                  <PaperInput label="Last Name" value={selectedUser.last_name} style={{ width: "45%", marginBottom: 10 }} disabled />
                  <PaperInput label="Email" value={selectedUser.email} style={{ width: "45%", marginBottom: 10 }} disabled />
                  <PaperInput label="Phone Number" value={selectedUser.phone_number || "N/A"} style={{ width: "45%", marginBottom: 10 }} disabled />
                  <PaperInput label="Status" value={selectedUser.is_vendor ? "Vendor" : "Customer"} style={{ width: "45%", marginBottom: 10 }} disabled />
                  <PaperInput label="Approval" value={selectedUser.is_approved ? "Approved" : "Pending"} style={{ width: "45%", marginBottom: 10 }} disabled />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
                  <Text style={{ color: "red" }}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal for Approval Confirmation */}
      <Modal
        transparent={true}
        visible={confirmationModalVisible}
        animationType="slide"
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <View style={{ width: 300, padding: 20, backgroundColor: "white", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Are you sure you want to {isApproved ? "approve" : "disapprove"} this user?
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => setConfirmationModalVisible(false)}>
                <Text style={{ color: "red" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmApproval}>
                <Text style={{ color: "#F9622C" }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    flex: 1, // Takes up remaining space
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
});

export default UsersScreen;
