import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { addDoc, auth, db, collection } from "../config/firebase.config";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function AddNoteModalComp({ open, handleOpen }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [noteLink, setNoteLink] = useState("");
  const navigate = useNavigate();
  const urlPattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

  const handleAddNotes = async () => {
    if (noteTitle === "") {
      toast.error("Please enter title.");
      return;
    }
    if (noteDescription === "") {
      toast.error("Please enter description.");
      return;
    }
    if (noteLink === "") {
      toast.error("Please enter link.");
      return;
    }
    if (!urlPattern.test(noteLink)) {
      toast.error("Invalid URL.");
      return;
    }
    setLoading(true);
    try {
      const userNotesCollection = collection(
        db,
        `usersNotes/${auth.currentUser.uid}/notes`
      );
      const newNoteRef = await addDoc(userNotesCollection, {
        noteTitle,
        noteDescription,
        noteLink,
        createdAt: new Date().toLocaleString(),
      });
      setLoading(false);
      handleOpen();
      toast.success("Note added successfully.");
      setNoteTitle("");
      setNoteDescription("");
    } catch (error) {
      toast.error("Please try again.");
      console.error("Error adding note: ", error);
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        {loading ? (
          <div className="flex justify-center items-center mt-10 mb-10">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <DialogHeader className="flex justify-center items-center">
              Add Your Notes Carefully.
            </DialogHeader>
            <DialogBody>
              <div className="w-full">
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                  <div className="noteTitleDiv w-full">
                    <Input
                      label="Tilte"
                      size="lg"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>
                  <div className="noteDescriptionDiv w-full">
                    <Input
                      label="Description"
                      size="lg"
                      value={noteDescription}
                      onChange={(e) => setNoteDescription(e.target.value)}
                    />
                  </div>
                  <div className="noteDescriptionDiv w-full">
                    <Input
                      label="Note URL"
                      size="lg"
                      placeholder="https://www.freecodecamp.org/"
                      value={noteLink}
                      onChange={(e) => setNoteLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="gradient"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="black" onClick={handleAddNotes}>
                <span>Save</span>
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </>
  );
}
