import React from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Stack,
  Icon,
} from "@chakra-ui/react";
import Users from "../../components/dashboard/Users";
import NewUserForm from "../../components/dashboard/NewUserForm";
import { IoHome } from "react-icons/io5";
import FloatingBtn from "../../components/dashboard/FloatingBtn";

function Home() {
  return (
    <Box bg="gray.50" h="full">
      <Container maxW="6xl" pt={3}>
        <Flex alignItems="center">
          <Icon
            as={IoHome}
            fontSize={25}
            mr={2}
            color="gray.400"
            cursor="pointer"
          />
          <Text color="gray.500" fontSize="sm">JV Express Delivery</Text>
        </Flex>
        <Text fontSize="4xl" color="#D40511">
          Dashboard.
        </Text>
        <Text mb={10} fontSize="sm">/Home</Text>
        <Tabs
          isLazy
          variant="line"
          borderColor="gray.100"
          textColor="gray.400"
          colorScheme="red"
        >
          <TabList>
            <Tab>Users</Tab>
            <Tab>New User</Tab>
          </TabList>
          <TabPanels>
            {/* initially mounted */}
            <TabPanel h="100vh">
              <Stack spacing={5}>
                <Users />
              </Stack>
            </TabPanel>
            {/* initially not mounted */}
            <TabPanel maxW={"4xl"}>
              <NewUserForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <FloatingBtn />
    </Box>
  );
}

export default Home;
