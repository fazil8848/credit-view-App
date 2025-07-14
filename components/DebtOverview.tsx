import React from "react";
import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const DebtOverview = ({ chartData, isDarkMode }) => {
  const screenWidth = Dimensions.get("screen").width;

  return (
    <View
      className={`border p-4 shadow-lg rounded-xl ${
        isDarkMode ? "bg-black border-gray-800" : "bg-white border-gray-100"
      }`}
    >
      <Text
        className={`text-2xl font-roboto-bold mb-2 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Debt Overview
      </Text>
      <PieChart
        data={chartData}
        width={screenWidth * 0.9}
        height={150}
        chartConfig={{
          color: (opacity = 1) =>
            isDarkMode
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default DebtOverview;
