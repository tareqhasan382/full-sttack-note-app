import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function RoundIconBtn({ iconName, size, color }) {
  return (
    <Ionicons
      name={iconName || "add-circle-outline"}
      size={size || 30}
      color={color || "white"}
    />
  );
}

/*
 onPress={() => {
          navigation.navigate("Note");
        }}
*/
