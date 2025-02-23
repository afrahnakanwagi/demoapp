import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Card } from 'react-native-paper';

const data = [
  { label: 'Uganda', value: 65, color: '#4CAF50' },
  { label: 'Rwanda', value: 35, color: '#2196F3' },
];

const ChartUserByCountry = () => {
  const pieData = data.map((entry, index) => ({
    value: entry.value,
    svg: { fill: entry.color },
    key: `pie-${index}`,
  }));

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Users by Country</Text>
      <PieChart style={styles.chart} data={pieData} innerRadius={50} outerRadius={100} />
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.colorBox, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}%</Text>
        </View>
      ))}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    height: 200,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  colorBox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ChartUserByCountry;
