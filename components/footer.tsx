import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import Image from "next/image";

const Logo = (props: any) => {
  return (
    <Link href="/">
      <Image
        alt="aitoolsnext_logo"
        width={240}
        height={60}
        src="/aitoolsnext_logo.png"
      />
    </Link>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("#262626Alpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("#262626Alpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};



export default function Footer() {
  const [email, setEmail] = useState("");
  async function subscribe (){
    try {
      const res = await fetch("/api/addSubscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      console.log(res);
      if (res.status < 300) {
        alert("Subscibed successfully!")
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Box
      sx={{  bottom: 0, width: "100%", margin: 0 }}
      bgColor={"blackAlpha.600"}
      color={"whiteAlpha.800"}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo color={useColorModeValue("gray.700", "white")} />
            </Box>
            <Text fontSize={"sm"}>
              © 2023 aitoolsnext.com All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>AIToolsNext</ListHeader>
            <Link href={"#"}>Tools</Link>
            <Link href={"#"}>Categories</Link>
            <Link href={"#"}>Deals</Link>
            <Link href={"#"}>Contact Us</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Help & Support</ListHeader>
            <Link href={"#"}>About Us</Link>
            <Link href={"#"}>Submit Tool</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="enter you email"
                // type="text"
                className="w-full h-full px-8 py-2  rounded-xl bg-white/20"
              />
              <IconButton
                bgColor={"black"}
                _hover={{
                  bg: "green.600",
                }}
                onClick={subscribe}
                aria-label="Subscribe"
                icon={<BiMailSend color="white" className="" />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
