import React from "react";
import { TextInput, View } from "react-native";

const styles = {
  container: {
    paddingBottom: 20,
  },
  name: {
    paddingBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
  },
};

const InputCommon = ({ name, value, getValue }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => getValue(text.replace(/\s/g, ""))}
        value={value}
        placeholder={name}
      />
    </View>
  );
};

export default InputCommon;
