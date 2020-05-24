import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { StaticKitProvider } from '@statickit/react';

// Styles
import '../assets/styles/global.css';

// Components
import { Nav } from '../components/Nav';
import { Form } from '../components/Form';
import { Footer } from '../components/Footer';

const HomePage = () => {
  return (
    <Box minHeight="100vh" w="100%">
      <StaticKitProvider site="be233dcfc478">
        <Nav />
      </StaticKitProvider>
      <Box m="0 auto" maxWidth="612px" pt={32} width="100%">
        <Box alignItems="baseline" d="flex" mb={8}>
          <Text as="h2" fontSize="4xl" fontWeight={600}>
            Welcome to Faucy!
          </Text>
        </Box>
        <Form />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
