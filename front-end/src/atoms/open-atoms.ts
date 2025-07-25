import { openAtom } from "@mongez/react-atom";

/***
 * Atom to open the create media model
 */
export const openCreateMediaModelAtom = openAtom(
  "open-create-media-model-atom"
);

/***
 * Atom to open the edit media model
 */
export const openEditMediaModelAtom = openAtom("open-edit-media-model-atom");

/***
 * Atom to open the delete confirm modal
 */
export const openDeleteConfirmModalAtom = openAtom(
  "open-delete-confirm-modal-atom"
);
