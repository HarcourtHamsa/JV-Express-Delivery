import React from "react";

// import InfoBar from "../components/InfoBar";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";
import SecondaryNav from "../components/SecondaryNav";
import {
  SimpleGrid,
  Box,
  Text,
  Container,
  Image,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
// import Main from "../components/Main";

import whoBannerImg from "../assets/images/who.jpg";
import secondWhoBannerImg from "../assets/images/who2.jpg";

import { BsStack } from "react-icons/bs";
import { ImAirplane } from "react-icons/im";
import { RiShipFill } from "react-icons/ri";
import { FaTruckMoving } from "react-icons/fa";
// import WhatsAppWidget from "../components/WhatsAppWidget";

function Home() {
  return (
    <>
      <Navbar />
      <SecondaryNav />
      <Jumbotron />
      {/* <WhatsAppWidget /> */}

      <Heading
        textAlign={"center"}
        fontWeight="normal"
        fontFamily={"inherit"}
        mb={10}
        fontSize="2xl"
        // bg="red"
        mt={{ base: "55vh", md: "20" }}
      >
        Shipping Services
      </Heading>
      <SimpleGrid
        h="fit-content"
        w="80vw"
        m="auto"
        templateColumns={{
          sm: "1fr",
          md: " 1fr 1fr 1fr 1fr ",
        }}
        // spacing={"10"}
        fontSize="sm"
        textAlign={"initial"}
        mb="10"
        // bg="red"
      >
        <Box h="2xs" rounded={4} p={3} textAlign="center">
          <Center>
            <BsStack size={30} color="rgb(212, 5, 17)" />
          </Center>
          <Text my="5" fontSize={"lg"}>
            Document & Parcel
          </Text>
          <Text>Domestic</Text>
          <Text>International</Text>
        </Box>
        <Box h="2xs" rounded={4} p={3} textAlign="center">
          <Center>
            <ImAirplane size={30} color="rgb(212, 5, 17)" />
          </Center>
          <Text my="5" fontSize={"lg"}>
            Air Freight
          </Text>
          <Text>Domestic</Text>
          <Text>International</Text>
        </Box>
        <Box h="2xs" rounded={4} p={3} textAlign="center">
          <Center>
            <RiShipFill size={30} color="rgb(212, 5, 17)" />
          </Center>
          <Text my="5" fontSize={"lg"}>
            Ship Freight
          </Text>
          <Text>International</Text>
        </Box>
        <Box h="2xs" rounded={4} p={3} textAlign="center">
          <Center>
            <FaTruckMoving size={30} color="rgb(212, 5, 17)" />
          </Center>
          <Text my="5" fontSize={"lg"}>
            Road Freight
          </Text>
          <Text>International</Text>
        </Box>
      </SimpleGrid>
      <Container maxW="6xl">
        <SimpleGrid
          my="20"
          templateColumns={{ sm: "1fr 1fr", md: " 2fr 2fr" }}
          spacing={"20"}
        >
          <Box h="fit-content">
            <Text>Do you know</Text>
            <Text mb="10" fontSize={"4xl"} as="h2">
              Who We Are?
            </Text>
            <Text mb="5" fontSize="sm">
              GDE Delivery Company is an Afghanistan courier, parcel, and express
              mail service which is a division of the German logistics company
              Deutsche Post DHL. The company delivers over 1.3 billion parcels
              per year.
            </Text>
            <Text fontSize="sm">
              We are an international team of over 380,000 shipping
              professionals, united by a passion for logistics. And we work in a
              unique environment. Don John Shipping is as innovative as a
              start-up, with the power of an international organization.
            </Text>

            <Button
              fontSize={"sm"}
              colorScheme={"red"}
              mt="5"
              fontWeight={"normal"}
            >
              {" "}
              Learn More{" "}
            </Button>
          </Box>
          <Box h="full" w="full">
            <Image src={whoBannerImg} w={"full"} />
          </Box>
        </SimpleGrid>
      </Container>
      <Container maxW="7xl">
        <SimpleGrid
          my="20"
          templateColumns={{ sm: "1fr 1fr", md: " 2fr 2fr" }}
          spacing={"20"}
        >
          <Box h="full" w="full">
            <Image src={secondWhoBannerImg} w={"full"} />
          </Box>
          <Box h="fit-content">
            <Text>Do you know</Text>
            <Text mb="10" fontSize={"4xl"} as="h2">
              Our Vision
            </Text>
            <Text mb="5" fontSize="sm">
              The following principles reflect our values, define our culture,
              and guide our actions: lead with humility and respect. Earn trust
              through authenticity and accountability. Cultivate mutually
              beneficial partnerships with customers, associates and suppliers.
              Practice servant leadership and demand the highest standards.
            </Text>

            <Button
              fontSize={"sm"}
              colorScheme={"red"}
              mt="5"
              fontWeight={"normal"}
            >
              {" "}
              Learn More{" "}
            </Button>
          </Box>
        </SimpleGrid>
      </Container>
      {/* <Main /> */}
      <Footer />
    </>
  );
}

export default Home;
