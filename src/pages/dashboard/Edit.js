import React from "react";
import { Box, Container, Text, Flex, Icon } from "@chakra-ui/react";
import { IoChevronBackCircle } from "react-icons/io5";
import EditUserForm from "../../components/dashboard/EditUserForm";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <Box bg="gray.50" h="fit-content">
      <Container maxW="6xl" pt={3} pb={10}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Icon
              as={IoChevronBackCircle}
              fontSize={35}
              mr={2}
              color="gray.400"
              cursor="pointer"
              onClick={() => history.goBack()}
            />
            <Text color="gray.500">GDE Delivery Company</Text>
          </Flex>
        </Flex>
        <Text fontSize="4xl" color="black">
          Dashboard.
        </Text>
        <Text mb={10} >/Edit Contact</Text>

        <Box p={3} maxW="4xl">
          <EditUserForm />
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
