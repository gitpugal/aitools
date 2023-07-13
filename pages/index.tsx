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

export default function Home({ categories, tools }) {
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
            <InputGroup minW={['250px', '250px', '350px']}>
              <Input placeholder="Search" />
              <InputRightElement>
                <IconButton
                  aria-label="Search"
                  icon={<SearchIcon />}
                  bg="lightblue"
                />
              </InputRightElement>
            </InputGroup>
          </Stack>

          <Stack display={'flex'} textAlign={'start'} justify={'flex-start'} maxW={'5xl'} direction="row">
            <Box>
              {categories?.slice(0, 18)?.map((category) => (
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
            {tools?.map((tool) => (

              <Box mb={3} key={tool?.id} border="1px" _hover={{ border: '1px', borderColor: 'gray.500' }} borderColor={'gray.300'} backgroundColor={'yellow.200'} position="relative">
                <Box overflow="hidden">
                  <Link
                    aria-label="Tool Image"
                    data-splitbee-event="Premium Card Open"
                    data-splitbee-event-tool="Taplio"
                    href={`/tools/${tool?.slug ? tool?.slug : 'test'}`}
                  >
                    {/* Placeholder for image */}
                    <Image
                      src="/tools/taplio.webp" // Replace with the actual image path
                      alt="Tool Image"
                      width={500}
                      height={281}
                    />

                  </Link>
                  <Flex flexDir="column" justifyContent="end" width="full" height="fit-content">
                    <Box px={3} mb={12}>
                      <Flex justify="space-between" alignItems="center">
                        <Flex justify="center" alignItems="center" gap={2}>
                          <Link
                            aria-label="Tool Name"
                            data-splitbee-event="Premium Card Open"
                            data-splitbee-event-tool="Taplio"
                            href={`/tools/${tool?.slug ? tool?.slug : 'test'}`}
                          >
                            <Text my={3} fontSize="xl" fontWeight="bold" color="primary">
                              {tool?.name}
                            </Text>
                          </Link>
                        </Flex>
                      </Flex>
                      <Link
                        _hover={{ textDecoration: "none" }}
                        aria-label="Tool Description"
                        data-splitbee-event="Premium Card Open"
                        data-splitbee-event-tool="Taplio"
                        href={`/tools/${tool?.slug ? tool?.slug : 'test'}`}
                      >
                        <Text fontSize="sm" noOfLines={3}>
                          {tool?.description}
                        </Text>
                      </Link>
                    </Box>
                    <Box position="absolute" bottom="0" width="full">
                      <Box display={'flex'} justifyContent={'space-between'} position="absolute" bottom="0" left="0" right="0" px={3} mb={3}>
                        <Link href="/ai-social-media-assistant">
                          <Badge
                            bg="blue.400"
                            color="white"
                            fontSize="11px"
                            mt={2}
                            py={1}
                            px={2}
                            // colorScheme='blue'
                            rounded="md"
                          // breakWord="keep-all"
                          >
                            Social Media Assistant
                          </Badge>
                        </Link>
                        <Badge
                          bg="blue.400"
                          color="white"
                          fontSize="11px"
                          mt={2}
                          px={2}
                          py={1}
                          // colorScheme='blue'
                          rounded="md"
                        // breakWord="keep-all"
                        >
                          Freemium
                        </Badge>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Box>

        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch('http://api.aitoolsnext.com/getCategories');
  const categories = await response.json();


  const toolsResponse = await fetch('http://api.aitoolsnext.com/getTopTools');
  const topTools = await toolsResponse.json();
  const tools = topTools?.tools ? topTools.tools : [];

  return {
    props: {
      categories,
      tools
    },
  };
}
