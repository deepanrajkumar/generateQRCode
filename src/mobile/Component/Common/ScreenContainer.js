import React from "react";
import { View } from "react-native";

const styles = {
  container: {
    padding: 20,
    flex: 1,
  },
};

const ScreenContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default ScreenContainer;
