import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import axiosApi from "../utils/axios/axiosApi";
import { showMessage } from "react-native-flash-message";

export default function Update({ route }) {
  const [isEditable, setIsEditable] = useState(false);
  const navigation = useNavigation();
  const noteItem = route.params.noteData;

  // handle update==================================
  const [title, setTitle] = useState(noteItem?.title);
  const [note, setNote] = useState(noteItem?.note);
  const [loading, setLoading] = useState(false);

  const checkHandler = async () => {
    setIsEditable(false);
    setLoading(true);
    const inputData = {
      title,
      note,
    };

    const result = await axiosApi.patch(
      `/editNote/${noteItem?._id}`,
      inputData
    );
    setLoading(false);

    if (result?.data?.status === "false") {
      showMessage({
        message: result?.data?.message,
        type: "danger",
        duration: 5000,
      });
    } else if (result?.data?.status === "true") {
      navigation.goBack();
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <TextInput
          color="black"
          editable={isEditable}
          style={styles.headerTitle}
          value={title.slice(0, 28)}
          onChangeText={(value) => setTitle(value)}
        />

        <TouchableOpacity
          disabled={loading}
          onPress={() => setIsEditable(!isEditable)}
        >
          <FontAwesome6
            name="edit"
            size={30}
            color={isEditable ? "blue" : "black"}
          />
        </TouchableOpacity>
      </View>
      {isEditable && (
        <View style={styles.iconZindex}>
          <TouchableOpacity onPress={checkHandler}>
            <FontAwesome5 name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ paddingTop: 10, paddingBottom: 50 }}>
            <TextInput
              color="black"
              editable={isEditable}
              multiline
              style={styles.noteText}
              value={note}
              onChangeText={(value) => setNote(value)}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
/*
 onPress={() => {
            navigation.goBack();
          }}
*/
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingVertical: 50,
    position: "relative",
  },
  iconZindex: {
    position: "absolute",
    zIndex: 10,
    top: "80%",
    backgroundColor: "purple",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    right: 20,
  },
  header: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    // backgroundColor: "red",
    marginBottom: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitleBox: {
    width: "80%",
    height: 50,
    backgroundColor: "purple",
  },
  headerTitle: {
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
    // backgroundColor: "gray",
    // overflow: "hidden",
  },
  body: {
    width: "100%",
    height: "100%",
    // backgroundColor: "orange",
  },
  noteText: {
    fontSize: 18,
    textAlign: "justify",
    paddingHorizontal: 15,
  },
});
