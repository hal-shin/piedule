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
import { updatePieInput } from '@/types/pie';
import { api } from '@/utils/api';

type UpdatePieSchema = z.infer<typeof updatePieInput>;

export default function Edit() {
  const router = useRouter();
  const { id, name, description } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePieSchema>({
    defaultValues: {
      name: (name as string) || '',
      description: (description as string) || '',
    },
    resolver: zodResolver(updatePieInput),
  });
  const updatePie = api.pie.update.useMutation();

  const onSubmit = (data: UpdatePieSchema) => {
    updatePie.mutate(
      {
        id: id as string,
        name: data.name.trim(),
        description: data.description?.trim(),
      },
      {
        onSuccess: (successData) => {
          console.log('successData:', successData);
          void router.push({
            pathname: '/schedules',
            query: {
              slug: successData.slug,
            },
          });
        },

        onError: () => {
          alert('Unable to update pie!');
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
        Update Schedule
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
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
}
