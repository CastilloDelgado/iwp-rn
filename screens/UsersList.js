import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import { db } from "../database/firebase";
import { collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { ListItem, Avatar } from "react-native-elements";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setUsers(docs);
    });
  }, []);

  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => props.navigation.navigate("CreateUser")}
      />
      {users.map((user) => (
        <ListItem
          key={user.id}
          bottomDivider
          onPress={() => {
            props.navigation.navigate("UserDetail", {
              userId: user.id,
            });
          }}
        >
          <ListItem.Chevron />
          <Avatar
            source={{
              uri: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg",
            }}
            rounded
          />
          <ListItem.Content>
            <ListItem.Title>{user.username}</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default UsersList;
