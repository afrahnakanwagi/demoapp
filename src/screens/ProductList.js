import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Button, Alert, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");

  // Dummy product data with local images
  const products = [
    { id: 1, title: "Bead Bag", price: "20,000 UGX", description: "A beautiful bead bag.", image: require('../../assets/beadbag.png') },
    { id: 2, title: "Bracelet", price: "15,000 UGX", description: "A stylish bracelet.", image: require('../../assets/bracelet.png') },
    { id: 3, title: "Wall Painting", price: "50,000 UGX", description: "An artistic wall painting.", image: require('../../assets/wallpainting.png') },
    { id: 4, title: "Sea Shell Deco", price: "30,000 UGX", description: "Decorative sea shell.", image: require('../../assets/seashelldeco.png') },
  ];

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setQuantity("");
    setModalVisible(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete ${selectedProduct.title}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
            alert(`${selectedProduct.title} deleted.`);
            setDeleteModalVisible(false);
            setSelectedProduct(null);
          }
        },
      ]
    );
  };

  const handleUpdateProduct = () => {
    // Logic to update the product
    alert(`Product ${selectedProduct.title} updated with quantity: ${quantity}.`);
    setModalVisible(false);
    setSelectedProduct(null);
    setQuantity("");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Product List</Text>
      
      <View style={styles.productContainer}>
        {products.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image source={product.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{product.title}</Text>
            <Text style={styles.cardPrice}>{product.price}</Text>
            <Text style={styles.cardDescription}>{product.description}</Text>
            <View style={styles.cardActions}>
              <Button title="Delete" color="#F9622C" onPress={() => handleDeleteClick(product)} />
            </View>
          </View>
        ))}
      </View>

      {/* Edit Product Modal
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      > */}
        {/* <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Product</Text>
            <Text style={styles.modalText}>Title: {selectedProduct?.title}</Text>
            <Text style={styles.modalText}>Price: {selectedProduct?.price}</Text>
            <Text style={styles.modalText}>Description: {selectedProduct?.description}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
            <Button title="Update" color="red" onPress={handleUpdateProduct} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal> */}

      {/* Delete Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalText}>Are you sure you want to delete {selectedProduct?.title}?</Text>
            <Button title="Delete" color="#F9622C" onPress={confirmDelete} />
            <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { marginBottom: 10 },
  backText: { color: "red", fontSize: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
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
    width: "30%", 
    margin: 5, 
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#F9622C" },
  cardPrice: { fontSize: 16, color: "green" },
  cardDescription: { fontSize: 14, color: "#555" },
  cardActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },

  // Modal Styles
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: 300, backgroundColor: "white", borderRadius: 10, padding: 20, alignItems: "center", elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalText: { marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default ProductList;