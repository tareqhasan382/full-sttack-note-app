import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import Create from "./src/screens/Create";
import Update from "./src/screens/Update";
import Delete from "./src/screens/Delete";
import React, { useMemo, useState, useEffect } from "react";
import DarkTheme from "./src/theme/DarkTheme";
import LightTheme from "./src/theme/LightTheme";
import { AppContext } from "./src/theme/AppContext";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Note from "./src/screens/Note";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [notesData, setNotesData] = useState(null);

  const Stack = createNativeStackNavigator();
  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme,
      user,
      setUser,
      userData,
      setUserData,
      notesData,
      setNotesData,
    };
  });

  useEffect(() => {
    async function getData() {
      const isLoggedIn = await AsyncStorage.getItem("isLogIn");
      if (isLoggedIn === "true") {
        setUser(true);
      }
    }
    getData();
  }, [user]);

  // console.log("token:", AsyncStorage.getItem("token"));
  // console.log("isLogIn:", AsyncStorage.getItem("isLogIn"));

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : LightTheme}>
      <AppContext.Provider value={appContext}>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{ headerShown: false }}
        >
          {user ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Note" component={Note} />
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="Update" component={Update} />
              <Stack.Screen name="Delete" component={Delete} />
            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          )}
        </Stack.Navigator>
      </AppContext.Provider>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
// <Stack.Screen name="Home" component={HomeScreen} />
