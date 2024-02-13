import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import Button from "../components/Button";
import InputField from "../components/InputField";
import axios from "axios";
import axiosApi from "../utils/axios/axiosApi";
const genderOptions = ["Male", "Female"];
export default function Signup({ navigation }) {
  const { colors } = useTheme();
  //manage input fields state
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    const userData = {
      name,
      email,
      password,
      gender,
      age: parseInt(age),
    };

    const result = await axiosApi.post("/signup", userData);
    if (result?.data?.status === "false") {
      window.alert(result?.data?.message);
    }
    if (result?.data?.status === "true") {
      navigation.navigate("Signin");
      window.alert("user created successfully!");
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: "https://edit.ink/assetsd/img/img15.png",
            }}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>
          Create an Account
        </Text>
        <View style={styles.textInputContainer}>
          <InputField
            placeholder="Full name"
            onChangeText={(value) => setName(value)}
          />
          <InputField
            placeholder="Email address"
            onChangeText={(value) => setEmail(value)}
          />
          <InputField
            secureTextEntry
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
          />
          <InputField
            placeholder="Age"
            onChangeText={(value) => setAge(value)}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontSize: 18, marginRight: 5 }}>
              Gender:
            </Text>
            {genderOptions.map((option) => {
              const selected = option === gender;
              return (
                <Pressable
                  onPress={() => setGender(option)}
                  key={option}
                  style={styles.radionContainer}
                >
                  <View
                    style={[
                      styles.outerCircle,
                      selected && styles.selectedOuterCircle,
                    ]}
                  >
                    <View
                      style={[
                        styles.innerCircle,
                        selected && styles.selectedInnerCircle,
                      ]}
                    ></View>
                  </View>
                  <Text style={[styles.radioText, { color: colors.text }]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Button title="Submit" onPress={signUp} />
        </View>
        <View style={styles.buttomText}>
          <Text style={[styles.text, { color: colors.text }]}>
            Have an account?
          </Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate("Signin");
              }}
              style={[styles.text, { color: "blue" }]}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 80,
    // justifyContent: "center",
    flexDirection: "column",

    marginBottom: 220,
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
  radionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "30%",
    height: 40,
    // backgroundColor: "gray",
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#cfcfcf",
    alignItems: "center",
    justifyContent: "center",
    // position: "relative",
  },
  selectedOuterCircle: {
    // borderWidth: 2,
    borderColor: "blue",
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 50,
    // borderWidth: 2,
    // borderColor: "red",
    backgroundColor: "#cfcfcf",
  },
  selectedInnerCircle: {
    backgroundColor: "blue",
  },
  radioText: {
    fontSize: 18,
  },
});
