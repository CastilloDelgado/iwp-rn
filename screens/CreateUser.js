import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import { db } from "../database/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const CreateUser = (props) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (input, value) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  const createNewUser = async () => {
    if (form.username === "" || form.email === "" || form.phone === "") {
      alert("Provide full info");
    } else {
      try {
        const userRef = collection(db, "users");
        await setDoc(doc(userRef), form);
        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => handleInputChange("username", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleInputChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleInputChange("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save User" onPress={createNewUser} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },

  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomColor: "#cccccc",
  },
});

export default CreateUser;
