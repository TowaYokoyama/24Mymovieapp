import { Stack } from "expo-router";
import './globals.css';
import { StatusBar } from "react-native";

export default function RootLayout() {
  return <Stack >

    <StatusBar hidden={true} />
    <StatusBar  />
    <Stack.Screen 
    name="(tabs)"
    options={{headerShown: false}}
    />
    <Stack.Screen 
    name="movie/[id]"
    options={{headerShown: false}}
    />

  </Stack>;
}
