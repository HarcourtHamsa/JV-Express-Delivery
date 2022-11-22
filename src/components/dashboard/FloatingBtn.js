import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { auth } from "../../firebase";
import { IoLogOut } from "react-icons/io5";
import { useHistory } from "react-router-dom";

function FloatingBtn() {
  const history = useHistory();
  const logout = () => {
    auth.signOut();
    localStorage.removeItem("currentUser");
    history.push("/login");
  };

  return (
    <Flex
      w={"16"}
      h={"16"}
      rounded="full"
      shadow="md"
      position="fixed"
      bottom="30"
      right="1"
      justifyContent="center"
      alignItems="center"
      bg="#D40511"
      cursor="pointer"
      onClick={logout}
    >
      <Icon as={IoLogOut} fontSize={30} color="white" />
    </Flex>
  );
}

export default FloatingBtn;
