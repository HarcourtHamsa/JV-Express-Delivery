import React from "react";
import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SiCarthrottle } from "react-icons/si";

function AppLogo({ size, isDisabled, label }) {
  return (
    <Link
      textDecor="none"
      to="/"
      _hover={{ textDecor: isDisabled ? "none" : "initial" }}
    >
      <div id="logo" style={styles.logo}>
        <Center>
          <SiCarthrottle size={size} color="#D40511" />
        </Center>
      </div>
    </Link>
  );
}

const styles = {
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AppLogo;
