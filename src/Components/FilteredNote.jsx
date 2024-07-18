import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { PiNotepadLight } from "react-icons/pi";

function FilteredNoteModalComp({ open, handleOpen, filteredNote }) {
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex justify-center items-center">
          Search Notes.
        </DialogHeader>
        <DialogBody>
          <div className="w-full flex justify-center items-center">
            {filteredNote.length === 0 ? (
              <p className="text-xl text-center text-bold">No records found</p>
            ) : (
              <Card className="m-4 w-96">
                <CardBody>
                  <div className="flex justify-start items-center gap-2">
                    <div className="flex justify-center items-center">
                      <PiNotepadLight className="w-10 h-10" color="black" />
                    </div>
                    <div className="flex flex-col justify-center gap-0">
                      <div>
                        <Typography variant="h5" color="blue-gray">
                          {filteredNote[0].noteTitle}
                        </Typography>
                      </div>
                      <div>
                        <p className="mb-2 font-bold">
                          {filteredNote[0].createdAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Typography>{filteredNote[0].noteDescription}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <a
                    href={filteredNote[0].noteLink}
                    target="_blank"
                    className="inline-block"
                  >
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
            )}
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
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default FilteredNoteModalComp;
