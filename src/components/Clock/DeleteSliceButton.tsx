import { DeleteIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { type Slice } from '@prisma/client';
import React, { useRef } from 'react';
import { api } from '@/utils/api';

interface DeleteSliceButtonProps {
  slice: Slice;
}

export const DeleteSliceButton = ({ slice }: DeleteSliceButtonProps) => {
  const utils = api.useUtils();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteSlice = api.slice.delete.useMutation({
    onSuccess: () => {
      void utils.slice.getAll.invalidate();
    },
  });

  const handleConfirm = () => {
    deleteSlice.mutate({ sliceId: slice.id });
    onClose();
  };

  return (
    <div>
      <IconButton
        aria-label="Delete event"
        onClick={onOpen}
        icon={<DeleteIcon />}
        variant="ghost"
        size="sm"
        fontSize="18px"
        _hover={{
          color: 'red',
        }}
      />
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
              Are you sure? You can&apos;t undo this action afterwards.
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
