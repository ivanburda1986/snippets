import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import database from "./firebase";
import { newSnippet } from "../config/config";

//Receive server items
export async function receiveServerItems() {
  const response = await firebase
    .database()
    .ref("/snippets")
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

//Add a server item
export async function addServerItem(newItem) {
  const response = await firebase
    .database()
    .ref("snippets/" + newItem.id)
    .set(newItem, (error) => {
      if (error) {
        console.log("Saving a new item to the server has failed");
      } else {
        console.log("A new item has been saved to the server successfully");
      }
    });
  return response;
}

// Update a server item
export async function updateServerItem(updatedItem) {
  const response = await firebase
    .database()
    .ref(`/snippets/${updatedItem.id}`)
    .update(updatedItem, (error) => {
      if (error) {
        console.log("Updating the items on the server has failed");
        return "ok";
      } else {
        console.log("The item has been updated on the server successfully");
        return "nok";
      }
    });
  return response;
}

// Delete a server item
export async function deleteServerItem(itemId) {
  const response = await firebase.database().ref(`/snippets/${itemId}`).remove();
  return response;
}
