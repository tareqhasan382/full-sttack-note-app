import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useTheme } from "@react-navigation/native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { showMessage } from "react-native-flash-message";
import axiosApi from "../utils/axios/axiosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../theme/AppContext";
import axios from "axios";

export default function Signin({ navigation }) {
  const { setUser } = useContext(AppContext);
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      const userData = {
        email,
        password,
      };
      // console.log("login:", userData);
      const result = await axiosApi.post("/login", userData);
      // console.log("login result:", result?.data?.token);
      if (result?.data?.status === "false") {
        showMessage({
          message: result?.data?.message,
          type: "danger",
          duration: 5000,
        });
      } else if (result?.data?.status === "true") {
        await AsyncStorage.setItem("token", result?.data?.token);
        await AsyncStorage.setItem("isLogIn", "true");
        setUser(true);
        navigation.navigate("Home");
        showMessage({
          message: result?.data?.message,
          type: "success",
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
    <View style={[styles.container, {}]}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/014/219/604/original/safety-login-page-3d-illustration-free-png.png",
          }}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.title, { color: colors.text }]}>
        Never forget your notes
      </Text>
      <View style={styles.textInputContainer}>
        <InputField
          onChangeText={(value) => setEmail(value)}
          placeholder="Email address"
        />
        <InputField
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
          placeholder="Password"
        />

        <Button onPress={signIn} title="Login" />
      </View>
      <View style={styles.buttomText}>
        <Text style={[styles.text, { color: colors.text }]}>
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("Signup");
            }}
            style={[styles.text, { color: "blue" }]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 80,
    // justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginTop: 20,
  },
  imgContainer: {
    width: "90%",
    height: "40%",
    // backgroundColor: "white",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  textInputContainer: {
    marginTop: 20,
    width: "90%",
    flexDirection: "column",
    gap: 5,
  },
  buttomText: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
    width: "85%",
    gap: 5,
  },
  text: {
    fontSize: 18,
  },
});
