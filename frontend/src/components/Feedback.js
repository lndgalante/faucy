import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, Button, PseudoBox, Textarea, RadioGroup, Radio, FormControl, useColorMode } from '@chakra-ui/core';
import useOnClickOutside from 'use-onclickoutside';
import { useForm } from '@statickit/react';

const emojis = [
  { id: 'stars', value: '🤩' },
  { id: 'happy', value: '😃' },
  { id: 'confused', value: '😕' },
  { id: 'sad', value: '😢' },
];

const Emoji = ({ colorMode, emoji, selected }) => (
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
  >
    <Box d="inline-block" height="25px" width="18px">
      {emoji}
    </Box>
  </PseudoBox>
);

const EmojiPalette = ({ colorMode }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = ({ target }) => setSelectedEmoji(target.value);

  return (
    <Box flex="1">
      <RadioGroup
        d="inline-flex"
        defaultValue="Itachi"
        name="emotion"
        value={selectedEmoji}
        onChange={handleEmojiClick}
      >
        {emojis.map((emoji) => (
          <Radio key={emoji.id} value={emoji.value}>
            <Emoji colorMode={colorMode} emoji={emoji.value} selected={selectedEmoji === emoji.value} />
          </Radio>
        ))}
      </RadioGroup>
    </Box>
  );
};

export const Feedback = ({ setIsFeedbackOpen }) => {
  // react hooks
  const ref = useRef(null);

  // chakra hooks
  const { colorMode } = useColorMode();

  // statickit hooks
  const [state, handleSubmit] = useForm('feedbackForm');

  // handlers
  useOnClickOutside(ref, () => setIsFeedbackOpen(false));

  useEffect(() => {
    if (state.succeeded === true) {
      setTimeout(() => setIsFeedbackOpen(false), 1000);
    }
  }, [state, state.succeeded, setIsFeedbackOpen]);

  return (
    <Box
      ref={ref}
      bg={colorMode === 'light' ? 'white' : '#3d434c'}
      borderRadius="md"
      bottom={'0'}
      boxShadow="xl"
      d={'block'}
      pb={1}
      position="absolute"
      pt={2}
      px={2}
      right={'0'}
      width="339px"
    >
      <Box position="relative">
        {state.succeeded === true && (
          <Box
            alignItems="center"
            bg={colorMode === 'light' ? 'white' : '#3d434c'}
            d="flex"
            flexDirection="row"
            height="100%"
            justifyContent="center"
            position="absolute"
            width="100%"
            zIndex={10}
          >
            <Text fontSize="md">Thanks for your feedback!</Text>
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <Text fontSize="sm" mb={2} textTransform="uppercase">
            Feedback
          </Text>

          <FormControl isInvalid={state.errors.map(({ field }) => field).includes('feedback')}>
            <Textarea
              _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
              borderRadius="md"
              height="124px"
              name="feedback"
              placeholder="Your feedback..."
              resize={'none'}
              size="sm"
            />
          </FormControl>
          <Box alignItems="flex-end" d="flex" px={1} py={3}>
            <EmojiPalette colorMode={colorMode} />
            <Button isLoading={state.submitting === true} size="sm" type="submit">
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
