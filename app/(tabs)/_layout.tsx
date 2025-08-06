import {Redirect, Slot, Tabs} from "expo-router";
import {TabBarIconProps} from "@/type";
import {Image, Text, View} from "react-native";
import {images} from "@/constants";
import cn from "clsx";


export default function TabLayout() {
   const  isAuthenticated  = false;

     if(!isAuthenticated) return <Redirect href="/sign-in" />

    return <Slot/>
}