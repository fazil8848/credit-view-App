import { Ionicons } from "@expo/vector-icons";
import PaymentTimeline from "components/PaymentTimeline";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DebtDetailPage = () => {
  const debt = useLocalSearchParams();
  const { id, agency, amount, status } = debt;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: agency || "Debt Details",
      headerStyle: {
        backgroundColor: "#4F46E5",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: "RobotoBold",
      },
    });
  }, [agency]);

  return (
    <View className="p-6 flex-1 bg-white rounded-xl">
      <ScrollView
        className=""
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={["#4F46E5", "#6366F1"]}
          start={[0, 0]}
          end={[1, 1]}
          className="p-5"
          style={{ borderRadius: 20 }}
        >
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-gray-100 text-base font-roboto">
                Collection Agency
              </Text>
              <Text className="text-white text-xl font-roboto-bold">
                {agency}
              </Text>
            </View>
            <Text className="text-white py-2 capitalize px-4 font-roboto bg-white-10 rounded-full">
              {status}
            </Text>
          </View>

          <View className="mt-10">
            <Text className="text-gray-100 text-base font-roboto mb-2">
              Amount Owed
            </Text>
            <Text className="text-white text-5xl font-roboto-bold">
              ${Number(amount).toFixed(2)}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-5">
            <View>
              <Text className="text-gray-100 text-base font-roboto">
                Original Creditor
              </Text>
              <Text className="text-gray-100 text-xl font-roboto-bold">
                Credit Card Co
              </Text>
            </View>
            <View>
              <Text className="text-gray-100 text-base font-roboto">
                Last Updated
              </Text>
              <Text className="text-gray-100 text-xl font-roboto-bold">
                Today
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View className="flex-row justify-between items-center mt-4">
          <Link href={{ pathname: "./[id]/chat", params: debt }} asChild>
            <TouchableOpacity className="flex-1 bg-[#4F46E5] py-3 rounded-lg shadow-xl items-center">
              <Text className="text-white text-lg font-roboto-bold">
                Message Agency
              </Text>
            </TouchableOpacity>
          </Link>

          <Text className="text-transparent">&nbsp;&nbsp;</Text>

          <Link href={{ pathname: "./[id]/payment", params: debt }} asChild>
            <TouchableOpacity className="flex-1 bg-[#10B981] py-3 rounded-lg shadow-xl items-center">
              <Text className="text-white text-lg font-roboto-bold">
                Payment
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View className="my-5">
          <PaymentTimeline />
        </View>

        <View className="">
          <Text className="text-2xl font-roboto-bold mb-4">Documents</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 12,
              paddingBottom: 30,
            }}
          >
            {[
              { label: "Agreement.pdf" },
              { label: "Statement.pdf" },
              { label: "Receipt.pdf" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="items-center border rounded-md "
                style={{
                  width: "30%",
                  paddingHorizontal: 4,
                  paddingVertical: 16,
                }}
              >
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color="#4F46E5"
                />
                <Text className="mt-2 text-sm text-center">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DebtDetailPage;
