import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IoSearch, IoBus, IoLocate, IoCalculator } from "react-icons/io5";

export default function SecondaryNav() {
  return (
    <Box>
      <Flex
        bg={useColorModeValue("gray.200", "gray.800")}
        color={useColorModeValue("blue.900", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        display={{ base: "none", md: "flex" }}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", md: "flex" }} align="center">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"smaller"}
            fontWeight={400}
            bg="transparent"
            size="sm"
            display={{ base: "none", md: "flex" }}
          >
            <IoSearch size={20} color="blue" />
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                href={navItem.href ?? "#"}
                fontWeight={400}
                fontSize="sm"
                color={"blue.900"}
                _hover={{
                  textDecoration: "none",
                }}
              >
                {navItem.label}
                <Icon color={"blue.900"} w={5} h={5} as={ChevronDownIcon} />
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"0"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, icon }) => {
  return (
    <Link href={href} role={"group"} display={"block"} p={2}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "white" }}
            fontWeight={100}
            fontSize="sm"
          >
            <Icon color={"blue.900"} w={5} h={5} as={icon} mr="2" />
            {label}
          </Text>
          <Text fontSize={"sm"} color="blue.300">
            {icon}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        ></Flex>
      </Stack>
    </Link>
  );
};

const NAV_ITEMS = [
  {
    label: "Tools",
    children: [
      {
        label: "Track your item",
        href: "/locate",
        icon: IoBus,
      },
      {
        label: "Find a postcode ",
        href: "#",
        icon: IoLocate,
      },
      {
        label: "Calculate postage ",
        href: "#",
        icon: IoCalculator,
      },
    ],
  },
];
