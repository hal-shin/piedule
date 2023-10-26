import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
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
import { createPieInput } from '@/types/pie';
import { api } from '@/utils/api';
import { convertStringToURLSlug } from '@/utils/format';

type CreatePieSchema = z.infer<typeof createPieInput>;

export default function Create() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePieSchema>({
    resolver: zodResolver(createPieInput),
  });
  const createPie = api.pie.create.useMutation();

  const onSubmit = (data: CreatePieSchema) => {
    createPie.mutate(
      {
        name: data.name.trim(),
        description: data.description,
      },
      {
        onSuccess: () => {
          void router.push('/schedules');
        },

        onError: () => {
          alert('Unable to create pie!');
        },
      },
    );
  };

  return (
    <Container maxW="container.sm">
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        variant="ghost"
        my={4}
      >
        Go Back
      </Button>
      <Heading size="lg" mb={4}>
        Create New Schedule
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems="flex-start">
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel htmlFor="name">Title</FormLabel>
            <Input
              id="name"
              placeholder="E.g. Monday"
              {...register('name', {
                required: 'This is required',
                minLength: {
                  value: 3,
                  message: 'Minimum length should be 3',
                },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.name)}>
            <FormLabel htmlFor="name">Description</FormLabel>
            <Input
              id="description"
              placeholder="Description"
              {...register('description')}
            />
            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
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
