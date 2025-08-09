import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { supabase } from "@/lib/supabaseClient";

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!phone || phone.length < 8) {
      return Alert.alert(
        "Error",
        "Please enter a valid phone number (8 digits)."
      );
    }

    setLoading(true);
    const fullNumber = phone.startsWith("+") ? phone : `+216${phone}`;

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullNumber,
        options: { channel: "sms" },
      });
      if (error) throw error;

      Alert.alert("Success", "OTP sent.");
      router.push({
        pathname: "/(auth)/OTP",
        params: { phone: fullNumber },
      });
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      {/* Title */}
      <Text className="text-3xl font-bold text-center mt-10 text-gray-800">
        Sign In
      </Text>
      <Text className="text-center text-gray-500 mb-8">
        Enter your phone number to receive an OTP code
      </Text>

      {/* Input */}
      <CustomInput
        placeholder="Phone number (8 digits)"
        value={phone}
        onChangeText={setPhone}
        label="Phone"
        keyboardType="phone-pad"
      />

      {/* Button */}
      <View className="mt-6">
        <CustomButton
          title="Send OTP"
          isLoading={loading}
          onPress={handleSendOtp}
        />
      </View>
    </View>
  );
}
