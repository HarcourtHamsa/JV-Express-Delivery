import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Center, Container, Text, SimpleGrid } from "@chakra-ui/react";
import banner from "../assets/images/header.jpg";
// import WhatsAppWidget from "../components/WhatsAppWidget";

function About() {
  return (
    <div>
      <Navbar />
      {/* <WhatsAppWidget /> */}
      <Box
        height="50vh"
        bgImage={banner}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition={{ base: "right", md: "center" }}
        position="relative"
        // bg="blue.900"
      >
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

        <Container maxW={"6xl"} h="inherit" zIndex={20}>
          <Center h="inherit" justifyContent="flex-start">
            <Box color="white" zIndex={2}>
              <Text as="h1" fontSize="5xl">
                About Us
              </Text>
              <Text fontSize="sm" w={{base: '80%'}}>
                Join us as we try to change the world. We’ll help you every step
                of the way.
              </Text>
            </Box>
          </Center>
        </Container>
      </Box>

      <Container maxW="6xl">
        <SimpleGrid
          my="20"
          templateColumns={{ sm: "1fr 1fr", md: " 2fr 2fr" }}
          spacing={8}
        >
          <Box h="fit-content">
            <Text mb="10" fontSize={"4xl"} as="h2">
              What We Do.
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
          </Box>
          <Box h="fit-content">
            <Text fontSize={"4xl"} as="h2">
              Contact Us.
            </Text>
            <Box>
              <iframe
                title="kabul"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d420608.85172325943!2d68.91753509212828!3d34.55338690934091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d1694c3c1e6d49%3A0xebdf473578214429!2sKabul%2C%20Afghanistan!5e0!3m2!1sen!2sng!4v1603670839897!5m2!1sen!2sng"
                frameborder="0"
                aria-hidden="false"
                tabindex="0"
                // style="border: 0px;"
              ></iframe>
            </Box>
            <Text my="5">GDE Delivery Company</Text>
            <Text fontSize="sm">3481 Melrose Place</Text>
            <Text fontSize="sm">Kabul, Afghanistan</Text>
            <Text fontSize="sm">Email: support@smartlogistics.com</Text>
          </Box>
        </SimpleGrid>
      </Container>
      <Footer />
    </div>
  );
}

export default About;
