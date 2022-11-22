import React from "react";
import {
  Flex,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import { firestore } from "../../firebase";
import CustomModal from "./CustomModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewUserForm() {
  const ID = Math.random().toString(16).split(".")[1];
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [cloudinaryImageUrl, setCloudinaryImageUrl] = React.useState("");
  const [apiState, setApiState] = React.useState({
    isLoading: false,
    isError: false,
    isSuccessful: false,
  });
  const [cst, fns] = React.useState({
    trackingID: ID,
    from: "",
    to: "",
    receiverEmail: "",
    status: "",
    currentLocation: "",
    senderAddress: "",
    receiverAddress: "",
    quantity: "",
    weight: "",
    serviceType: "",
    description: "",
  });
  const [shippmentDate, setShippmentDate] = React.useState(new Date());
  const [dateOfDelivery, setDateOfDelivery] = React.useState(new Date());

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

  const handleSenderAddress = (e) => {
    fns((s) => ({ ...s, senderAddress: e.target.value }));
  };

  const handleReceiverAddress = (e) => {
    fns((s) => ({ ...s, receiverAddress: e.target.value }));
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

  const handleImage = (e) => {
    setImage(e.target.value);
  };

  const uploadImageToCloudinary = async () => {
    const imageFiles = document.querySelector('input[type="file"]');
    const files = imageFiles.files;

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "default");

    const options = {
      method: "POST",
      body: formData,
    };

    const res = await fetch(
      "https://api.Cloudinary.com/v1_1/dgn6edv1k/image/upload",
      options
    );
    return res;
  };

  const createUser = async () => {
    let result = new Promise((resolve, reject) => {
      resolve(
        firestore.collection("users").add({
          from: cst.from,
          to: cst.to,
          currentLocation: cst.currentLocation,
          receiverEmail: cst.receiverEmail,
          status: cst.status,
          trackingId: ID,
          senderAddress: cst.senderAddress,
          receiverAddress: cst.receiverAddress,
          shippmentDate,
          dateOfDelivery,
          quantity: cst.quantity,
          weight: cst.weight,
          serviceType: cst.serviceType,
          description: cst.description,
          imageURL: cloudinaryImageUrl,
        })
      );
    });

    return await result;
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setApiState((s) => ({ ...s, isLoading: true }));

    await uploadImageToCloudinary()
      .then((res) => res.json())
      .then((res) => setCloudinaryImageUrl(res))
      .catch((err) => console.log("error from cloudinary... ", err));

    await createUser()
      .then(() => {
        setApiState((s) => ({ ...s, isLoading: false, isSuccessful: true }));
        setModalIsVisible(true);
        // fns((s) => ({
        //   currentLocation: "",
        //   from: "",
        //   receiverEmail: "",
        //   status: "",
        //   to: "",
        //   trackingID: "",
        //   description: "",
        //   quantity: "",
        //   serviceType: "",
        //   weight: "",
        // }));
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
              placeholder={ID}
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.trackingID}
              // required
            />
          </FormControl>

          <Flex gridGap="10">
            <FormControl>
              <FormLabel color="gray.500" fontSize="sm">
                Shippment Date
              </FormLabel>
              <DatePicker
                selected={shippmentDate}
                onChange={(date) => setShippmentDate(date)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500" fontSize="sm">
                Expected Date of Delivery
              </FormLabel>
              <DatePicker
                selected={dateOfDelivery}
                onChange={(date) => setDateOfDelivery(date)}
              />
            </FormControl>
          </Flex>

          <Flex gridGap="10">
            <FormControl id="From">
              <FormLabel color="gray.500" fontSize="sm">
                Sender Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Who is sending the package?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.from}
                onChange={handleFrom}
                // required
              />
            </FormControl>
            <FormControl id="To">
              <FormLabel color="gray.500" fontSize="sm">
                Receiver Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Who is rceiving the package?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.to}
                onChange={handleTo}
                // required
              />
            </FormControl>
          </Flex>
          <Flex gridGap="10">
            <FormControl id="From">
              <FormLabel color="gray.500" fontSize="sm">
                Sender Address
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter sender address"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.senderAddress}
                onChange={handleSenderAddress}
                // required
              />
            </FormControl>
            <FormControl id="To">
              <FormLabel color="gray.500" fontSize="sm">
                Receiver Address
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter receiver address"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.receiverAddress}
                onChange={handleReceiverAddress}
                // required
              />
            </FormControl>
          </Flex>
          <FormControl id="email">
            <FormLabel color="gray.500" fontSize="sm">
              Reciever Email
            </FormLabel>
            <Input
              type="email"
              placeholder="you@example.org"
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.receiverEmail}
              onChange={handleEmail}
              // required
            />
          </FormControl>
          <FormControl id="Location">
            <FormLabel color="gray.500" fontSize="sm">
              Status
            </FormLabel>
            <Input
              type="text"
              placeholder="Where is the status of the package?"
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.status}
              onChange={handleStatus}
              // required
            />
          </FormControl>
          <FormControl id="Location">
            <FormLabel color="gray.500" fontSize="sm">
              Current Location
            </FormLabel>
            <Input
              type="text"
              placeholder="Where is the package at ?"
              variant="filled"
              size="md"
              borderRadius="sm"
              value={cst.currentLocation}
              onChange={handleLocation}
              // required
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
                placeholder="Where is the quantity of the package ?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.quantity}
                onChange={handleQuantity}
                // required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Weight
              </FormLabel>
              <Input
                type="text"
                placeholder="How heavy is the package?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.weight}
                onChange={handleWeight}
                // required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Service type
              </FormLabel>
              <Input
                type="text"
                placeholder="Where is the service type ?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.serviceType}
                onChange={handleServiceType}
                // required
              />
            </FormControl>

            <FormControl id="Location">
              <FormLabel color="gray.500" fontSize="sm">
                Description
              </FormLabel>
              <Input
                type="text"
                placeholder="Describe the package?"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={cst.description}
                onChange={handleDescription}
                // required
              />
            </FormControl>

            <FormControl id="Location" mt={3}>
              <FormLabel color="gray.500" fontSize="sm">
                Upload Image
              </FormLabel>
              <Input
                type="file"
                variant="filled"
                size="md"
                borderRadius="sm"
                value={image}
                onChange={handleImage}
                // required
              />
            </FormControl>
            <Text fontSize="xs" color="red">
              Warning: Please file size must not exceed 2mb
            </Text>
          </Box>
          <Button
            fontWeight="400"
            size="md"
            w="50%"
            py="6"
            colorScheme="green"
            mt="1.5"
            isLoading={apiState.isLoading}
            color={"white"}
            type="submit"
          >
            Create User
          </Button>
        </Stack>
      </form>

      <CustomModal
        msg="New user created"
        isOpen={modalIsVisible}
        title="Notification"
        onClose={() => setModalIsVisible(false)}
      />

      <CustomModal
        msg={`${apiState.isError}`}
        isOpen={apiState.isError}
        title="Error"
        onClose={() =>
          setApiState((prevState) => ({
            ...prevState,
            isError: "",
          }))
        }
      />
    </>
  );
}

export default NewUserForm;
