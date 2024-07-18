import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Progress,
} from "@material-tailwind/react";
import {
  auth,
  signOut,
  updatePassword,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  setDoc,
  db,
  doc,
} from "../config/firebase.config.js";
import UploaderComp from "./Uplaod";
import toast from "react-hot-toast";
import { passwordRegex } from "./SignupLogin/Signup.jsx";

export function AddSettingsModalComp({ open, handleOpen }) {
  const [newPassword, setNewPassword] = useState("");
  const [file, setFile] = useState();
  const [userImageURL, setUserImageURL] = useState(null);
  const [progress, setProgress] = useState(0);

  //Giving file to uploader
  const handleFile = (file) => {
    setFile(file);
    console.log(file);
  };

  //Updating Password
  const userUpdatePassword = async () => {
    if (newPassword === "") {
      toast.error("Please provide a new password.");
      return;
    } else if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be only numbers with a length of 6 to 10.");
      return;
    }
    try {
      await updatePassword(auth.currentUser, newPassword);
      handleOpen();
      toast.success("Password updated successfully.");
      setNewPassword("");
    } catch (error) {
      toast.error("Please try agian.");
    }
  };

  //Signout
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        handleOpen();
        toast.success("Signout Successfully.");
      })
      .catch((error) => {
        toast.success("Please try again.");
      });
  };

  const uploadFile = async (file) => {
    const fileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!file) {
      toast.error("No file uploaded.");
      return;
    }
    if (file.size > 1048576) {
      toast.error("Picture must be less than 1MB.");
      return;
    }

    if (!fileTypes.includes(file.type)) {
      toast.error("Invalid Format. Please select JPG, JPEG, or PNG.");
      return;
    }

    const storageRef = ref(storage, `usersImages/${auth.currentUser.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            console.log(`Upload is ${progress}% done`);
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
        switch (error.code) {
          case "storage/unauthorized":
            toast.error("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            toast.error("User canceled the upload");
            break;
          case "storage/unknown":
            toast.error("Unknown error occurred. Please try again.");
            break;
        }
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);

          // More detailed logging around Firestore document setting
          console.log("Attempting to set document in Firestore");

          await setDoc(doc(db, "usersImages", auth.currentUser.uid), {
            downloadURL,
          });

          console.log("Document successfully set in Firestore");
          handleOpen();
          toast.success("Your picture has been uploaded successfully.");
        } catch (error) {
          console.error("Error saving URL to Firestore:", error);
          toast.error(
            "An error occurred while getting the download URL. Please try again."
          );
        }
      }
    );
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
              <div className="flex flex-col justify-center items-center gap-2 w-full">
                <div>
                  <UploaderComp onFileUpload={handleFile} />
                </div>
                <div className="w-full">
                  {progress > 0 ? (
                    <Progress value={progress} size="md" label="completed" />
                  ) : (
                    <p className="text-center font-bold">
                      You can also drag and drop here.
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <Button
                  variant="gradient"
                  color="black"
                  onClick={() => {
                    uploadFile(file);
                  }}
                  className="mr-1"
                >
                  <span>Uplaod</span>
                </Button>
              </div>
              <div className="noteTitleDiv w-full">
                <Input
                  label="Provide Password"
                  type="password"
                  size="lg"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Button
                  variant="gradient"
                  color="black"
                  onClick={userUpdatePassword}
                  className="mr-1"
                >
                  <span>Update Password</span>
                </Button>
              </div>
              <div className="w-full">
                <Button
                  variant="gradient"
                  color="red"
                  onClick={handleSignout}
                  className="mr-1"
                >
                  <span>Signout</span>
                </Button>
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
        </DialogFooter>
      </Dialog>
    </>
  );
}
