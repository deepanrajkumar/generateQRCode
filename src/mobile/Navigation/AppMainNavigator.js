import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GenerateUpi from "../Component/GenerateUpi";
import GenerateBQR from "../Component/GenerateBHQR";

const Tab = createBottomTabNavigator();

const AppMainNavigator = () => {
  return (
    <Tab.Navigator
      lazy
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      <Tab.Screen name="GenerateUpi" component={GenerateUpi} />
      <Tab.Screen name="GenerateBQR" component={GenerateBQR} />
    </Tab.Navigator>
  );
};

export default AppMainNavigator;
