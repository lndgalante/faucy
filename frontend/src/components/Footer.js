import React, { useState, useRef } from 'react';
import { Box, Link, Button, PseudoBox, Textarea, Text } from '@chakra-ui/core';
import { FaGithub, FaHeart } from 'react-icons/fa';
import useOnClickOutside from 'use-onclickoutside';

const emojis = [
  { id: 'stars', value: '🤩' },
  { id: 'happy', value: '😃' },
  { id: 'confused', value: '😕' },
  { id: 'sad', value: '😢' },
];

const Emoji = ({ colorMode, id, emoji, selected, onEmojiClick }) => (
  <PseudoBox
    fontSize={'lg'}
    willChange="transform"
    transition="all .2s cubic-bezier(.5,-1,.5,2)"
    borderRadius="50%"
    borderWidth="1px"
    width="31px"
    height="31px"
    d="inline-flex"
    justifyContent="center"
    alignItems="center"
    cursor="pointer"
    mr={2}
    borderColor={selected ? '#319795' : colorMode === 'light' ? 'gray.300' : 'gray.400'}
    transformOrigin="center center"
    _hover={{ transform: 'scale(1.08)' }}
    onClick={() => onEmojiClick(id)}
    transform={selected ? 'scale(1.08)' : ''}
  >
    <Box d="inline-block" width="18px" height="25px">
      {emoji}
    </Box>
  </PseudoBox>
);

const EmojiPalette = ({ colorMode }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const handleEmojiClick = (emojiId) => setSelectedEmoji(emojiId);

  return (
    <Box flex="1">
      {emojis.map((emoji) => (
        <Emoji
          colorMode={colorMode}
          key={emoji.id}
          id={emoji.id}
          emoji={emoji.value}
          selected={selectedEmoji === emoji.id}
          onEmojiClick={handleEmojiClick}
        ></Emoji>
      ))}
    </Box>
  );
};

export const Footer = ({ colorMode }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsFeedbackOpen(false));

  return (
    <Box
      alignItems="center"
      bottom={2}
      color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
      d="flex"
      justifyContent="space-between"
      maxWidth={['100%', '100%', '606px']}
      position="absolute"
      px={[4, 4, 0, 0]}
      width="100%"
    >
      <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://www.xivis.com'}>
        Made by Xivis <Box as={FaHeart} d="inline" ml={2} size="14px" />
      </Link>
      <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://github.com/lndgalante/faucy'}>
        GitHub <Box as={FaGithub} d="inline" ml={2} size="14px" />
      </Link>
      <Box position="relative">
        <Button
          fontWeight={500}
          fontSize="md"
          variant="ghost"
          onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
          _focus={{ boxShadow: 'none' }}
        >
          Feedback
        </Button>
        <Box
          ref={ref}
          position="absolute"
          bottom={'0'}
          right={'0'}
          width="339px"
          d={isFeedbackOpen ? 'block' : 'none'}
          borderRadius="md"
          boxShadow="xl"
          pb={1}
          pt={2}
          px={2}
          bg={colorMode === 'light' ? 'white' : 'gray.700'}
        >
          <Text mb={2} fontSize="sm" textTransform="uppercase">
            Feedback
          </Text>
          <Textarea
            height="124px"
            placeholder="Your feedback..."
            size="sm"
            borderRadius="md"
            resize={'none'}
            _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
          />
          <Box d="flex" alignItems="center" px={1} py={3}>
            <EmojiPalette colorMode={colorMode} />
            <Button size="sm" onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
