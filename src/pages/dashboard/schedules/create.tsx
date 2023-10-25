import { Button, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { createPieInput } from '@/types/pie';
import { api } from '@/utils/api';

type CreatePieSchema = z.infer<typeof createPieInput>;

export default function Create() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePieSchema>({
    resolver: zodResolver(createPieInput),
  });
  const createPie = api.pie.create.useMutation();

  const onSubmit = (data: CreatePieSchema) => {
    createPie.mutate(data, {
      onSuccess: () => {
        void router.push('/dashboard');
      },

      onError: () => {
        alert('Unable to create pie!');
      },
    });
  };

  return (
    <>
      <h1>Create New Schedule</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('name')} />
        <Text>{errors.name?.message}</Text>

        <Button type="submit" />
      </form>
    </>
  );
}