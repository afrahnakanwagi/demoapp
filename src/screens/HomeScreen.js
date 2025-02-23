// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView, Picker } from "react-native";
// import { LineChart, PieChart } from "react-native-chart-kit";
// import { Dimensions } from "react-native";
// import Sidebar from "../components/Sidebar";

// const DashboardScreen = ({ navigation }) => {
//   const [currency, setCurrency] = useState("UGX");
//   const chartWidth = (Dimensions.get("window").width - 240) / 2; // Reduced chart width

//   const formatCurrency = (amount) => `${currency} ${amount.toLocaleString()}`;

//   return (
//     <View style={styles.container}>
//       <Sidebar navigation={navigation} />
//       <ScrollView style={styles.content}>
//         <Text style={styles.title}>Admin Dashboard</Text>

//         {/* Currency Selector */}
//         <View style={styles.currencySelectorContainer}>
//           <Text style={styles.currencyLabel}>Select Currency:</Text>
//           <View style={styles.currencyPickerWrapper}>
//             <Picker
//               selectedValue={currency}
//               style={styles.picker}
//               onValueChange={(itemValue) => setCurrency(itemValue)}
//             >
//               <Picker.Item label="Ugandan Shilling (UGX)" value="UGX" />
//               <Picker.Item label="Rwandan Franc (RWF)" value="RWF" />
//             </Picker>
//           </View>
//         </View>

//         {/* Summary Boxes */}
//         <View style={styles.summaryContainer}>
//           {["Total Sales", "Total Orders", "Total Revenue", "Total Customers"].map((title, index) => (
//             <View key={index} style={styles.summaryBox}>
//               <Text style={styles.summaryTitle}>{title}</Text>
//               <Text style={styles.summaryValue}>{
//                 title === "Total Sales" ? formatCurrency(34456) :
//                 title === "Total Orders" ? "3,456" :
//                 title === "Total Revenue" ? formatCurrency(1456) : "42,456"
//               }</Text>
//             </View>
//           ))}
//         </View>

//         {/* Charts Container */}
//         <View style={styles.chartsContainer}>
//           {/* Revenue Trends (Line Chart) */}
//           <View style={styles.chartBox}>
//             <Text style={styles.chartTitle}>Revenue Trends</Text>
//             <LineChart
//               data={{
//                 labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//                 datasets: [{ data: [1000000, 2000000, 1500000, 3000000, 2500000, 4000000] }],
//               }}
//               width={420}
//               height={200}
//               yAxisLabel={currency + " "}
//               chartConfig={{
//                 backgroundColor: "#A52A2A",
//                 backgroundGradientFrom: "#A52A2A",
//                 backgroundGradientTo: "#800000",
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               }}
//               style={{ marginVertical: 8, borderRadius: 8 }}
//             />
//           </View>

//           {/* User Distribution (Pie Chart) */}
//           <View style={styles.chartBox}>
//             <Text style={styles.chartTitle}>User Distribution</Text>
//             <PieChart
//               data={[
//                 { name: "Vendors", population: 400, color: "#ff6347", legendFontColor: "#000" },
//                 { name: "Customers", population: 1200, color: "#4682b4", legendFontColor: "#000" },
//               ]}
//               width={420}
//               height={200}
//               chartConfig={{
//                 backgroundColor: "#A52A2A",
//                 backgroundGradientFrom: "#A52A2A",
//                 backgroundGradientTo: "#800000",
//                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//               }}
//               accessor="population"
//               backgroundColor="transparent"
//               paddingLeft="15"
//               absolute
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, flexDirection: "row" },
//   content: { flex: 1, padding: 20, backgroundColor: "#fff", marginLeft: 80, fontFamily: "Poppins" },
//   title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333", fontFamily: "Poppins" },
//   currencySelectorContainer: { flexDirection: "row", width:"60%", alignItems: "center", marginBottom: 20, backgroundColor: "#fff", borderRadius: 10, padding: 12, boxshadowColor: "#A52A2A", boxshadowOpacity: 0.5, shadowRadius: 4, shadowOffset: { width: 2, height: 2 }, elevation: 5 },
//   currencyLabel: { fontSize: 16, fontWeight: "bolder", color: "#A52A2A", marginRight: 10, fontFamily: "Poppins" },
//   currencyPickerWrapper: { width: "40%",  border: "1px solid #A52A2A", borderRadius: 5 },
//   picker: { height: 40, color: "#A52A2A", fontWeight: "bolder" },
//   summaryContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
//   summaryBox: { backgroundColor: "#fff", padding: 18, borderRadius: 10, width: "23%", alignItems: "center", elevation: 5, boxshadowColor: "#000", boxshadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
//   summaryTitle: { color: "#333", fontSize: 14, marginBottom: 5, fontWeight: "bold", fontFamily: "Poppins" },
//   summaryValue: { color: "#A52A2A", fontSize: 18, fontWeight: "bold", fontFamily: "Poppins" },
//   chartsContainer: { flexDirection: "row", justifyContent: "space-between", gap: 20, marginTop: 20 },
//   chartBox: { width: "50%", backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 5, boxshadowColor: "#000", boxshadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
//   chartTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10, color: "#333", fontFamily: "Poppins" },
// });

// export default HomeScreen;
