import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatsCard = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: "#fff", padding: 20, borderRadius: 10, marginRight: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardValue: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
});

export default StatsCard;
