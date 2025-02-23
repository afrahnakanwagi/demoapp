import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SideMenuMobile from './SideMenuMobile';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

export default function AppNavbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Appbar.Header style={styles.appBar}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <CustomIcon />
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <ColorModeIconDropdown />
        <TouchableOpacity onPress={() => toggleDrawer(true)} style={styles.menuButton}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
      </View>
    </Appbar.Header>
  );
}

function CustomIcon() {
  return (
    <View style={styles.iconContainer}>
      <Icon name="dashboard" size={16} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 8,
  },
  menuButton: {
    padding: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    backgroundColor: 'blue',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
