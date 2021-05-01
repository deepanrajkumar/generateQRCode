import React from "react";
import { Text, TextInput, View } from "react-native";

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
  label: { fontWeight: "bold", marginBottom: 10, color: "maroon" },
};

const InputCommon = ({ name, value, getValue, keyboardType, label }) => {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label || name}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={(text) => getValue(text.replace(/\s/g, ""))}
        value={value}
        placeholder={label ? "" : name}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
};

export default InputCommon;
