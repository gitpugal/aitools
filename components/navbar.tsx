import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { SessionProvider, getProviders } from "next-auth/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useEffect } from "react";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const session = useSession();
  const [navDrop, setNavDrop] = useState(false);
  // const [providers, setProviders] = useState([]);

  // const fetchData = async () => {
  //   const provider = await getProviders();
  //   setProviders(provider);
  // };
  // useEffect(() => {
  //   // console.log(session?.data);
  //   fetchData();
  // }, []);
  useEffect(() => {
    console.log(session?.data);
  }, [session?.status]);

  return (
    <div className="bg-black text-white">
      <Flex
      bgColor={"black"}
      color={"white"}
        minH={"60px"}
        py={{ base: 4 }}
        px={[4, 20, 40]}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
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
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex
          flex={{ base: 1 }}
          alignItems={"center"}
          alignContent={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Link href={"/"}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
            >
              AITOOLSNEXT.COM
            </Text>
          </Link>

          <Flex display={["none", "flex", "flex"]} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex position={"relative"} alignItems={"center"} gap={3}>
          {/* <a href="/profile"> */}

          {session?.data && 
          <div
            onClick={() => setNavDrop((prev) => !prev)}
            className="bg-gray-700 rounded-full h-fit w-fit"
          >
            {/* hi */}
            <img
              src={session?.data?.user?.image}
              style={{
                backgroundColor: "powderblue",
                borderRadius: "100%",
                height: "6vh",
                position: "relative",
              }}
              alt=""
            />
          </div>}
          <div
            style={{
              position: "absolute",
              bottom: "-120px",
              right: "50%",
              // translate: "50% 0%",
              backgroundColor: "powderblue",
              padding: "10px",
              borderRadius: "10px",
              display: navDrop ? "flex" : "none",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              gap: "8px",
            }}
          >
            <p>{session?.data?.user?.name.split(" ")[0]}</p>
            <a
              href="/profile"
              style={{ fontWeight: "bolder", fontSize: "20px", zIndex: 100 }}
            >
              Profile
            </a>
            {session.data && (
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue.800"}
                cursor={"pointer"}
                onClick={() => signOut()}
                zIndex={100}
              >
                Sign out
              </Button>
            )}
          </div>
          {/* </a> */}

          {!session.data && (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"whiteAlpha.400"}
              onClick={() => {
                document.getElementById("modal").style.visibility = "visible";
              }}
              // href={"/Authentication"}
              _hover={{
                bg: "blue.300",
              }}
            >
              Sign In
            </Button>
          )}

          {!session.data && (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"whiteAlpha.400"}

              onClick={() => {
                document.getElementById("modal").style.visibility = "visible";
              }}
              // href={"/Authentication"}
              _hover={{
                bg: "blue.300",
              }}
            >
              Sign Up
            </Button>
          )}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </div>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                // color={linkColor}
                _hover={{
                  textDecoration: "none",
                  // color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
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

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
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
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
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

const MobileNavItem = ({ label, children, href }: NavItem) => {
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
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
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

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Categories",
    href: "/categories",
  },
  {
    label: "Tools",
    href: "/tools",
  },
  {
    label: "Best Deals",
    href: "/deals",
  },
];
