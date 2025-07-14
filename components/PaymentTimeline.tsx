import { Text, View } from "react-native";

const payments = [
  { id: 1, label: "Payment #1", date: "5/7/2025", amount: 291.67 },
  { id: 2, label: "Payment #2", date: "6/6/2025", amount: 291.67 },
  { id: 3, label: "Payment #3", date: "7/6/2025", amount: 291.67 },
];

export default function PaymentTimeline() {
  return (
    <View className="my-5">
      <Text className="text-2xl font-roboto-bold mb-4">Payment Timeline</Text>
      {payments.map((payment, index) => (
        <View key={payment.id} className="flex-row items-start ">
          <View
            className="items-center mr-4 "
            style={{ width: 40, minHeight: 50 }}
          >
            <View
              style={{ width: 10, height: 10 }}
              className=" rounded-full bg-[#4F46E5] pt-2"
            />
            {index !== payments.length && (
              <View
                className=""
                style={{
                  flex: 1,
                  height: 24,
                  width: 3,
                  backgroundColor: "#eaeaea",
                }}
              />
            )}
          </View>

          <View className="flex-1 border-b border-gray-200 pb-2 mt-2 ">
            <View className="flex-row justify-between items-center">
              <Text className="font-roboto-bold text-base">
                {payment.label}
              </Text>
              <Text className="text-green-500 font-roboto-bold text-base">
                +${payment.amount.toFixed(2)}
              </Text>
            </View>
            <Text className="text-gray-500 text-sm mt-0.5 font-roboto">
              {payment.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
