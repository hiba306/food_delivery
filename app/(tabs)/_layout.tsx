import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ici tu vérifies la session
    setIsAuthenticated(false); // Simule: pas connecté
  }, []);

  useEffect(() => {
    if (isAuthenticated === true) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    return null; // écran vide le temps de vérifier la session
  }

  return <Slot />;
}
