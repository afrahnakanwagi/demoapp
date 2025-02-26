import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = (values) => {
    const mockUser = { email: "admin@gmail.com", password: "admin12345" };

    if (values.email === mockUser.email && values.password === mockUser.password) {
      navigation.navigate("AdminDashboard"); // Navigate instantly
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign In</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="Email"
                  mode="outlined"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.input}
                  keyboardType="email-address"
                  accessibilityLabel="Email Input"
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                  label="Password"
                  mode="outlined"
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.input}
                  accessibilityLabel="Password Input"
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                <Button mode="contained" onPress={handleSubmit} style={styles.button} accessibilityLabel="Sign In Button">
                  <Text style={styles.buttonText}>Sign In</Text>
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  contentContainer: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    marginBottom: 10,
  },
  forgotPassword: {
    textAlign: "right",
    color: "blue",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#F9622C",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default LoginScreen;
