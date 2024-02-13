import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ title, onPress }) {
  return (
    <View>
      <TouchableOpacity>
        <Text onPress={onPress} style={[styles.btn, { color: "white" }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "blue",
    textAlign: "center",
    marginTop: 20,
    paddingVertical: 8,
    borderRadius: 50,
  },
});
