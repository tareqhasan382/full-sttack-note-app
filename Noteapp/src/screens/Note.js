import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../theme/AppContext";
import RoundIconBtn from "../components/RoundIconBtn";
import axiosApi from "../utils/axios/axiosApi";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

export default function Note({ navigation }) {
  const { notesData, setNotesData } = useContext(AppContext);
  const getData = async () => {
    const result = await axiosApi.get("/notes");
    if (result.data.data) {
      setNotesData(result.data.data);
    }
  };
  getData();

  const deleteHandler = async (item) => {
    //deleteNote/:noteId",
    const deleteData = async () => {
      const result = await axiosApi.delete(`/deleteNote/${item}`);
      // console.log("deleteData:", result.data);
      if (result.data.status === "true") {
        showMessage({
          message: result?.data?.message,
          type: "success",
          duration: 5000,
        });
      } else {
        showMessage({
          message: result?.data?.message,
          type: "warning",
          duration: 5000,
        });
      }
    };
    deleteData();
  };

  // useEffect(() => {
  //   getData();
  // }, []);
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
        <Text style={styles.title}>All notes</Text>
      </View>
      <View style={styles.iconBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create");
          }}
        >
          <RoundIconBtn iconName={"add"} size={40} color={"white"} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.body}>
          {notesData?.length >= 1 ? (
            <>
              <View style={styles.noteBody}>
                {notesData.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                      navigation.navigate("Update", { noteData: item });
                    }}
                  >
                    <View style={styles.deleteBox}>
                      <TouchableOpacity
                        onPress={() => deleteHandler(item?._id)}
                      >
                        <AntDesign
                          style={styles.deleteIcon}
                          name="delete"
                          size={24}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.noteBox}>
                      <Text style={styles.noteTitle}>
                        {item?.title && item.title.slice(0, 35)}
                      </Text>
                      <Text style={styles.note}>
                        {item?.note &&
                          item.note.split(" ").slice(0, 3).join(" ")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <>
              <Text style={styles.bodyTitle}>Add Notes</Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingTop: 40,
    position: "relative",
    // paddingBottom: 2,
  },
  header: {
    height: 60,
    width: "100%",
    paddingHorizontal: 10,
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconBox: {
    position: "absolute",
    zIndex: 10,
    top: "90%",
    backgroundColor: "purple",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    right: 20,
  },
  addIcon: {
    // position: "absolute",
    // backgroundColor: "#800080",
    // width: 50,
    // height: 50,
    // alignItems: "center",
    // justifyContent: "center",
    // borderRadius: 100,
    // alignSelf: "flex-end",
    // right: 20,
    // top: "80%",
  },
  title: {
    color: "black",
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  body: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 10,
    marginBottom: 30,
  },
  bodyTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "gray",
  },

  noteBody: {
    width: "95%",
    height: "100%",
    backgroundColor: "white",
    gap: 10,
    position: "relative",
  },
  deleteBox: {
    position: "absolute",
    zIndex: 10,
    top: 14,
    right: 10,
  },
  deleteIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  noteBox: {
    width: "100%",
    height: 80,
    backgroundColor: "orange",
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  note: {
    fontSize: 20,
  },
});

//<Text style={styles.note}>{item?.note && item.note.split(' ').slice(0, 10).join(' ')}</Text>
