import {
  DialogBody,
  DialogHeader,
  Dialog,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { updateDoc, doc, db, auth } from "../config/firebase.config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function EditNotesModalComp({
  open,
  handleOpen,
  selectedNoteDescription,
  selectedNoteId,
  selectedNoteTitle,
  selectedNoteLink,
}) {
  const [changeNoteTitle, setChangeNoteTitle] = useState(selectedNoteTitle);
  const [changeNoteDescription, setChangeNoteDescription] = useState(
    selectedNoteDescription
  );
  const [changeNoteLink, setchangeNoteLink] = useState(selectedNoteLink);

  useEffect(
    () => {
      setChangeNoteTitle(selectedNoteTitle);
      setChangeNoteDescription(selectedNoteDescription);
      setchangeNoteLink(selectedNoteLink);
    },
    [selectedNoteDescription],
    [selectedNoteLink],
    [selectedNoteTitle]
  );

  const handleEditNotes = async () => {
    try {
      const selectedNoteDocRef = doc(
        db,
        "usersNotes",
        auth.currentUser.uid,
        "notes",
        selectedNoteId
      );
      await updateDoc(selectedNoteDocRef, {
        noteTitle: changeNoteTitle,
        noteDescription: changeNoteDescription,
        noteLink: changeNoteLink,
      });
      handleOpen();
      toast.success("Product updated successfully.");
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center items-center">
          Add Your Notes Carefully.
        </DialogHeader>
        <DialogBody>
          <div className="w-full">
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              <div className="noteTitleDiv w-full">
                <Input
                  label="Title"
                  type="text"
                  size="lg"
                  value={changeNoteTitle}
                  onChange={(e) => setChangeNoteTitle(e.target.value)}
                />
              </div>
              <div className="noteTitleDiv w-full">
                <Input
                  label="Description"
                  type="text"
                  size="lg"
                  value={changeNoteDescription}
                  onChange={(e) => setChangeNoteDescription(e.target.value)}
                />
              </div>
              <div className="noteTitleDiv w-full">
                <Input
                  label="Note URL"
                  type="text"
                  size="lg"
                  value={changeNoteLink}
                  onChange={(e) => setchangeNoteLink(e.target.value)}
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleEditNotes}
            className="mr-1"
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditNotesModalComp;
