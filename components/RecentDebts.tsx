import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const RecentDebts = ({ debts }) => {
  return (
    <View className="my-5">
      <Text className="font-roboto text-lg">Recent Debts</Text>
      {debts.map((debt) => (
        <Link
          key={debt.id}
          href={{
            pathname: "/debt/[id]",
            params: debt,
          }}
          asChild
        >
          <TouchableOpacity
            className="border border-gray-100 p-4 my-2 bg-white rounded-md shadow-md"
            activeOpacity={0.8}
          >
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-roboto-bold text-xl">{debt.agency}</Text>
              <Text
                className={`font-roboto-bold text-xl ${
                  debt.status.toLowerCase() === "settled"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${debt.amount}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="font-roboto text-base text-gray-500">
                {debt.status} &#xb7; Updated today
              </Text>
              <Text className="font-roboto-bold text-base text-blue-500">
                View details
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default RecentDebts;
