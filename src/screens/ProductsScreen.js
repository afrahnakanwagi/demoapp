import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  // Fade-in animation on screen load
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }} className="p-4 bg-gray-100 flex-1">
      <Text className="text-3xl font-bold text-gray-800 mb-6">Products</Text>

      {/* Add Product Button */}
      <TouchableOpacity
        className="bg-black p-4 rounded-lg mb-4 transition duration-300 transform hover:scale-105"
        onPress={() => navigation.navigate('AddProduct')}
      >
        <Text className="text-white text-center font-bold text-lg">➕ Add Product</Text>
      </TouchableOpacity>

      {/* View Products Button */}
      <TouchableOpacity
        className="bg-black p-4 rounded-lg mb-4 transition duration-300 transform hover:scale-105"
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text className="text-white text-center font-bold text-lg">📦 View Products</Text>
      </TouchableOpacity>

      {/* Back to Dashboard Button */}
      <TouchableOpacity
        className="bg-black p-4 rounded-lg transition duration-300 transform hover:scale-105"
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text className="text-white text-center font-bold text-lg">🏠 Back to Dashboard</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ProductsScreen;
