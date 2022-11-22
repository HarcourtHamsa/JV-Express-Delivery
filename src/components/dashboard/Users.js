import React from "react";
import { Box } from "@chakra-ui/react";
import { firestore } from "../../firebase";
import UserCard from "./UserCard";

function Users() {
  const [users, setUsers] = React.useState([]);

  // get all documents in a collection from firestore
  const getUsersFromDB = () => {
    const usersRef = firestore
      .collection("users")
      .get()
      .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));
    return usersRef;
  };

  // componentDidMount
  React.useEffect(() => {
    getUsersFromDB()
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  }, []);

  const getDocIdFromTrackingID = (id) => {
    var userRef = firestore
      .collection("users")
      .where("trackingId", "==", id)
      .get();

    return userRef;
  };

  const filterUsersByID = (id) => {
    var filteredList = users.filter((user) => user.trackingId !== id);
    setUsers(filteredList);
  };

  // deleteUserHandler takes in ANY uniqe data.
  const deleteUserByID = (id) => {
    getDocIdFromTrackingID(id).then((res) =>
      res.forEach((querySnapshot) => {
        firestore
          .collection("users")
          .doc(querySnapshot.id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .then(() => filterUsersByID(id))
          .catch((error) => {
            console.error("Error removing document: ", error);
          })
          .catch((err) => console.log("ERROR", err));
      })
    );
  };
  return (
    <Box>
      {console.log(users)}
      {users?.map((v) => (
        <div key={v._id}>
          <UserCard
            id={v.trackingId}
            name={v.to}
            email={v.receiverEmail}
            onDelete={deleteUserByID}
          />
        </div>
      ))}
    </Box>
  );
}

export default Users;
