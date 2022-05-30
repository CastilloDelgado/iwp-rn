import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { db } from "../database/firebase";
import { doc, getDoc, setDoc, collection, deleteDoc } from "firebase/firestore";

const UserDetail = (props) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const userRef = doc(db, "users", props.route.params.userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUser(userSnap.data());
      setLoading(false);
    }
  }, []);

  const handleInputChange = (input, value) => {
    setUser({
      ...user,
      [input]: value,
    });
  };

  const updateUser = async () => {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, props.route.params.userId), user);
    alert("User Updated!");
  };

  const deleteUser = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "users", id));
    alert("User deleted!");
    props.navigation.navigate("UsersList");
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Username"
          value={user.username}
          onChangeText={(value) => handleInputChange("username", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.email}
          placeholder="Email"
          onChangeText={(value) => handleInputChange("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          value={user.phone}
          placeholder="Phone"
          onChangeText={(value) => handleInputChange("phone", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Update User" onPress={updateUser} />
      </View>
      <View style={styles.inputGroup}>
        <Button
          color="#FF0000"
          title="Delete User"
          onPress={() => deleteUser(props.route.params.userId)}
        />
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

export default UserDetail;
