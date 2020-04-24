import React from 'react';
import { Box, Text } from '@chakra-ui/core';

// Components
import { SEO } from '../ui/components/Seo';

const NotFoundPage = () => (
  <Box alignItems="center" d="flex" height="100vh" justifyContent="center" p={4} w="100%">
    <SEO title="404: Not found" />
    <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </Box>
);

export default NotFoundPage;
