import React from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/core';
import { StaticKitProvider } from '@statickit/react';

// styles
import '../assets/styles/global.css';

// components
import { Nav } from '../components/Nav';
import { Form } from '../components/Form';
import { Footer } from '../components/Footer';

// hooks
import { useAnimatedLogo } from '../hooks/useAnimatedLogo';

const HomePage = () => {
  // Chakra hooks
  const { colorMode } = useColorMode();

  // Animation hooks
  const { boxContainerRef, animationContainerRef, logoAnimation } = useAnimatedLogo(colorMode);

  return (
    <Box minHeight="100vh" w="100%">
      <StaticKitProvider site="be233dcfc478">
        <Nav animationRef={animationContainerRef} boxRef={boxContainerRef} />
      </StaticKitProvider>
      <Box m="0 auto" maxWidth="612px" pt={32} width="100%">
        <Box alignItems="baseline" d="flex" mb={8}>
          <Text as="h2" fontSize="4xl" fontWeight={600}>
            Welcome to Faucy!
          </Text>
        </Box>
        <Form logoAnimation={logoAnimation} />
      </Box>
      <Footer />
    </Box>
  );
};

export default HomePage;
