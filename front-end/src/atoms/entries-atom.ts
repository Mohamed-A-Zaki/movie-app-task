import { endPoint } from "@/api/end-point";
import type { EntryFormData } from "@/schemas";
import type { Entry, GetAllEntriesResponse } from "@/types";
import { atom } from "@mongez/react-atom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  openCreateMediaModelAtom,
  openDeleteConfirmModalAtom,
  openEditMediaModelAtom,
} from "./open-atoms";

interface EntriesAtomActions {
  /**
   * Action to get all entries
   * @returns
   */
  getAllEntries: (page?: number) => void;

  /**
   * Action to create an entry
   * @param entryFormData
   * @returns
   */
  createEntry: (entryFormData: EntryFormData) => void;

  /**
   * Action to update an entry
   * @param id
   * @param entryFormData
   * @returns
   */
  updateEntry: (id: string, entryFormData: EntryFormData) => void;

  /**
   * Action to delete an entry
   * @param id
   * @returns
   */
  deleteEntry: (id: string) => void;

  /**
   * Action to get an entry
   * @param id
   * @returns
   */
  getEntry: (id: string) => void;
}

interface EntriesAtom {
  /***
   * Loading state
   */
  isLoading: boolean;

  /**
   * Entries
   */
  entries: Entry[];

  /**
   * Selected entry
   */
  entry: Entry | null;

  /**
   * Error
   */
  error: string;

  /**
   * Number of pages
   */
  numberOfPages: number;

  /**
   * Current page
   */
  currentPage: number;
}

export const entriesAtom = atom<EntriesAtom, EntriesAtomActions>({
  key: "entries-atom",
  default: {
    isLoading: false,
    entries: [],
    entry: null,
    error: "",
    numberOfPages: 0,
    currentPage: 1,
  },

  actions: {
    /**
     * Action to get all entries
     */
    async getAllEntries(page?: number) {
      try {
        entriesAtom.change("error", "");
        entriesAtom.change("isLoading", true);
        const { data } = await endPoint.get<GetAllEntriesResponse>("/entries", {
          params: {
            page: page || 1,
          },
        });
        if ((page || 1) === 1) {
          // First page, replace entries
          entriesAtom.change("entries", data.data);
        } else {
          // Append new entries for infinite scroll
          const currentEntries = entriesAtom.get("entries");
          // Avoid duplicates if the same page is fetched twice
          const newEntries = data.data.filter(
            (entry: Entry) =>
              !currentEntries.some((e: Entry) => e._id === entry._id)
          );
          entriesAtom.change("entries", [...currentEntries, ...newEntries]);
        }
        entriesAtom.change("numberOfPages", data.totalPages);
      } catch (error) {
        entriesAtom.change("error", String(error));
      } finally {
        entriesAtom.change("isLoading", false);
      }
    },

    /**
     *
     * Action to get an entry
     * @param id
     */
    async getEntry(id: string) {
      try {
        const { data } = await endPoint.get<Entry>(`/entries/${id}`);
        entriesAtom.change("entry", data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error((error as Error).message);
        }
      }
    },

    /**
     *
     * Action to delete an entry
     * @param id
     */
    async deleteEntry(id: string) {
      try {
        await endPoint.delete(`/entries/${id}`);
        toast.success("Entry deleted successfully");
        entriesAtom.reset();
        entriesAtom.getAllEntries(entriesAtom.get("currentPage"));
        openDeleteConfirmModalAtom.close();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error((error as Error).message);
        }
      }
    },

    /**
     *
     * Action to create an entry
     * @param entryFormData
     */
    async createEntry(entryFormData: EntryFormData) {
      try {
        await endPoint.post("/entries", entryFormData);
        toast.success("Entry created successfully");
        entriesAtom.reset();
        entriesAtom.getAllEntries(entriesAtom.get("currentPage"));
        openCreateMediaModelAtom.close();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error((error as Error).message);
        }
      }
    },

    /**
     *
     * Action to update an entry
     * @param id
     * @param entryFormData
     */
    async updateEntry(id: string, entryFormData: EntryFormData) {
      try {
        await endPoint.put(`/entries/${id}`, entryFormData);
        toast.success("Entry updated successfully");
        entriesAtom.reset();
        entriesAtom.getAllEntries(entriesAtom.get("currentPage"));
        openEditMediaModelAtom.close();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        } else {
          toast.error((error as Error).message);
        }
      }
    },
  },
});
