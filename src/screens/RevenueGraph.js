import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Line } from 'react-chartjs-2';

const RevenueGraph = ({ data }) => {
  return (
    <View style={styles.chartWrapper}>
      <Text style={styles.sectionTitle}>Revenue Over Time</Text>
      <View style={styles.chartContainer}>
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 15 },
  chartWrapper: { width: "100%", alignItems: "center" },
  chartContainer: { width: "100%", height: 350, backgroundColor: "#fff", padding: 10, borderRadius: 10 },
});

export default RevenueGraph;
