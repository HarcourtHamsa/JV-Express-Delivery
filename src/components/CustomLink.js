import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/layout";

/**
 * Wrapper for Link tag
 * @param {String} to
 * @param {String} label
 * @returns
 */

const CustomLink = ({ to, label, color, ...rest }) => {
  return (
    <>
      <Text fontSize="sm">
        <Link style={styles.link} to={to}>
          {label}
        </Link>
      </Text>
    </>
  );
};

const styles = {
  link: {
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default CustomLink;
