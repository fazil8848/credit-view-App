import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const DebtStatCard = ({ item }) => {
  return (
    <View className="rounded-lg overflow-hidden shadow-lg mb-4 w-44">
      <LinearGradient
        colors={item.colors}
        start={[0, 0]}
        end={[1, 1]}
        className="p-6 justify-center h-full"
      >
        <Text className="text-white font-roboto text-base">{item.title}</Text>
        <Text className="text-white text-2xl font-roboto-bold">
          {item.value}
        </Text>
        <Text className="bg-white-10 rounded-lg py-1 px-2 w-14 text-white">
          &#x2191; 2.5%
        </Text>
      </LinearGradient>
    </View>
  );
};

export default DebtStatCard;
