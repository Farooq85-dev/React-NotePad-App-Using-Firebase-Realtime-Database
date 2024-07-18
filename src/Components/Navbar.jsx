import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Badge,
  Avatar,
} from "@material-tailwind/react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { AddSettingsModalComp } from "./AddSettingsModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useUser } from "./Context/Store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiNotepadFill } from "react-icons/pi";
import FilteredNoteModalComp from "./FilteredNote";

export default function NavbarComp({ notesLength, userNotes }) {
  const [open, setOpen] = useState(false);
  const [openFilteredModal, setOpenFilteredModal] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpenFilteredModal = () =>
    setOpenFilteredModal(!openFilteredModal);
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState(null);
  const [searchNote, setSearchNote] = useState("");
  const [filteredNote, setFilteredNote] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user) {
      setUserImage(user.userImage);
      setLoading(false);
    } else {
      null;
    }
  }, [user]);

  const handleSearchNotes = () => {
    if (searchNote === "") {
      toast.error("Please eneter title");
      return;
    }

    if (userNotes.length === 0) {
      toast.error("No Notes Found.");
      return;
    }

    const filter = userNotes.filter(
      (children) => children.noteTitle === searchNote
    );

    {
      filter ? setFilteredNote(filter) : null;
    }
    handleOpenFilteredModal();
    console.log(filter);
  };
  //Show laoding
  if (loading) {
    return (
      <div className="loaderDiv">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar
        variant="gradient"
        color="blue-gray"
        fullWidth
        className="w-full from-blue-gray-900 to-blue-gray-800"
      >
        <div className="flex flex-wrap items-center justify-between text-white w-full">
          <Typography
            href="#"
            as="a"
            className="mr-4 ml-2 cursor-pointer tracking-wider"
          >
            NOTEPAD
          </Typography>
          <div className="ml-auto flex items-center gap-1 md:mr-4">
            <IconButton onClick={handleOpen} variant="text" color="white">
              <Cog6ToothIcon className="h-6 w-6" />
            </IconButton>
            <IconButton variant="text" color="white">
              <Badge content={notesLength}>
                <PiNotepadFill className="h-6 w-6" />
              </Badge>
            </IconButton>
            <Avatar src={user ? user.userImage : ""} size="md" />
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Enter title"
              className="pr-20"
              value={searchNote}
              onChange={(e) => setSearchNote(e.target.value)}
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <Button
              size="sm"
              color="white"
              className="!absolute right-1 top-1 rounded"
              onClick={handleSearchNotes}
            >
              Search
            </Button>
          </div>
        </div>
      </Navbar>
      <AddSettingsModalComp open={open} handleOpen={handleOpen} />
      <FilteredNoteModalComp
        filteredNote={filteredNote}
        open={openFilteredModal}
        handleOpen={handleOpenFilteredModal}
      />
    </div>
  );
}
