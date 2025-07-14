import { useLocalSearchParams, useNavigation } from "expo-router";
import { Paperclip, Send } from "lucide-react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { id, agency, amount, status } = useLocalSearchParams();
  const navigation = useNavigation();
  const installment = Number(amount) / 3;
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello, we're contacting you about your outstanding balance of ${Number(amount).toFixed(2)}`,
      sender: "other",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "Hi, I'm aware of the balance. Can we discuss payment options?",
      sender: "user",
      time: "10:35 AM",
    },
    {
      id: 3,
      text: `Of course. We can offer you a payment plan with 3 monthly installments of ${installment.toFixed(2)}`,
      sender: "other",
      time: "10:37 AM",
    },
    {
      id: 4,
      text: "Yes, that's a very comfortable plan. I appreciate your support in arranging this.",
      sender: "user",
      time: "10:40 AM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Add user message
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Show typing animation
      setIsTyping(true);

      // After 2 seconds, hide typing animation and send auto-reply
      setTimeout(() => {
        setIsTyping(false);

        const autoReply = {
          id: messages.length + 2,
          text: "Thank you for the message, we will get back to you immediately",
          sender: "other",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, autoReply]);
      }, 2000);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="bg-[#4F46E5] px-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="flex-1">
              <Text className="text-white text-lg font-semibold">
                XYZ Recovery
              </Text>
              <Text className="text-indigo-200 text-sm">Active now</Text>
            </View>
          </View>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#4F46E5",
      },
      headerTintColor: "#fff",
    });
  }, [agency]);

  const renderMessage = (msg) => {
    const isUser = msg.sender === "user";
    return (
      <View
        key={msg.id}
        className={`mb-4 ${isUser ? "items-end" : "items-start"}`}
      >
        <View
          className={`max-w-[280px] px-4 py-3 rounded-2xl ${
            isUser ? "bg-blue-500 rounded-br-md" : "bg-gray-200 rounded-bl-md"
          }`}
        >
          <Text
            className={`text-base ${isUser ? "text-white" : "text-gray-800"}`}
          >
            {msg.text}
          </Text>
        </View>
        <View
          className={`flex-row items-center mt-1 ${isUser ? "justify-end" : "justify-start"}`}
        >
          <Text className="text-xs text-gray-500 mr-1">{msg.time}</Text>
          {isUser && (
            <View className="flex-row">
              <Text className="text-blue-500 text-xs">✓</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />

      <ScrollView className="flex-1 px-4 py-4">
        {messages.map(renderMessage)}

        {/* Typing indicator - only show when isTyping is true */}
        {isTyping && (
          <View className="items-start mb-4">
            <View className="bg-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-pulse" />
                <View className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-pulse" />
                <View className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <View className="px-4 py-3 bg-white border-t border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3">
            <Paperclip size={24} color="#6b7280" />
          </TouchableOpacity>

          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>

          <TouchableOpacity
            className="ml-3 bg-indigo-500 rounded-full p-2"
            onPress={sendMessage}
          >
            <Send size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
