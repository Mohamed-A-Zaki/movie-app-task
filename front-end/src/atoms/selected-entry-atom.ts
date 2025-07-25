import { atom } from "@mongez/react-atom";

/***
 * Atom to store the selected entry id
 */
export const selectedEntryAtom = atom<{
  selectedEntry: string | null;
}>({
  key: "selected-entry-atom",
  default: {
    selectedEntry: null,
  },
});
