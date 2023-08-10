import React from 'react'
import Image from 'next/image';

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

const CardList = ({tools}) => {
  return (
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

              <Box sx={{
                borderRadius: "20px",
                overflow: "hidden",
                transition: 'transform 0.3s, boxShadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                },
              }} mb={3} key={tool?.id} border="1px" _hover={{ border: '1px', borderColor: 'gray.500' }} borderColor={'gray.300'} backgroundColor={'blue.100'}  position="relative">
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
                      className='images'
                    />

                  </Link>
                  <Flex flexDir="column"   justifyContent="end" width="full" height="fit-content">
                    <Box  px={3} mb={12}>
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
                    <Box position="absolute" bottom="0"  width="full">
                      <Box display={'flex'} justifyContent={'space-start'} gap={2} position="absolute" bottom="0" left="0" right="0" px={3} mb={3}>
                        <Link href="/ai-social-media-assistant">
                          <Badge
                            bg="blue.500"
                            color="white"
                            fontSize="11px"
                            mt={2}
                            py={2}
                            px={4}
                            // colorScheme='blue'
                            rounded="md"
                          // breakWord="keep-all"
                          >
                            Social Media Assistant
                          </Badge>
                        </Link>
                        <Badge
                          bg="blue.500"
                          color="white"
                          fontSize="11px"
                          mt={2}
                          px={3}
                          py={2}
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
  )
}

export default CardList