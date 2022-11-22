import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={styles.loader}>
      <div>
        <FadeLoader
          thickness="5px"
          speed="0.85s"
          emptyColor="gray.200"
          color="green.900"
          size="xl"
        />
      </div>
    </div>
  );
};

const styles = {
  loader: {
    height: "100vh",
    backgroundColor: "#F7FAFC",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Loader;
