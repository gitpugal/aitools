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

export default function Home({ categories, slug }) {
  const router = useRouter();

  const s = slug; 

  debugger;

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
          <Image width={300} height={300} src={`/categories/ai_tools_applications.webp`} alt={'test'} />
        </Box>

        {/* Tool details */}
        <Box>
          <Heading as="h2" size="xl" mb={4}>
            {categories?.name}
          </Heading>
          <div style={{marginTop:'20px', marginBottom:'20px'}}  dangerouslySetInnerHTML={{ __html: categories.description }}></div>
          <Box>
            {categories.length > 0 && categories?.map((category) => (
              <Badge key={category.slug} mr={2} mb={2} colorScheme="blue">
                {category.name}
              </Badge>
            ))}
          </Box>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
    const url = context.req.url;
    const slug = url.substring(url.lastIndexOf('/') + 1); // Extract the last segment of the URL
  
  const res = await fetch(`http://api.aitoolsnext.com/getToolsBySlug/${slug}`);
  const data = await res.json();

  return {
    props: {
      categories: data,
      slug: slug ? slug : ""
    },
  };
}
