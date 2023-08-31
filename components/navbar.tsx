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
    <div className="bg-slate-200 border-b-[0.01px]  border-pink-500 shadow-md text-black">
      <Flex
        // bgColor={"black"}
        // color={"white"}
        minH={"60px"}
        py={{ base: 4 }}
        px={[4, 5, 5]}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        className="justify-between"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", lg: "none" }}
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
        <a href={"/"} className="flex  absolute left-1/2 -translate-x-1/2  lg:relative lg:hidden hover:no-underline">
            <Text
              // textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              bgClip="text"
              fontSize="xl"
              fontWeight="extrabold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width={"fit-content"}
              className="hover:no-underline"

            >
              AITOOLSNEXT.COM
            </Text>
          </a>
        <div className="hidden mr-10 font-semibold lg:flex flex-row gap-7 text-lg items-center justify-center">
          <a href={"/"} className="no-underline">
            <Text
              // textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width={"fit-content"}
              
            >
              AITOOLSNEXT.COM
            </Text>
          </a>
          {NAV_ITEMS.map((el) => (
            <a href={el.href}>{el.label}</a>
          ))}
        </div>
        <Flex position={"relative"} alignItems={"center"} gap={3}>
          {/* <a href="/profile"> */}

          {session?.data && (
            <div
              onClick={() => setNavDrop((prev) => !prev)}
              className="bg-gray-700 rounded-full h-fit ml-3 w-fit"
            >
              {/* hi */}
              <img
                className=""
                src={session?.data?.user?.image}
                style={{
                  backgroundColor: "powderblue",
                  borderRadius: "100%",
                  height: "6vh",
                  position: "relative",
                }}
                alt=""
              />
            </div>
          )}
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
                bg={"black"}
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
              bg={"blackAlpha.800"}
              onClick={() => {
                document.getElementById("modal").style.visibility = "visible";
              }}
              // href={"/Authentication"}
              _hover={{
                bg: "pink",
                color: "black",
                cursor: "pointer",
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
              bg={"blackAlpha.800"}
              onClick={() => {
                document.getElementById("modal").style.visibility = "visible";
              }}
              // href={"/Authentication"}
              _hover={{
                bg: "pink",
                color: "black",
                cursor: "pointer",
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
