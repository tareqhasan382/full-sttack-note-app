import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axiosApi from "../utils/axios/axiosApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../theme/AppContext";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const { setUser, userData, setUserData } = useContext(AppContext);
  // const [userData, setUserData] = useState(null);
  // const [toggleMenu, setToggleMenu] = useState(false);
  // console.log("toggleMenu:", toggleMenu);
  const getData = async () => {
    const result = await axiosApi.get("/userProfile");
    if (result.data.data) {
      setUserData(result.data.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const logOut = async () => {
    // console.log("logout");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("isLogIn");
    setUser(false);
    navigation.navigate("Signin");
  };
  // onPress={logOut}
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Note");
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            All notes
          </Text>
          {/* <Entypo name="menu" size={24} color="white" /> */}
        </TouchableOpacity>

        <TouchableOpacity>
          <FontAwesome5 name="user-edit" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: "https://evan-cse.github.io/Covid-19/img/social-distance.png",
            }}
            style={{
              width: 180,
              height: 180,
            }}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            marginVertical: 5,
          }}
        >
          {userData?.name}
        </Text>
        <View style={styles.profileContainer}>
          <View style={styles.textBox}>
            <Text style={styles.title}>Email </Text>
            <Text style={styles.text}>{userData?.email} </Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.title}>Age</Text>
            <Text style={styles.text}>{userData?.age} </Text>
          </View>
          <View style={styles.textBox}>
            <Text style={styles.title}>Gender </Text>
            <Text style={styles.text}>{userData?.gender} </Text>
          </View>
        </View>
        <TouchableOpacity onPress={logOut}>
          <Text style={[styles.btn, { color: "white" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // paddingVertical: 45,
    alignItems: "center",
    position: "relative",
  },
  header: {
    // paddingVertical: 20,
    // alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    height: 200,
    width: "100%",
    backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bodyContainer: {
    position: "absolute",
    marginTop: 100,
    width: "100%",
    alignItems: "center",
  },
  imgContainer: {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 15,
    borderColor: "black",
  },
  profileContainer: {
    width: "80%",
  },
  textBox: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 5,
  },
  btn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "blue",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 20,
    marginVertical: 10,
  },
});
