import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";

const VendorProductsModal = ({ vendor, isVisible, onClose }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (vendor) {
      fetchVendorProducts(vendor.id);
    }
  }, [vendor]);

  const fetchVendorProducts = async (vendorId) => {
    try {
      const response = await axios.get(`https://your-api.com/vendors/${vendorId}/products/`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={{ backgroundColor: "white", padding: 20 }}>
        <Text>Products for {vendor?.name}</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name} - ${item.price}</Text>}
        />
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default VendorProductsModal;
