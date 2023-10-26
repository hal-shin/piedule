import { EditIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Pie, Slice } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

interface EditSliceButtonProps {
  slice: Slice;
  pie: Pie;
}

export const EditSliceButton = ({ pie, slice }: EditSliceButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    console.log('Going to:', `/schedules/${pie.slug}/slices/edit`);
    void router.push({
      pathname: `/schedules/${pie.slug}/slices/edit/`,
      query: {
        sliceId: slice.id,
        name: slice.name,
        start: slice.start,
        end: slice.end,
        color: slice.color,
      },
    });
  };

  return (
    <IconButton
      aria-label="Edit event"
      icon={<EditIcon />}
      variant="ghost"
      size="sm"
      fontSize="18px"
      _hover={{
        color: 'green',
      }}
      onClick={handleClick}
    />
  );
};
