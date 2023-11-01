import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
} from '@chakra-ui/react';
import { Pie } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { api } from '@/utils/api';

const BUTTON_SIZE: ButtonProps['size'] = 'md';

interface DeleteClockButtonProps {
  pie: Pie;
}

export const DeleteClockButton = ({ pie }: DeleteClockButtonProps) => {
  const router = useRouter();
  const utils = api.useUtils();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deletePie = api.pie.delete.useMutation({
    onSuccess: () => {
      void utils.pie.getAll.invalidate();
    },
  });

  const handleConfirm = () => {
    deletePie.mutate({ id: pie.id });
    router.push('/schedules');
    onClose();
  };

  return (
    <div>
      <Button
        onClick={onOpen}
        colorScheme="red"
        variant="solid"
        leftIcon={<DeleteIcon />}
        size={BUTTON_SIZE}
      >
        Delete Schedule
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Time Slice
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};
