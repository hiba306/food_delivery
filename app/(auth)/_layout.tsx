import {View, Text, KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import {Redirect, Slot} from "expo-router";
import {images} from "@/constants";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function _Layout() {
    

    return (
       <SafeAreaView>
        <Text>Auth </Text>
        <Slot />
       </SafeAreaView>
    )
}