import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, FAB } from 'react-native-paper';

const chats = [
  { id: '1', name: 'Aisha Nambatya', lastMessage: 'Hey, how are you?', avatar: require('../../assets/avatar1.png') },
  { id: '2', name: 'Ahereza Vivian', lastMessage: 'Let’s meet tomorrow.', avatar: require('../../assets/avatar2.png') },
  { id: '3', name: 'Immy Abakwase', lastMessage: 'Did you check the report?', avatar: require('../../assets/avatar3.png') },
];

const ChatListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Notification Banner */}
      <View style={styles.notificationBanner}>
        <Text style={styles.notificationText}>You have new messages!</Text>
      </View>

      {/* Top App Bar with Back Button */}
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Chats" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatScreen', { chatName: item.name })}
          >
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.chatTextContainer}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <FAB 
        style={styles.fab} 
        icon="plus" 
        onPress={() => console.log('New Chat')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', fontFamily: 'sans-serif' },
  appBar: { backgroundColor: '#F9622C' },
  notificationBanner: {
    backgroundColor: '#F9622C',
    padding: 10,
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
  },
  notificationText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: 10,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  chatTextContainer: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: 'bold', color: '#F9622C' },
  lastMessage: { fontSize: 14, color: '#666' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#F9622C' },
});

export default ChatListScreen;
