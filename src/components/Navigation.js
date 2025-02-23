import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import DashboardScreen from "./screens/AdminDashboard";
import VendorsScreen from "./screens/VendorsScreen";
import CustomersScreen from "./screens/CustomersScreen";
import EmployeesScreen from "./screens/EmployeesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Vendors" component={VendorsScreen} />
        <Drawer.Screen name="Customers" component={CustomersScreen} />
        <Drawer.Screen name="Employees" component={EmployeesScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
