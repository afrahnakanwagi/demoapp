// TransactionHistoryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const transactions = [
  { id: '1', name: 'Adobe After Effect', date: '03.23.2024', amount: 129.00, status: 'Pending' },
  { id: '2', name: 'Adobe Illustrator', date: '03.23.2024', amount: 129.00, status: 'Failed' },
  { id: '3', name: 'Adobe Photoshop', date: '03.23.2024', amount: 129.00, status: 'Success' },
  { id: '4', name: 'Adobe Lightroom', date: '03.23.2024', amount: 129.00, status: 'Success' },
];

const TransactionHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <Text>{`${item.name} - $${item.amount} - ${item.status}`}</Text>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default TransactionHistoryScreen;