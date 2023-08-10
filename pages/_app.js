// pages/_app.js
import { Box, ChakraProvider } from '@chakra-ui/react'

import { SessionProvider } from "next-auth/react"

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';


// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (<SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <Box sx={{ minH: "100vh", minW: "98vw", maxH: "fit-content", overflowX: "hidden", pb:"350px" }}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  </SessionProvider>

  )
}

export default MyApp