import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Check, RotateCcw } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PaymentFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));
  const [paymentData, setPaymentData] = useState({
    amount: "",
    paymentMethod: "full",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "John Doe",
    processingFee: 0.0,
    transactionId: "TX7SNLE2CAZ",
  });

  const { id, agency, amount, status } = useLocalSearchParams();
  const fullAmount = Number(amount);

  const router = useRouter();

  const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    if (!match) return number;

    const formatted = [match[1], match[2], match[3], match[4]]
      .filter(Boolean)
      .join(" ");
    return formatted;
  };

  const flipCard = () => {
    const toValue = isCardFlipped ? 0 : 180;
    setIsCardFlipped(!isCardFlipped);

    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const CreditCardComponent = () => {
    const frontInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"],
    });

    const backInterpolate = flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"],
    });

    const frontStyle = {
      transform: [{ rotateY: frontInterpolate }],
    };

    const backStyle = {
      transform: [{ rotateY: backInterpolate }],
    };

    return (
      <View className="h-52 mb-6 relative">
        {/* Front of Card */}
        <Animated.View
          style={[
            frontStyle,
            {
              position: "absolute",
              width: "100%",
              backfaceVisibility: "hidden",
            },
          ]}
        >
          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            className="w-full h-52 p-5 justify-between shadow-lg"
            style={{ borderRadius: 8 }}
          >
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold">VISA</Text>
              <TouchableOpacity onPress={flipCard}>
                <RotateCcw size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View className="my-5">
              <Text className="text-white text-xl tracking-wider font-mono">
                {paymentData.cardNumber
                  ? formatCardNumber(paymentData.cardNumber)
                  : "•••• •••• •••• ••••"}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <View>
                <Text className="text-white/70 text-xs mb-1">Card Holder</Text>
                <Text className="text-white text-base font-medium">
                  {paymentData.cardHolder}
                </Text>
              </View>
              <View>
                <Text className="text-white/70 text-xs mb-1">Expires</Text>
                <Text className="text-white text-base font-medium">
                  {paymentData.expiryDate || "MM/YY"}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Back of Card */}
        <Animated.View
          style={[
            backStyle,
            {
              position: "absolute",
              width: "100%",
              backfaceVisibility: "hidden",
            },
          ]}
        >
          <LinearGradient
            colors={["#3730A3", "#4F46E5"]}
            className="w-full h-52 rounded-2xl p-5 justify-between shadow-lg"
          >
            <View className="h-10 bg-black w-full mt-5" />

            <View className="bg-white w-4/5 p-3 rounded flex-row justify-between mt-5">
              <Text className="text-black text-sm">CVV</Text>
              <Text className="text-black font-bold tracking-wider">
                {paymentData.cvv || "•••"}
              </Text>
            </View>

            <View className="items-end">
              <TouchableOpacity onPress={flipCard}>
                <RotateCcw size={20} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    );
  };

  const StepIndicator = ({ step, label, isCompleted, isActive }) => (
    <View className="items-center flex-1">
      <View
        className={`w-8 h-8 rounded-full items-center justify-center ${
          isCompleted ? "bg-blue-500" : isActive ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        {isCompleted ? (
          <Check size={16} color="white" />
        ) : (
          <Text
            className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-600"}`}
          >
            {step}
          </Text>
        )}
      </View>
      <Text
        className={`text-xs mt-1 ${isActive ? "text-blue-500" : "text-gray-500"}`}
      >
        {label}
      </Text>
    </View>
  );

  const renderStepIndicator = () => (
    <View className="flex-row items-center px-6 py-4 bg-white">
      <StepIndicator
        step={1}
        label="Amount"
        isCompleted={currentStep > 1}
        isActive={currentStep === 1}
      />
      <View
        className={`flex-1 h-0.5 mx-2 ${currentStep > 1 ? "bg-blue-500" : "bg-gray-300"}`}
      />
      <StepIndicator
        step={2}
        label="Payment"
        isCompleted={currentStep > 2}
        isActive={currentStep === 2}
      />
      <View
        className={`flex-1 h-0.5 mx-2 ${currentStep > 2 ? "bg-blue-500" : "bg-gray-300"}`}
      />
      <StepIndicator
        step={3}
        label="Confirm"
        isCompleted={currentStep > 3}
        isActive={currentStep === 3}
      />
    </View>
  );

  const renderAmountStep = () => (
    <View className="flex-1 px-6 py-6">
      <Text className="text-2xl font-bold text-gray-800 mb-8">
        Select Payment Amount
      </Text>

      <TouchableOpacity
        className={`p-4 rounded-lg border-2 mb-4 ${
          paymentData.paymentMethod === "full"
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200"
        }`}
        onPress={() =>
          setPaymentData({
            ...paymentData,
            paymentMethod: "full",
            amount: fullAmount.toString(),
          })
        }
      >
        <Text className="text-gray-600 text-sm">Pay Full Amount</Text>
        <Text className="text-2xl font-bold text-gray-800">
          ${fullAmount.toFixed(2)}
        </Text>
      </TouchableOpacity>

      <View
        className={`p-4 rounded-lg border-2 ${
          paymentData.paymentMethod === "custom"
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200"
        }`}
      >
        <Text className="text-blue-500 font-semibold mb-3">Custom Amount</Text>
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-gray-800 mr-2">$</Text>
          <TextInput
            className="flex-1 text-2xl font-bold text-gray-800"
            placeholder="0"
            value={paymentData.amount}
            onChangeText={(text) =>
              setPaymentData({
                ...paymentData,
                amount: text,
                paymentMethod: "custom",
              })
            }
            keyboardType="numeric"
            onFocus={() =>
              setPaymentData({ ...paymentData, paymentMethod: "custom" })
            }
          />
        </View>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-4 rounded-lg mt-8"
        onPress={() => {
          if (paymentData.amount && parseFloat(paymentData.amount) > 0) {
            setCurrentStep(2);
          } else {
            Alert.alert("Error", "Please enter a valid amount");
          }
        }}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPaymentStep = () => (
    <View className="flex-1 px-6 py-6">
      <Text className="text-2xl font-bold text-gray-800 mb-8">
        Payment Method
      </Text>

      <CreditCardComponent />

      <View className="space-y-4">
        <View>
          <Text className="text-gray-600 mb-2">Card Number</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChangeText={(text) => {
              const cleaned = text.replace(/\D/g, "");
              if (cleaned.length <= 16) {
                setPaymentData({ ...paymentData, cardNumber: cleaned });
              }
            }}
            keyboardType="numeric"
            maxLength={19}
          />
        </View>

        <View className="flex-row space-x-4 mt-4">
          <View className="flex-1 mr-2">
            <Text className="text-gray-600 mb-2">Expiry Date</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChangeText={(text) => {
                let formatted = text.replace(/\D/g, "");
                if (formatted.length >= 2) {
                  formatted =
                    formatted.substring(0, 2) + "/" + formatted.substring(2, 4);
                }
                setPaymentData({ ...paymentData, expiryDate: formatted });
              }}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View className="flex-1 ml-2 ">
            <Text className="text-gray-600 mb-2">CVV</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 text-base"
              placeholder="123"
              value={paymentData.cvv}
              onChangeText={(text) => {
                if (text.length <= 3) {
                  setPaymentData({ ...paymentData, cvv: text });
                }
              }}
              keyboardType="numeric"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-4 rounded-lg mt-8"
        onPress={() => {
          if (
            paymentData.cardNumber.length >= 13 &&
            paymentData.expiryDate.length === 5 &&
            paymentData.cvv.length >= 3
          ) {
            setCurrentStep(3);
          } else {
            Alert.alert("Error", "Please fill in all card details correctly");
          }
        }}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderConfirmStep = () => (
    <View className="flex-1 px-6 py-6">
      <Text className="text-2xl font-bold text-gray-800 mb-8">
        Confirm Payment
      </Text>

      <View className="space-y-4">
        <View className="flex-row justify-between py-3">
          <Text className="text-gray-600">Payment Amount:</Text>
          <Text className="font-semibold text-lg">
            ${parseFloat(paymentData.amount).toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between py-3">
          <Text className="text-gray-600">Payment Method:</Text>
          <Text className="font-semibold">
            Visa ending in {paymentData.cardNumber.slice(-4) || "0038"}
          </Text>
        </View>

        <View className="flex-row justify-between py-3">
          <Text className="text-gray-600">Processing Fee:</Text>
          <Text className="font-semibold">
            ${paymentData.processingFee.toFixed(2)}
          </Text>
        </View>

        <View className="border-t border-gray-300 pt-3">
          <View className="flex-row justify-between py-3">
            <Text className="text-xl font-bold">Total:</Text>
            <Text className="text-xl font-bold">
              ${parseFloat(paymentData.amount).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="bg-green-500 py-4 rounded-lg mt-8"
        onPress={() => setCurrentStep(4)}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Confirm Payment
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderSuccessStep = () => (
    <View className="flex-1 px-6 py-6 items-center justify-center">
      <View className="bg-green-500 w-20 h-20 rounded-full items-center justify-center mb-6">
        <Check size={40} color="white" />
      </View>

      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Payment Successful!
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Your payment of ${parseFloat(paymentData.amount).toFixed(2)} has been
        processed successfully.
      </Text>

      <View className="w-full space-y-3 mb-8">
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Transaction ID:</Text>
          <Text className="font-semibold">{paymentData.transactionId}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Date:</Text>
          <Text className="font-semibold">7/6/2025</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Payment Method:</Text>
          <Text className="font-semibold">
            Visa ending in {paymentData.cardNumber.slice(-4) || "0038"}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-blue-500 py-4 rounded-lg w-full"
        onPress={() => {
          // Reset to initial state or navigate back
          setCurrentStep(1);
          setPaymentData({
            amount: "",
            paymentMethod: "full",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardHolder: "John Doe",
            processingFee: 0.0,
            transactionId: "TX7SNLE2CAZ",
          });

          router.push("/");
        }}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderAmountStep();
      case 2:
        return renderPaymentStep();
      case 3:
        return renderConfirmStep();
      case 4:
        return renderSuccessStep();
      default:
        return renderAmountStep();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {currentStep < 4 && renderStepIndicator()}

      {renderCurrentStep()}
    </SafeAreaView>
  );
};

export default PaymentFlow;
