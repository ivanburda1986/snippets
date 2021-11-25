import firebase from "firebase";

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
