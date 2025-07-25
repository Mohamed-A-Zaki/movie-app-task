import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { openCreateMediaModelAtom } from "@/atoms/open-atoms";
import { entryFormSchema, type EntryFormData } from "@/schemas";
import { entriesAtom } from "@/atoms/entries-atom";
import { useState } from "react";

export function CreateEntryModal() {
  const isOpened = openCreateMediaModelAtom.useOpened();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EntryFormData>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      title: "",
      type: "movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
    },
  });

  const onSubmit = async (data: EntryFormData) => {
    setIsLoading(true);
    await entriesAtom.createEntry(data);
    setIsLoading(false);
    reset();
  };

  return (
    <Dialog
      open={isOpened}
      onOpenChange={() => openCreateMediaModelAtom.toggle()}
    >
      <DialogContent>
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-semibold">
            Add New Entry
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter title..."
                {...register("title")}
                className={
                  errors.title
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.title && (
                <p className="text-destructive text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                onValueChange={(value: "movie" | "tv_show") =>
                  setValue("type", value)
                }
                defaultValue="Movie"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv_show">TV Show</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && (
                <p className="text-destructive text-sm">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Director */}
            <div className="space-y-2">
              <Label htmlFor="director">Director *</Label>
              <Input
                id="director"
                placeholder="Enter director..."
                {...register("director")}
                className={
                  errors.director
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.director && (
                <p className="text-destructive text-sm">
                  {errors.director.message}
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                placeholder="e.g., $100 million"
                {...register("budget")}
                className={
                  errors.budget
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.budget && (
                <p className="text-destructive text-sm">
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Filming location..."
                {...register("location")}
                className={
                  errors.location
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.location && (
                <p className="text-destructive text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                placeholder="e.g., 120 min or 5 seasons"
                {...register("duration")}
                className={
                  errors.duration
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.duration && (
                <p className="text-destructive text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Year/Time */}
            <div className="space-y-2">
              <Label htmlFor="yearTime">Year/Time *</Label>
              <Input
                id="yearTime"
                placeholder="e.g., 2023 or 2020-2025"
                {...register("year")}
                className={
                  errors.year
                    ? "border-destructive focus:border-destructive"
                    : ""
                }
              />
              {errors.year && (
                <p className="text-destructive text-sm">
                  {errors.year.message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                openCreateMediaModelAtom.close();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
