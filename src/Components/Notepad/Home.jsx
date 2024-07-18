import NavbarComp from "../Navbar";
import { MdAdd } from "react-icons/md";
import { FloatButton, Result } from "antd";
import { AddNoteModalComp } from "../AddNotesModal";
import { useState, useEffect } from "react";
import { NotesCardComp } from "../NotesCard";
import { useUser } from "../Context/Store";
import "../../index.scss";

function HomePage() {
  const [open, setOpen] = useState(false);
  const [userNotes, setUserNotes] = useState([]);
  const [notesLength, setNotesLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(!open);
  const user = useUser();

  useEffect(() => {
    if (user) {
      setLoading(true)
      setUserNotes(user.allUserNotes);
      setNotesLength(user.allUserNotes.length);
      setLoading(false);
    } else {
      null;
    }
  }, [user]);

  // Show the loader
  if (loading) {
    return (
      <div className="loaderDiv">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="navbarComp">
        <NavbarComp userNotes={userNotes} notesLength={notesLength} />
      </div>
      <div className="notesCard">
        {userNotes.length === 0 ? (
          <Result
            status="500"
            title="500"
            subTitle="Sorry, You have not added the notes yet!"
          />
        ) : (
          userNotes.map((note, index) => {
            let { noteTitle, noteDescription, noteLink, createdAt } = note;
            return (
              <NotesCardComp
                key={index}
                noteTitle={noteTitle}
                noteLink={noteLink}
                note={note}
                setUserNotes={setUserNotes}
                createdAt={createdAt}
                noteDescription={noteDescription}
              />
            );
          })
        )}
      </div>
      <div>
        <AddNoteModalComp open={open} handleOpen={handleOpen} />
        <FloatButton
          onClick={handleOpen}
          tooltip={<div>Add Notes</div>}
          icon={<MdAdd />}
        />
      </div>
    </div>
  );
}

export default HomePage;
