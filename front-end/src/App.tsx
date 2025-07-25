import { Film, Plus } from "lucide-react";
import { Button } from "./components/ui/button";
import MediaTable from "./components/media-table";
import { openCreateMediaModelAtom } from "./atoms/open-atoms";
import { EditEntryModal } from "./components/edit-entry-modal";
import { DeleteConfirmModal } from "./components/delete-confirm-modal";
import { CreateEntryModal } from "./components/create-entry-modal";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary rounded-lg shadow-elegant-sm">
                <Film className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                FlickList Zen
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Manage your favorite movies and TV shows
            </p>
          </div>

          {/* Add Button */}
          <div className="mb-6">
            <Button
              className="cursor-pointer"
              onClick={openCreateMediaModelAtom.open}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Entry
            </Button>
          </div>
        </div>

        {/* Table */}
        <MediaTable />

        {/* Start Modals */}
        <CreateEntryModal />
        <EditEntryModal />
        <DeleteConfirmModal />
        {/* End Modals */}
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
