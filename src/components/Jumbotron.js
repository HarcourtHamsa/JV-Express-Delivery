import React from "react";
import {
  Box,
  Text,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { GiPapers } from "react-icons/gi";
import { useHistory } from "react-router-dom";

import bannerImg from "../assets/images/header.jpg";

export default function Jumbotron() {
  let history = useHistory();
  const [trackingID, setTrackingID] = React.useState(null);

  const handleChange = (e) => {
    setTrackingID(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/locate",
      search: "?locate=true",
      state: {
        id: trackingID,
      },
    });
  };

  return (
    <>
      <Flex
        minH={"80vh"}
        w={"full"}
        bg="red"
        position={"relative"}
        alignItems="center"
        justifyContent={{ base: "center", md: "center" }}
        mb={"40"}
        bgImage={bannerImg}
        bgRepeat="no-repeat"
        bgSize={"cover"}
      >
        {/* overlay */}
        <Box
          position={"absolute"}
          top={0}
          left={0}
          bottom={0}
          right={0}
          width={"inherit"}
          height={"inherit"}
          bg="blackAlpha.600"
          zIndex={1}
        ></Box>

        <Box
          zIndex={2}
          color="white"
          w={{ base: "90%", md: "500px" }}
          minH={"200px"}
          h={"fit-content"}
          mr={{ base: 0, md: "12" }}
          p={"2"}
        >
          <Heading fontFamily={"inherit"} fontWeight="normal" fontSize={"2xl"}>
            Track Your Shipment
          </Heading>
          <Flex
            my={4}
            bg="white"
            h={{ base: "50px", md: "60px" }}
            boxSizing="border-box"
            rounded={6}
            overflow="hidden"
          >
            <Input
              placeholder="Enter your tracking number(s)"
              h={"inherit"}
              boxSizing="content-box"
              m={0}
              border={"none"}
              name="trackingID"
              value={trackingID}
              color="black"
              onChange={handleChange}
            />
            <Button
              colorScheme="blue"
              h={"1/2"}
              rounded={0}
              fontWeight="normal"
              m={1}
              borderRightRadius={6}
              bg={"#D40511"}
              px={8}
              onClick={handleSubmit}
              _hover={{
                bg: "#D40511",
              }}
            >
              Track
            </Button>
          </Flex>
          <Text>JV Express Reference Tracking</Text>
        </Box>

        <SimpleGrid
          h="fit-content"
          minH={"200px"}
          w={{ base: "90%", md: "70%" }}
          m="auto"
          zIndex={3}
          templateColumns={{
            sm: "1fr",
            md: " 1fr 1fr 1fr ",
          }}
          fontSize="sm"
          textAlign={"initial"}
          mb={{ md: "20", base: "4xl" }}
          bg="white"
          position={"absolute"}
          bottom={{ base: "-60%", md: "-30%" }}
          gap={{ base: 4, md: 0 }}
        >
          <Box
            h="fit-content"
            bg="gray.50"
            borderWidth={"thin"}
            p={3}
            textAlign="center"
          >
            <Center>
              <BsCalendar2WeekFill size={30} color="#D40511" />
            </Center>
            <Text my="5" fontSize={"lg"}>
              Ship Now
            </Text>
            <Text>Find the right service</Text>
          </Box>
          <Box
            h="fit-content"
            bg="gray.50"
            borderWidth={"thin"}
            p={3}
            textAlign="center"
          >
            <Center>
              <FaUserAlt size={30} color="#D40511" />
            </Center>
            <Text my="5" fontSize={"lg"}>
              Portal Login
            </Text>
            <Text>
              Our divisions offer different online tools for your shipping and
              logistics need
            </Text>
          </Box>
          <Box
            h="fit-content"
            bg="gray.50"
            borderWidth={"thin"}
            p={3}
            textAlign="center"
          >
            <Center>
              <GiPapers size={30} color="#D40511" />
            </Center>
            <Text my="5" fontSize={"lg"}>
              Get a quote
            </Text>
            <Text>Estimate cost to share and compare</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </>
  );
}
