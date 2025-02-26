import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Modal } from "react-native-modal";
import { DataTable } from "react-native-paper";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerDescription, setBannerDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    resetFields();
  };

  const resetFields = () => {
    setBannerUrl("");
    setBannerDescription("");
    setIsActive(true);
    setEditingIndex(null);
  };

  const addOrUpdateBanner = () => {
    if (bannerUrl.trim() === "" || bannerDescription.trim() === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const newBanner = { url: bannerUrl, description: bannerDescription, isActive };

    if (editingIndex !== null) {
      const updatedBanners = banners.map((banner, index) =>
        index === editingIndex ? newBanner : banner
      );
      setBanners(updatedBanners);
    } else {
      setBanners([...banners, newBanner]);
    }

    toggleModal();
  };

  const editBanner = (index) => {
    const bannerToEdit = banners[index];
    setBannerUrl(bannerToEdit.url);
    setBannerDescription(bannerToEdit.description);
    setIsActive(bannerToEdit.isActive);
    setEditingIndex(index);
    toggleModal();
  };

  const deleteBanner = (index) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  const toggleBannerStatus = (index) => {
    const updatedBanners = banners.map((banner, i) =>
      i === index ? { ...banner, isActive: !banner.isActive } : banner
    );
    setBanners(updatedBanners);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Banner Management</Text>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Add Banner</Text>
      </TouchableOpacity>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>URL</DataTable.Title>
          <DataTable.Title>Description</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        <ScrollView>
          {banners.map((banner, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{banner.url}</DataTable.Cell>
              <DataTable.Cell>{banner.description}</DataTable.Cell>
              <DataTable.Cell>{banner.isActive ? "Active" : "Inactive"}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity onPress={() => editBanner(index)}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteBanner(index)}>
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleBannerStatus(index)}>
                  <Text style={styles.actionText}>{banner.isActive ? "Deactivate" : "Activate"}</Text>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{editingIndex !== null ? "Edit Banner" : "Add Banner"}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Banner URL"
            value={bannerUrl}
            onChangeText={setBannerUrl}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Banner Description"
            value={bannerDescription}
            onChangeText={setBannerDescription}
          />
          <View style={styles.switchContainer}>
            <Text>Active:</Text>
            <TouchableOpacity onPress={() => setIsActive(!isActive)}>
              <Text style={styles.switchText}>{isActive ? "Yes" : "No"}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={addOrUpdateBanner}>
            <Text style={styles.buttonText}>{editingIndex !== null ? "Update" : "Add"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F9622C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  switchText: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#F9622C",
  },
  actionText: {
    color: "#007BFF",
    marginRight: 10,
  },
});

export default BannerManagement;