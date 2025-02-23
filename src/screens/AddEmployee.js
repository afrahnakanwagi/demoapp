import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddEmployee = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [country, setCountry] = useState("");

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!name || !role || !contact || !email || !nationalID || !country) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    Alert.alert(
      "Employee Added",
      `Name: ${name}\nRole: ${role}\nContact: ${contact}\nEmail: ${email}\nNID: ${nationalID}\nCountry: ${country}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back to Dashboard Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminDashboard")}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add Employee</Text>

      {/* Form Container with Shadow */}
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <TextInput 
            style={styles.input} 
            placeholder="Full Name" 
            value={name} 
            onChangeText={setName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Role" 
            value={role} 
            onChangeText={setRole} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Contact" 
            keyboardType="phone-pad" 
            value={contact} 
            onChangeText={setContact} 
          />
        </View>

        <View style={styles.row}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            keyboardType="email-address" 
            value={email} 
            onChangeText={setEmail} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="National ID" 
            value={nationalID} 
            onChangeText={setNationalID} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Country" 
            value={country} 
            onChangeText={setCountry} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
    backgroundColor: "#f5f5f5" 
  },
  backButton: { alignSelf: "flex-start", marginBottom: 10 },
  backText: { color: "#F9622C", fontSize: 16, fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
    width: "90%",
  },

  row: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 10 
  },
  input: { 
    backgroundColor: "#f0f0f0", 
    padding: 12, 
    borderRadius: 8, 
    flex: 1, 
    marginHorizontal: 5 
  },

  button: { 
    backgroundColor: "#F9622C", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center", 
    marginTop: 20 
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default AddEmployee;
