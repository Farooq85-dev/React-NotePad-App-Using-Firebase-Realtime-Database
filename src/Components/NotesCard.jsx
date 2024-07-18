import {
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { PiNotepadLight } from "react-icons/pi";
import { formatDistanceToNow, parse } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";
import EditNotesModalComp from "./EditNotesModal";
import { auth, deleteDoc, doc, db } from "../config/firebase.config";
import { useState } from "react";
import toast from "react-hot-toast";

export function NotesCardComp({
  noteDescription,
  noteTitle,
  noteLink,
  createdAt,
  note,
  setUserNotes,
}) {
  const [open, setOpen] = useState(false);
  const [selectedNoteTitle, setSelectedNoteTitle] = useState("");
  const [selectedNoteDescription, setSelectedNoteDescription] = useState("");
  const [selectedNoteLink, setSelectedNoteLink] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Parse createdAt to Date object
  const parsedDate = parse(createdAt, "dd/MM/yyyy, HH:mm:ss", new Date());
  // Calculate time ago
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  const getHandleEditNote = (title, description, link, id) => {
    setSelectedNoteTitle(title);
    setSelectedNoteDescription(description);
    setSelectedNoteLink(link);
    setSelectedNoteId(id);
    setOpen(!open);
  };

  //Deleting Note
  const handleDeleteNote = async (noteId) => {
    try {
      const selectedNoteDocRef = doc(
        db,
        "usersNotes",
        auth.currentUser.uid,
        "notes",
        noteId
      );
      await deleteDoc(selectedNoteDocRef);
      toast.success("Note deleted successfully.");
    } catch (error) {
      toast.error("Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 ml-2 mr-2">
      <Card className="m-4 sm:w-full md:w-96">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <div className="flex justify-start items-center gap-2">
              <div className="flex justify-center items-center">
                <PiNotepadLight className="w-10 h-10" color="black" />
              </div>
              <div className="flex flex-col justify-center gap-0">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    {noteTitle}
                  </Typography>
                </div>
                <div>
                  <p className="mb-2 font-bold">{timeAgo}</p>
                </div>
              </div>
            </div>
            <div className="cursor-pointer">
              <div className="flex justify-center items-center gap-2">
                <div>
                  <MdOutlineModeEdit
                    onClick={() =>
                      getHandleEditNote(
                        note.noteTitle,
                        note.noteDescription,
                        note.noteLink,
                        note.id
                      )
                    }
                    color="black"
                    className="w-6 h-6 "
                  />
                </div>
                <div>
                  <AiOutlineDelete
                    onClick={() => handleDeleteNote(note.id)}
                    color="black"
                    className="w-6 h-6 "
                  />
                </div>
              </div>
            </div>
          </div>
          <Typography>{noteDescription}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a href={noteLink} target="_blank" className="inline-block">
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2"
            >
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardFooter>
      </Card>
      <div>
        <EditNotesModalComp
          selectedNoteDescription={selectedNoteDescription}
          selectedNoteId={selectedNoteId}
          selectedNoteTitle={selectedNoteTitle}
          selectedNoteLink={selectedNoteLink}
          open={open}
          handleOpen={getHandleEditNote}
        />
      </div>
    </div>
  );
}
