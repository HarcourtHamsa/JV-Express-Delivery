import React from "react";
import {
  Flex,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Text,
  Divider,
  Box,
} from "@chakra-ui/react";
import { firestore } from "../../firebase";
import { useParams, useHistory } from "react-router-dom";
import CustomModal from "./CustomModal";
import FloatingBtn from "./FloatingBtn";

function EditUserForm() {
  const { id } = useParams();
  const history = useHistory();

  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = React.useState({});
  const [docID, setDocID] = React.useState("");
  const [apiState, setApiState] = React.useState({
    isLoading: false,
    isError: false,
    isSuccessful: false,
  });
  const [cst, fns] = React.useState({
    ...currentUser,
  });

  React.useEffect(() => {
    getSingleUserFromDB().catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const getSingleUserFromDB = () => {
    var userRef = firestore
      .collection("users")
      .where("trackingId", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setDocID(doc.id);
          fns(doc.data());
        });
      });

    return userRef;
  };

  const handleFrom = (e) => {
    fns((s) => ({ ...s, from: e.target.value }));
  };

  const handleTo = (e) => {
    fns((s) => ({ ...s, to: e.target.value }));
  };

  const handleEmail = (e) => {
    fns((s) => ({ ...s, receiverEmail: e.target.value }));
  };

  const handleStatus = (e) => {
    fns((s) => ({ ...s, status: e.target.value }));
  };

  const handleLocation = (e) => {
    fns((s) => ({ ...s, currentLocation: e.target.value }));
  };

  const handleQuantity = (e) => {
    fns((s) => ({ ...s, quantity: e.target.value }));
  };

  const handleWeight = (e) => {
    fns((s) => ({ ...s, weight: e.target.value }));
  };

  const handleServiceType = (e) => {
    fns((s) => ({ ...s, serviceType: e.target.value }));
  };

  const handleDescription = (e) => {
    fns((s) => ({ ...s, description: e.target.value }));
  };

  const setData = async () => {
    var result = new Promise((resolve, reject) => {
      resolve(
        firestore.collection("users").doc(docID).set({
          from: cst.from,
          to: cst.to,
          currentLocation: cst.currentLocation,
          status: cst.status,
          trackingId: cst.trackingId,
          receiverEmail: cst.receiverEmail,
          quantity: cst.quantity,
          weight: cst.weight,
          serviceType: cst.serviceType,
          description: cst.description,
          dateOfDelivery: cst.dateOfDelivery,
          shippmentDate: cst.shippmentDate,
          imageURL: cst.shippmentDate,
        })
      );
    });

    return await result;
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setApiState((s) => ({ ...s, isLoading: true }));

    await setData()
      .then((res) => {
        setApiState((s) => ({ ...s, isLoading: false, isSuccessful: true }));
        setModalIsVisible(true);
      })
      .catch((err) =>
        setApiState((s) => ({ ...s, isError: err.message, isLoading: false }))
      );
  };

  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <Stack spacing={4}>
          <FormControl id="ID">
            <FormLabel color="gray.500" fontSize="sm">
              Tracking ID
            </FormLabel>
            <Input
              isDisabled
              type="text"
              // placeholder={currentUser?.trackingId}
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.trackingId}
              required
            />
          </FormControl>
          <Flex gridGap="10">
            <FormControl id="From">
              <FormLabel color="gray.500" fontSize="sm">
                From
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.from}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.from}
                onChange={handleFrom}
                required
              />
            </FormControl>
            <FormControl id="To">
              <FormLabel color="gray.500" fontSize="sm">
                To
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.to}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.to}
                onChange={handleTo}
                required
              />
            </FormControl>
          </Flex>
          <FormControl id="email">
            <FormLabel color="gray.500" fontSize="sm">
              Reciever Email
            </FormLabel>
            <Input
              type="email"
              placeholder={cst?.receiverEmail}
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.receiverEmail}
              onChange={handleEmail}
              required
            />
          </FormControl>
          <FormControl id="Location">
            <FormLabel color="gray.500" fontSize="sm">
              Status
            </FormLabel>
            <Input
              type="text"
              placeholder={cst?.status}
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.status}
              onChange={handleStatus}
              required
            />
          </FormControl>
          <FormControl id="Location">
            <FormLabel color="gray.500" fontSize="sm">
              Current Location
            </FormLabel>
            <Input
              type="text"
              placeholder={cst?.currentLocation}
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.currentLocation}
              onChange={handleLocation}
              required
            />
          </FormControl>
          <Box p={3}>
            <Text my={3} fontSize="2xl" color="black">
              Package information:{" "}
            </Text>
            <Divider></Divider>
            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Quantity
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.quantity}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.quantity}
                onChange={handleQuantity}
                required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Weight
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.weight}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.weight}
                onChange={handleWeight}
                required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Service type
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.serviceType}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.serviceType}
                onChange={handleServiceType}
                required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Description
              </FormLabel>
              <Input
                type="text"
                placeholder={cst?.description}
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.description}
                onChange={handleDescription}
                required
              />
            </FormControl>
          </Box>
          <Button
            fontWeight="400"
            size="md"
            w="fit-content"
            colorScheme="green"
            mt="1.5"
            isLoading={apiState.isLoading}
            color={"white"}
            type="submit"
          >
            Update
          </Button>
        </Stack>
      </form>
      <FloatingBtn />

      <CustomModal
        msg="User Data Is Updated!"
        isOpen={modalIsVisible}
        title="Notification"
        onClose={() => {
          setModalIsVisible(false);
          history.goBack();
        }}
      />
    </>
  );
}

export default EditUserForm;
