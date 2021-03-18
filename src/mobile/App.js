import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppMainNavigator from "./Navigation/AppMainNavigator";

const App = () => (
  <NavigationContainer>
    <AppMainNavigator />
  </NavigationContainer>
);

export default App;
