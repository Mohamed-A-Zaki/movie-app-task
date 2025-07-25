import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { openDeleteConfirmModalAtom } from "@/atoms/open-atoms";
import { useEffect, useState } from "react";
import { selectedEntryAtom } from "@/atoms/selected-entry-atom";
import { entriesAtom } from "@/atoms/entries-atom";

export function DeleteConfirmModal() {
  const isOpen = openDeleteConfirmModalAtom.useOpened();

  const { selectedEntry } = selectedEntryAtom.useValue();

  const { entry } = entriesAtom.useValue();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedEntry) {
      entriesAtom.getEntry(selectedEntry);
    }
  }, [selectedEntry]);

  const handleDeleteEntry = async () => {
    if (selectedEntry) {
      setIsLoading(true);
      await entriesAtom.deleteEntry(selectedEntry);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={openDeleteConfirmModalAtom.toggle}>
      <DialogContent>
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-xl font-semibold text-center">
            Delete Entry
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2 text-center">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              "{entry?.title}"
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            onClick={openDeleteConfirmModalAtom.close}
            className="cursor-pointer px-6"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteEntry}
            className="cursor-pointer px-6"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
