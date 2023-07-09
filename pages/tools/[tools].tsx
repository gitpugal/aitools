import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../../components/navbar';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Link,
  Flex,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Footer from '../../components/footer';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';


export default function Home() {

const router = useRouter();

  return (
    <div>
      <Head>
        <title>AIToolsNext - Find Best AI tools to
          simplify your task and make your work easy</title>
        <meta name="description" content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Container maxW="container.md">
      {/* Back button */}
      <Box
        mb={4}
        cursor="pointer"
        display="inline-flex"
        alignItems="center"
        color="blue.500"
        _hover={{ color: 'blue.700' }}
        onClick={() => router.back()}
      >
        <ArrowBackIcon mr={2} />
        Back
      </Box>

      {/* Tool image */}
      <Box mb={4}>
        <Image width={300} height={300} src={'/test.png'} alt={'test'} />
      </Box>

      {/* Tool details */}
      <Box>
        <Heading as="h2" size="xl" mb={4}>
          {"Test"}
        </Heading>
        <Text fontSize="lg" mb={4}>
          {"Test Description"}
        </Text>
        <Box>
          {['test1','test2'].map((tag) => (
            <Badge key={tag} mr={2} mb={2} colorScheme="blue">
              {tag}
            </Badge>
          ))}
        </Box>
      </Box>
    </Container>
      <Footer />
    </div>
  );
}