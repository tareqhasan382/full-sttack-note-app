import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { AntDesign } from "@expo/vector-icons";
import axiosApi from "../utils/axios/axiosApi";
import { showMessage } from "react-native-flash-message";

export default function Create({ navigation }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const addNoteHandler = async () => {
    setLoading(true);
    try {
      const userData = {
        title,
        note,
      };
      const result = await axiosApi.post("/addNote", userData);
      setLoading(false);
      if (result?.data?.status === "false") {
        showMessage({
          message: result?.data?.message,
          type: "danger",
          duration: 5000,
        });
      } else if (result?.data?.status === "true") {
        navigation.navigate("Note");
        showMessage({
          message: result?.data?.message,
          type: "success",
          duration: 5000,
        });
      } else {
        showMessage({
          message: "Unexpected response from server",
          type: "danger",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error occurred during sign-in:", error);
      showMessage({
        message: "An unexpected error occurred",
        type: "danger",
        duration: 5000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          // width: "100%",
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "center",
          gap: 10,
          position: "absolute",
          top: "60%",
          right: 20,
        }}
      >
        <TouchableOpacity
          disabled={loading}
          onPress={addNoteHandler}
          style={styles.addIcon}
        >
          <AntDesign name="check" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            navigation.navigate("Note");
          }}
          style={[styles.addIcon]}
        >
          <AntDesign name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <InputField
        onChangeText={(value) => setTitle(value)}
        placeholder="Title"
      />
      <TextInput
        multiline
        onChangeText={(value) => setNote(value)}
        placeholder="Note"
        style={{ paddingVertical: 10 }}
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 50,
    position: "relative",
  },
  addIcon: {
    backgroundColor: "#800080",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
});
