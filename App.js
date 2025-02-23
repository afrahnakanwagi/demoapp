import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import AdminDashboard from './src/screens/AdminDashboard';
// import HomeScreen from './src/screens/HomeScreen';
import VendorsScreen from './src/screens/VendorsScreen';
import CustomersScreen from './src/screens/CustomersScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatScreen from './src/screens/ChatScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import AddProduct from "./src/screens/AddProduct";
import ProductList from "./src/screens/ProductList";
import TransactionsScreen from "./src/screens/TransactionsScreen";
import BalanceScreen from "./src/screens/BalanceScreen";
import TransferScreen from "./src/screens/TransferScreen";
import DeliveryReportsScreen from "./src/screens/DeliveryReportsScreen";
import LoanRepayments from "./src/screens/LoanRepayments";
import AllUsersScreen from "./src/screens/AllUsersScreen";
import LoanApplications from "./src/screens/LoanApplications";
import SalesReport from "./src/screens/SalesReport";
import AddEmployee from "./src/screens/AddEmployee";
import EmployeeList from "./src/screens/EmployeeList";
import ApprovedLoans from "./src/screens/ApprovedLoans";
import SettingsScreen from "./src/screens/SettingsScreen";
import WalletScreen from "./src/screens/WalletScreen";
import DepositScreen from "./src/screens/DepositScreen";
import WithdrawScreen from "./src/screens/WithdrawScreen";
import TransactionHistoryScreen from "./src/screens/TransactionHistoryScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="VendorsScreen" component={VendorsScreen} />
        <Stack.Screen name="CustomersScreen" component={CustomersScreen} />
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params.chatName })} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
        <Stack.Screen name="BalanceScreen" component={BalanceScreen} />
        <Stack.Screen name="TransferScreen" component={TransferScreen} />
        <Stack.Screen name="DeliveryReportsScreen" component={DeliveryReportsScreen} />
        <Stack.Screen name="LoanRepayments" component={LoanRepayments} />
        <Stack.Screen name="AllUsersScreen" component={AllUsersScreen} />
        <Stack.Screen name="LoanApplications" component={LoanApplications} />
        <Stack.Screen name="SalesReport" component={SalesReport} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="ApprovedLoans" component={ApprovedLoans} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="WalletScreen" component={WalletScreen} />
        <Stack.Screen name="DepositScreen" component={DepositScreen} />
        <Stack.Screen name="WithdrawScreen" component={WithdrawScreen} />
        <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
