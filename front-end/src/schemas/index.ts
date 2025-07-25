import { z } from "zod";

export const entryFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["movie", "tv_show"]),
  director: z.string().min(1, "Director is required"),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  year: z.string().min(1, "Year/Time is required"),
});

export type EntryFormData = z.infer<typeof entryFormSchema>;
