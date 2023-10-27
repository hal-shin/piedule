import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
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
import { convertTimeToNum, validateSliceTime } from '@/utils/time';

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

export default function Edit() {
  // const utils = api.useUtils();
  const router = useRouter();
  const { sliceId, name, start, end, color } = router.query;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<CreateSliceSchema>({
    defaultValues: {
      name: (name as string) || '',
      start: (start as string) || '',
      end: (end as string) || '',
      color: (color as string) || '',
    },
    resolver: zodResolver(createSliceInput),
  });
  const pie = api.pie.getBySlug.useQuery(
    { slug: router.query.slug as string },
    {
      enabled: Boolean(router.query.slug),
    },
  );

  const updateSlice = api.slice.update.useMutation({
    // onSuccess: () => {
    //   void utils.slice.getAll.invalidate();
    // },
  });

  const onSubmit = (data: CreateSliceSchema) => {
    if (!pie.data) return;

    const slices = pie.data.slices.filter((slice) => slice.id !== sliceId);

    if (convertTimeToNum(data.start) > convertTimeToNum(data.end)) {
      setError('end', { message: 'End time cannot be before start time.' });

      return;
    }

    if (data.start === data.end) {
      setError('start', {
        message: 'Start time and end time cannot be the same.',
      });
      setError('end', {
        message: 'Start time and end time cannot be the same.',
      });

      return;
    }

    const foundConflict = validateSliceTime(
      { start: data.start, end: data.end },
      slices,
    );

    if (foundConflict) {
      setError('start', {
        message: `Overlaps with event: "${foundConflict.name}" - ${foundConflict.start} to ${foundConflict.end}`,
      });
      setError('end', {
        message: `Overlaps with event: "${foundConflict.name}" - ${foundConflict.start} to ${foundConflict.end}`,
      });

      return;
    }

    updateSlice.mutate(
      { ...data, sliceId: sliceId as string },
      {
        onSuccess: () => {
          void router.push({
            pathname: '/schedules',
            query: {
              slug: router.query.slug as string,
            },
          });
        },

        onError: () => {
          alert('Unable to edit time slice!');
        },
      },
    );
  };

  if (pie.isLoading) return <CircularProgress />;

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
        Edit Time Slice
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
            <Input
              id="color"
              defaultValue="#003f5c"
              {...register('color')}
              type="color"
            />
            <HStack flexWrap="wrap" mt={2}>
              {COLOR_SUGGESTIONS.map((color) => (
                <Box
                  key={`color-${color}`}
                  cursor="pointer"
                  width="54px"
                  height="54px"
                  bgColor={color}
                  onClick={() => setValue('color', color)}
                />
              ))}
            </HStack>
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
