import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import GenerateUpi from "../Component/GenerateUpi";

const Tab = createBottomTabNavigator();

const AppMainNavigator = () => {
  const HomeScreen = () => (
    <View>
      <Text>Test Home</Text>
    </View>
  );

  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      <Tab.Screen name="Home" component={GenerateUpi} />
      <Tab.Screen name="GenerateUpi" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default AppMainNavigator;
