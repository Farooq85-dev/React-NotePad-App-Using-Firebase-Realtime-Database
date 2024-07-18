import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../config/firebase.config";
import toast from "react-hot-toast";
import { SiNotepadplusplus } from "react-icons/si";
import { useNavigate } from "react-router-dom";

export let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export let passwordRegex = /^\d{6,10}$/;

export default function SignupLoginFormPage() {
  const [type, setType] = useState("card");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const navigate = useNavigate();

  //Registering User
  const registerUser = async () => {
    if (signupEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signupEmail)) {
      toast.error("Invalid email.");
    } else if (signupPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signupPassword)) {
      toast.error("Invlaid password.");
    } else {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Signup successfully.");
          setSignupEmail("");
          setSignupPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already registerd. Please login!");
            return;
          }
          toast.error("Please try again");
        });
    }
  };

  //Signin User
  const signinUser = () => {
    if (signinEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signinEmail)) {
      toast.error("Invalid email.");
    } else if (signinPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signinPassword)) {
      toast.error("Invlaid password.");
    } else {
      signInWithEmailAndPassword(auth, signinEmail, signinPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          toast.success("Signin successfully.");
          navigate("/main");
          setSigninEmail("");
          setSigninPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error("Please try again.");
        });
    }
  };

  return (
    <div className="w-[100%] flex justify-center items-center h-screen">
      <Card className="sm:w-[60%] md:w-[30%] lg:w-[25%]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 w-full h-20 p-6 text-white flex justify-center items-center">
            {type === "card" ? (
              <SiNotepadplusplus className="h-20 w-20 text-white" />
            ) : (
              <SiNotepadplusplus className="h-20 w-20 text-white" />
            )}
          </div>
          <Typography variant="h5" color="white">
            NOTEPAD APP
          </Typography>
        </CardHeader>
        <CardBody className="w-full">
          <Tabs value={type}>
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                Signup
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                Signin
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="abc@mail.com"
                      value={signupEmail}
                      size="lg"
                      onChange={(e) => setSignupEmail(e.target.value)}
                      label="Email"
                    />
                  </div>
                  <div className="my-3">
                    <Input
                      placeholder=" ******* "
                      size="lg"
                      label="Password"
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                  </div>
                  <Button size="lg" onClick={registerUser}>
                    Signup
                  </Button>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <div className="w-full">
                    <Input
                      type="email"
                      size="lg"
                      label="Email"
                      placeholder="name@mail.com"
                      value={signinEmail}
                      onChange={(e) => setSigninEmail(e.target.value)}
                    />
                  </div>
                  <div className="my-1 w-full">
                    <Input
                      placeholder=" ******* "
                      label="Password"
                      size="lg"
                      type="password"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      containerProps={{ className: "mt-4" }}
                    />
                  </div>
                  <Button size="lg" onClick={signinUser}>
                    Signin
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
