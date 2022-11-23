import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import CustomLink from "./CustomLink";
import Marquee from "react-fast-marquee";
import Logo from "./Logo";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box position={'fixed'} zIndex={100}>
      <Marquee style={{ backgroundColor: "black", color: 'white' }}>
        Relied upon by more than 11 million people worldwide, GDE Delivery Company is
        committed to making package delivery elegant, productive, and safe.
      </Marquee>
      <Flex
        borderBottomWidth="thin"
        shadow="lg"
        bgGradient="linear(to-r, 	#FFCC00, , 	#FFCC00, yellow.50)"
        color={useColorModeValue("black", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderWidth="0"
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} color="black" />
              ) : (
                <HamburgerIcon w={8} h={8} color="black" />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          color="white"
        >
          <Logo size={30} label={true} />
          <Flex display={{ base: "none", md: "flex" }} ml={10} align="center">
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
            variant=""
            display={{ base: "none", md: "flex" }}
          >
            <CustomLink color="white" to="/" label="Home" fontsize="sm" />
          </Button>
          <Button
            as={"a"}
            fontSize={"smaller"}
            fontWeight={400}
            bg="transparent"
            size="sm"
            variant=""
            display={{ base: "none", md: "flex" }}
          >
            <CustomLink
              color="white"
              to="/about"
              label="About us"
              fontsize="sm"
            />
          </Button>
          <Button
            as={"a"}
            fontSize={"smaller"}
            fontWeight={400}
            bg="transparent"
            size="sm"
            variant=""
            display={{ base: "none", md: "flex" }}
          >
            <CustomLink color="white" to="/locate" label="Track " />
          </Button>
          <Button
            as={"a"}
            fontSize={"smaller"}
            fontWeight={400}
            bg="transparent"
            size="sm"
            variant=""
          >
            <CustomLink color="white" to="/login" label="Login" />
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <CustomLink
                p={2}
                to={navItem.href ?? "#"}
                fontWeight={400}
                fontSize="sm"
                color={"black"}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </CustomLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
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

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("twitter.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "twitter.400" }}
            fontWeight={100}
            fontSize="sm"
          >
            {label}
          </Text>
          <Text fontSize={"sm"} color="gray.300">
            {subLabel}
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
        >
          <Icon color={"twitter.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={"normal"}
          fontSize="sm"
          color={useColorModeValue("black", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Track your item",
    href: "/locate",
  },
  {
    label: "Login",
    href: "/login",
  },
  // {
  //   label: "Enterprise",
  //   children: [
  //     {
  //       label: "About Project",
  //       subLabel: "Know all you need to know about coinvast",
  //       href: "#",
  //     },
  //     {
  //       label: "Contact",
  //       subLabel: "Get in touch with us",
  //       href: "#",
  //     },
  //   ],
  // },
];
