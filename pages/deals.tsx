import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
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


export default function Home({ tools }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div>
      <Head>
        <title>AIToolsNext - Find Best AI tools to
          simplify your task and make your work easy</title>
        <meta name="description" content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <Container maxW={'5xl'}>

        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>

          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
           Comming Soon!!!
          </Heading>

    

          <Box
            maxW={'5xl'}
            display={{ base: 'block', md: 'grid' }}
            gridTemplateColumns={{ md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gap={4}

            rounded="md"
            p={2}
            textAlign="start"
            _hover={{ shadow: 'amber.300', lg: { shadow: 'lg' } }}
            bg="amber.50/30"
          >
           
          </Box>

        </Stack>
      </Container>
      
    </div>
  );
}

export async function getServerSideProps() {

  const toolsResponse = await fetch('http://localhost:3000/api/topTools');
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      tools
    },
  };
}
