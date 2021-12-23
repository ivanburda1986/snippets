import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

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
export async function addServerItem(newItem, cbSuccess, cbError) {
  const response = await firebase
    .database()
    .ref("snippets/" + newItem.id)
    .set(newItem, (error) => {
      if (error) {
        cbError();
      } else {
        cbSuccess();
      }
    });
  return response;
}

// Update a server item
export async function updateServerItem(updatedItem, cbSuccess, cbError) {
  const response = await firebase
    .database()
    .ref(`/snippets/${updatedItem.id}`)
    .update(updatedItem, (error) => {
      if (error) {
        cbError();
        return "nok";
      } else {
        cbSuccess();
        return "ok";
      }
    });
  return response;
}

// Delete a server item
export async function deleteServerItem({ itemId, cbDeleteSuccess }) {
  const response = await firebase.database().ref(`/snippets/${itemId}`).remove();
  cbDeleteSuccess();
  return response;
}
