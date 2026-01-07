import { Dialog, Portal, Button, CloseButton, Text } from "@chakra-ui/react";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

interface DeleteProps {
  id: number;
  onDelete: (id: number) => void;
}

const Delete = ({ id, onDelete }: DeleteProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(id);
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      role="alertdialog"
      size="sm"
    >
      <Dialog.Trigger asChild>
        <Trash2Icon cursor="pointer" />
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete link</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to delete this link? This action cannot be
                undone.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Trigger asChild>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Dialog.Trigger>
              <Button colorPalette="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Delete;
