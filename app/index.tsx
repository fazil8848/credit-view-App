import { Feather } from "@expo/vector-icons"; // or "react-native-vector-icons/Feather"
import DebtOverview from "components/DebtOverview";
import DebtStatCard from "components/DebtStatCard";
import RecentDebts from "components/RecentDebts";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const debts = [
    { id: "1", agency: "ABC Collections", amount: 1250.5, status: "active" },
    { id: "2", agency: "XYZ Recovery", amount: 875.0, status: "active" },
    { id: "3", agency: "National Debt", amount: 2100.0, status: "settled" },
  ];

  const screenWidth = Dimensions.get("screen").width;

  const debtData = [
    {
      id: "1",
      title: "Total Debt",
      value: "$2125.50",
      colors: ["#8B5CF6", "#7C3AED"] as const,
    },
    {
      id: "2",
      title: "Settled",
      value: "$2000",
      colors: ["#10B981", "#059669"] as const,
    },
    {
      id: "3",
      title: "Car Loan",
      value: "$1500",
      colors: ["#F59E0B", "#D97706"] as const,
    },
  ];

  const chartData = [
    {
      name: "Active",
      amount: 2125.5,
      color: "#F59E0B",
      legendFontColor: isDarkMode ? "#FFF" : "#000",
    },
    {
      name: "Settled",
      amount: 2100,
      color: "#10B981",
      legendFontColor: isDarkMode ? "#FFF" : "#000",
    },
  ];

  return (
    <View
      className={`flex-1 justify-center ${isDarkMode ? "bg-black" : "bg-white"} pt-8 px-6`}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <ScrollView showsVerticalScrollIndicator={false} className="mb-5">
        <View className="flex-row items-center justify-between w-full ">
          <View className="">
            <Text
              className={`text-base font-roboto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Welcome back !
            </Text>
            <Text
              className={`text-3xl font-roboto-extra-bold ${isDarkMode ? "text-white" : "text-black"}`}
            >
              User
            </Text>
          </View>

          {/* Toggle Theme Button */}
          <TouchableOpacity
            onPress={toggleTheme}
            className=" m-4 p-2 rounded-full border border-gray-300"
          >
            <Feather
              name={isDarkMode ? "sun" : "moon"}
              size={24}
              color={isDarkMode ? "#fdba2a" : "#fdba2a"}
            />
          </TouchableOpacity>
        </View>
        <View className=" my-5 w-full h-64">
          <FlatList
            contentContainerStyle={{
              paddingBottom: 20,
              gap: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={debtData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <DebtStatCard item={item} />}
          />
        </View>
        <DebtOverview chartData={chartData} isDarkMode={isDarkMode} />

        <RecentDebts debts={debts} />
      </ScrollView>
    </View>
  );
};

export default Index;
