import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

export default function InputField({
  placeholder,
  secureTextEntry,
  onChangeText,
}) {
  const { colors } = useTheme();
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={[styles.input, { color: colors.text }]}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoFocus
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 48,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 5,
    textDecorationColor: "red",
  },
});
