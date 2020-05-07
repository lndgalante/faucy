import React, { useState, useRef } from 'react';
import { Box, Button, PseudoBox, Textarea, Text, useColorMode } from '@chakra-ui/core';
import { FaComment } from 'react-icons/fa';
import useOnClickOutside from 'use-onclickoutside';

const emojis = [
  { id: 'stars', value: '🤩' },
  { id: 'happy', value: '😃' },
  { id: 'confused', value: '😕' },
  { id: 'sad', value: '😢' },
];

const Emoji = ({ colorMode, id, emoji, selected, onEmojiClick }) => (
  <PseudoBox
    _hover={{ transform: 'scale(1.08)' }}
    alignItems="center"
    borderColor={selected ? '#319795' : colorMode === 'light' ? 'gray.300' : 'gray.400'}
    borderRadius="50%"
    borderWidth="1px"
    cursor="pointer"
    d="inline-flex"
    fontSize={'lg'}
    height="31px"
    justifyContent="center"
    mr={2}
    transform={selected ? 'scale(1.08)' : ''}
    transformOrigin="center center"
    transition="all .2s cubic-bezier(.5,-1,.5,2)"
    width="31px"
    willChange="transform"
    onClick={() => onEmojiClick(id)}
  >
    <Box d="inline-block" height="25px" width="18px">
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
          key={emoji.id}
          colorMode={colorMode}
          emoji={emoji.value}
          id={emoji.id}
          selected={selectedEmoji === emoji.id}
          onEmojiClick={handleEmojiClick}
        />
      ))}
    </Box>
  );
};

export const Feedback = () => {
  // react hooks
  const ref = useRef(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // chakra hooks
  const { colorMode } = useColorMode();

  // handlers
  useOnClickOutside(ref, () => setIsFeedbackOpen(false));

  return (
    <Box position="relative">
      <Button
        _focus={{ boxShadow: 'none' }}
        fontSize="sm"
        fontWeight={400}
        variant="ghost"
        onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
      >
        Feedback <Box as={FaComment} d="inline" ml={2} size="14px" />
      </Button>
      <Box
        ref={ref}
        bg={colorMode === 'light' ? 'white' : '#3d434c'}
        borderRadius="md"
        boxShadow="xl"
        d={isFeedbackOpen ? 'block' : 'none'}
        pb={1}
        position="absolute"
        pt={2}
        px={2}
        right={'0'}
        top={'0'}
        width="339px"
      >
        <Text fontSize="sm" mb={2} textTransform="uppercase">
          Feedback
        </Text>
        <Textarea
          _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
          borderRadius="md"
          height="124px"
          placeholder="Your feedback..."
          resize={'none'}
          size="sm"
        />
        <Box alignItems="center" d="flex" px={1} py={3}>
          <EmojiPalette colorMode={colorMode} />
          <Button size="sm" onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
