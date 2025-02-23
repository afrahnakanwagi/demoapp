import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddProduct() {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Home Deco"); // Default category

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>My Store</Text>
      </View>

      {/* Back to Dashboard Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.formWrapper}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add a Product</Text>

          {/* Product Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          {/* Product Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter product description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          {/* Price */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Price</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>

          {/* Quantity */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
          </View>

          {/* Category */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categorySelector}>
              {["Home Deco", "Art", "Jewelry"].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonSelected,
                  ]}
                  onPress={() => handleCategoryChange(cat)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      category === cat && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    minheight: "40%",
  },
  navbar: {
    height: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  navTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#007AFF",
  },
  formWrapper: {
    alignItems: "center",
    paddingVertical: 20,
  },
  formContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    marginTop: 5,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  categorySelector: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "space-between",
  },
  categoryButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  categoryButtonSelected: {
    backgroundColor: "#007AFF",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#333",
  },
  categoryButtonTextSelected: {
    color: "#fff",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

