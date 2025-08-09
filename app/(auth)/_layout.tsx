import { View, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { Slot, useRouter } from "expo-router";
import { images } from "@/constants";
import React, { useEffect, useState, useRef } from 'react';

export default function _Layout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Quand le composant se démonte
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Simuler vérification session (exemple asynchrone)
    async function checkAuth() {
      // await vérification ici...
      if (isMounted.current) {
        setIsAuthenticated(false); // ou true si connecté
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false && isMounted.current) {
      router.replace("/(auth)/SignIn");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return null; // écran de chargement vide
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
        <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25 }}>
          <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
          <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
        </View>
        <Slot/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
