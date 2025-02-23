import React, { useState, useEffect, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';

const ChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { chatName } = route.params;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      receiveAutoMessage("Hey! How are you?");
    }, 1000);
  }, []);

  const receiveAutoMessage = (text) => {
    const newMessage = { id: Date.now().toString(), type: 'receive', text };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const sendMsg = () => {
    if (inputText.trim() === '') return;

    const newMessage = { id: Date.now().toString(), type: 'send', text: inputText };
    setMessages((prev) => [newMessage, ...prev]);
    setInputText('');

    setShowPopup(true);

    setTimeout(() => {
      receiveAutoMessage("Got your message!");
    }, 2000);

    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Navbar />

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{chatName}</Text>
      </View>

      {/* Popup Notification */}
      {showPopup && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Message Sent Successfully!</Text>
        </View>
      )}

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItemMemo item={item} />}
        inverted
        contentContainerStyle={styles.listStyle}
      />

      {/* Input & Actions */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.receiveButton} onPress={() => receiveAutoMessage("Hello from the other side!")}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#F9622C" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMsg} disabled={inputText.length === 0}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Optimized Message Item
const ChatItem = ({ item }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.chatItemCommon, item.type === 'send' ? styles.send : styles.receive, { opacity: fadeAnim }]}>
      <Text style={[styles.msgtxt, item.type === 'send' ? styles.sendText : styles.receiveText]}>
        {item.text}
      </Text>
    </Animated.View>
  );
};

// Memoized Chat Item to avoid unnecessary re-renders
const ChatItemMemo = memo(ChatItem);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header Styling
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9622C',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  backButton: { marginRight: 10 },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },

  // Popup Styling
  popupContainer: {
    backgroundColor: '#F9622C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 5,
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Chat Message Styling
  listStyle: { paddingHorizontal: 10, paddingBottom: 20 },
  chatItemCommon: {
    maxWidth: '75%',
    padding: 12,
    marginVertical: 5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  send: {
    alignSelf: 'flex-end',
    backgroundColor: '#F9622C',
    borderBottomRightRadius: 0,
    borderTopRightRadius: 15,
  },
  receive: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 15,
  },
  msgtxt: { fontSize: 16, color: '#fff' },
  sendText: { color: '#fff' },
  receiveText: { color: '#333' },

  // Message Input Styling
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#333',
    borderRadius: 25,
    backgroundColor: '#f3f3f3',
    height: 50,
  },
  sendButton: {
    backgroundColor: '#F9622C',
    padding: 12,
    borderRadius: 50,
    marginLeft: 10,
  },
  receiveButton: {
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default ChatScreen;