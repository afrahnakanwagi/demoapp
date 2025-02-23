import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Switch 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const EmployeeList = () => {
  const navigation = useNavigation();
  
  // Sample employee data with Uganda (+256) and Rwanda (+250) numbers
  const [employees, setEmployees] = useState([
    { id: 1, name: "Immy Abakwase", role: "Manager", email: "immyab@example.com", contact: "+256789123456", active: true },
    { id: 2, name: "Vivian Ahereza", role: "Sales", email: "vahereza@example.com", contact: "+250788123456", active: true },
    { id: 3, name: "Aisha Nambatya", role: "Support", email: "aisha@example.com", contact: "+256701234567", active: false },
  ]);

  // Toggle employee active status
  const toggleStatus = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back to Dashboard */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Employee List</Text>

      {/* Employee Table */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            {/* Table Headers */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Name</Text>
              <Text style={styles.headerText}>Role</Text>
              <Text style={styles.headerText}>Email</Text>
              <Text style={styles.headerText}>Contact</Text>
              <Text style={styles.headerText}>Status</Text>
            </View>

            {/* Employee Rows */}
            {employees.map((emp) => (
              <View key={emp.id} style={styles.tableRow}>
                <Text style={styles.cell}>{emp.name}</Text>
                <Text style={styles.cell}>{emp.role}</Text>
                <Text style={styles.cell}>{emp.email}</Text>
                <Text style={styles.cell}>{emp.contact}</Text>
                <View style={styles.switchContainer}>
                  <Switch
                    value={emp.active}
                    onValueChange={() => toggleStatus(emp.id)}
                    trackColor={{ false: "#ccc", true: "#4CAF50" }}
                    thumbColor={emp.active ? "#ffffff" : "#F9622C"}
                  />
                  <Text style={styles.statusText}>
                    {emp.active ? "Enabled" : "Disabled"}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  backButton: { marginBottom: 10 },
  backText: { color: "#F9622C", fontSize: 16, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  

  tableContainer: { flex: 1, alignItems: "center", justifyContent: "center", width: "100%", paddingLeft: 150 },
  
  // Table Styles
  table: { width: 900, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, overflow: "hidden", alignSelf: "center"},
  tableHeader: { flexDirection: "row", backgroundColor: "#F9622C", paddingVertical: 12 },
  headerText: { flex: 1, color: "#fff", fontWeight: "bold", textAlign: "center", fontSize: 16 },
  tableRow: { flexDirection: "row", backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#ddd" },
  cell: { flex: 1, padding: 12, textAlign: "center", fontSize: 14 },

  // Switch Container
  switchContainer: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  statusText: { marginLeft: 8, fontSize: 14, fontWeight: "bold" },
});

export default EmployeeList;
