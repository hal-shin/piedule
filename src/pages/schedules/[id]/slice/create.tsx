import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { createSliceInput } from '@/types/slice';
import { api } from '@/utils/api';

const COLOR_SUGGESTIONS = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
];

type CreateSliceSchema = z.infer<typeof createSliceInput>;

export default function Create() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CreateSliceSchema>({
    resolver: zodResolver(createSliceInput),
  });
  const createSlice = api.slice.create.useMutation();

  console.log('errors:', errors);

  const onSubmit = (data: CreateSliceSchema) => {
    console.log('Data:', data);
    createSlice.mutate(
      { ...data, pieId: router.query.id as string },
      {
        onSuccess: () => {
          void router.push('/schedules');
        },

        onError: () => {
          alert('Unable to create time slice!');
        },
      },
    );
  };

  return (
    <Container>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        variant="ghost"
        my={4}
      >
        Go Back
      </Button>
      <Heading size="lg" mb={4}>
        Create New Time Slice
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems="flex-start">
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel htmlFor="name">Title</FormLabel>
            <Input
              id="name"
              placeholder="E.g. Studying"
              {...register('name', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.start)}>
            <FormLabel htmlFor="name">Start Time</FormLabel>
            <Input
              id="start"
              type="time"
              placeholder="start"
              defaultValue="08:00"
              {...register('start', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>{errors.start?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.end)}>
            <FormLabel htmlFor="name">End Time</FormLabel>
            <Input
              id="end"
              type="time"
              placeholder="end"
              defaultValue="10:00"
              {...register('end', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })}
            />
            <FormErrorMessage>{errors.end?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="color">Color</FormLabel>
            <Input id="color" {...register('color')} type="color" />
            <Flex flexWrap="wrap">
              {COLOR_SUGGESTIONS.map((color) => (
                <Box
                  cursor="pointer"
                  width="54px"
                  height="54px"
                  bgColor={color}
                  onClick={() => setValue('color', color)}
                />
              ))}
            </Flex>
          </FormControl>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
