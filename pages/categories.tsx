import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/navbar';
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
import Footer from '../components/footer';

export default function Home({ categories }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div>
      <Head>
        <title>AIToolsNext - Find Best AI tools to
          simplify your task and make your work easy</title>
        <meta name="description" content="Discover the best AI tools directory with reviews and alternative options in multiple categories like text, video, and images. Find the right AI tools for your specific needs and enhance your productivity." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

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
            Find Best AI tools to<br />
            <Text as={'span'} color={'green.400'}>
              simplify your task
            </Text>
          </Heading>

          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
           <Text> Please find the complete list of all the categories </Text>
          </Stack>

          <Stack display={'flex'} textAlign={'start'} justify={'flex-start'} maxW={'5xl'} direction="row">
            <Box>
              {categories?.map((category) => (
                <Link href={`/${category?.slug}`}>
                  <Badge
                    key={category.id}
                    px='2'
                    py='2'
                    borderRadius={'10px'}
                    mx='1'
                    my='1'
                    fontSize={'11px'}
                    variant='solid'
                    colorScheme={hoveredCategory === category.id ? 'blue' : 'gray'}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    _hover={{
                      cursor: 'pointer',
                      colorScheme: 'green',
                      transform: 'translateX(2px)',
                    }}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}

              <Badge
                key={'show_more'}
                px='2'
                py='2'
                borderRadius={'10px'}
                mx='1'
                my='1'
                fontSize={'11px'}
                variant='solid'
                colorScheme={hoveredCategory === '100000' ? 'blue' : 'gray'}
                onMouseEnter={() => setHoveredCategory('100000')}
                onMouseLeave={() => setHoveredCategory(null)}
                _hover={{
                  cursor: 'pointer',
                  colorScheme: 'blue',
                  transform: 'translateX(2px)',
                }}
              >
                {'Show More...'}
              </Badge>
            </Box>
          </Stack>

         

        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://api.aitoolsnext.com/getCategories');
  const categories = await response.json();
  return {
    props: {
      categories
    },
  };
}
