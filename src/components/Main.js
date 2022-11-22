import React from "react";
import { Box, Text, Flex, Image, Center } from "@chakra-ui/react";
import ExpressPostImg from "../assets/images/icon-express-post.svg";
import PrintShippingImg from "../assets/images/icon-print-shipping.svg";
import RedirectMailImg from "../assets/images/icon-redirect-mail.svg";

function Main() {
  return (
    <Box h="fit-content" py={10} textAlign="center" bg="gray.50">
      <Text color="green.600" fontSize="sm" letterSpacing="widest">SHIPPING</Text>
      <Text textAlign="center" fontSize="3xl" mb="10">
        Local & International shipping for personal and business use
      </Text>

      <Flex h="inherit" gridGap="10" justifyContent="center" flexDirection={{base: "column", md:"row"}}>
        <Box h="200" w={{ base: "100%", md: "30%" }} >
          <Center>
            <Image src={ExpressPostImg} />
          </Center>
          <Text color="red.400">Express post</Text>
          <Text>Get speedy delivery at a fixed cost with our satchels.</Text>
        </Box>
        <Box h="200" w={{ base: "100%", md: "30%" }} >
          <Center>
            <Image src={PrintShippingImg} />
          </Center>
          <Text color="red.400">Print shipping labels</Text>
          <Text>Print postage to send parcels from your home or office.</Text>
        </Box>
        <Box h="200" w={{ base: "100%", md: "30%" }} >
          <Center>
            <Image src={RedirectMailImg} />
          </Center>
          <Text color="red.400">Redirect your mail</Text>
          <Text>Some foolish email I forgot about but oh well</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default Main;
