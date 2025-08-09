import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, TextInput } from "react-native";
import { useRoute } from "@react-navigation/native";
import CustomButton from "@/components/CustomButton";
import { supabase } from "@/lib/supabaseClient";
import { router } from "expo-router";

export default function OTP() {
  const route = useRoute<any>();
  const phone: string | undefined = route.params?.phone;

  const [code, setCode] = useState(["", "", "", "","",""]);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (!phone) {
      Alert.alert("Error", "Missing phone number. Please sign in again.");
      router.replace("/(auth)/SignIn");
    }
  }, [phone]);

  const handleChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const verifyOtp = async () => {
    const otpCode = code.join("");
    if (otpCode.length < 4) {
      return Alert.alert("Error", "Please enter the complete OTP code.");
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone:phone!,
        token: otpCode,
        type: "sms",
      });
      if (error) throw error;

      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Invalid code.");
      console.log("verifyOtp error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone,
        options: { channel: "sms" },
      });
      if (error) throw error;
      Alert.alert("Success", "OTP resent.");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to resend OTP.");
      console.log("resendOtp error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-6 bg-white px-6 justify-center">
      {/* Title */}
      <Text className="text-2xl font-bold text-center mt-10ç text-gray-800">
        OTP Verification
      </Text>
      <Text className="text-center text-gray-500 mb-8">
        Enter the code sent via SMS to{" "}
        <Text className="font-semibold text-gray-700">{phone}</Text>
      </Text>

      {/* OTP Inputs */}
      <View className="flex-row justify-center gap-4 mb-8">
        {code.map((digit, index) => (
          <TextInput
            key={index}
           ref={(ref) => {
  inputsRef.current[index] = ref;
}}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            keyboardType="numeric"
            maxLength={1}
            className="border border-gray-300 rounded-lg text-center text-xl w-14 h-14"
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Verify Button */}
      <View className="mb-4">
        <CustomButton title="Verify" isLoading={loading} onPress={verifyOtp} />
      </View>

      {/* Resend OTP Button */}
      <View className="mb-6">
        <CustomButton title="Resend OTP" onPress={resendOtp} />
      </View>

      {/* Note */}
      <Text className="text-xs text-gray-400 text-center">
        The code is valid for a few minutes.
      </Text>
    </View>
  );
}
