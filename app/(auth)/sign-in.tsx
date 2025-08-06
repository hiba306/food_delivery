import {View, Text,Button, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { router } from 'expo-router'


const SignIn =() => {
    return (

        <View>

            <Text>hello</Text>
            <Button title= "Continue"  onPress={() => router.push("/(auth)/code-verification")} />
        </View>
    

    )
}
export default SignIn