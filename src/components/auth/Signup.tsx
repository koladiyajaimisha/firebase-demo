import React, { MouseEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

interface SignupData {
  email: string;
  password: string;
  role: string;
}

export default function Signup() {
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const signup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");
    if (signupData.email && signupData.password) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(
        auth,
        signupData.email,
        signupData.password
      )
        .then(async (res) => {
          await addDoc(collection(db, "users"), {
            uid: res.user.uid,
            email: res.user.email,
            role: signupData.role,
          });

          localStorage.setItem("token", res.user.refreshToken);
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
          window.location.reload();
        });
    }

    setSignupData({
      email: "",
      password: "",
      role: "",
    });
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  return (
    <>
      <div className="bg-darkBlue-101 h-screen">
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 p-4 rounded-lg">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign up
                    </h6>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        name="email"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Role
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Role"
                        name="role"
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          -- Choose Role --
                        </option>
                        <option value="mentor">Mentor</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    {error && <span className="text-red-500">{error}</span>}
                    <div className="text-center mt-6">
                      <button
                        className="bg-darkBlue-101 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        onClick={signup}
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap justify-end mt-6 relative">
                <div className="w-1/2 text-right">
                  <Link to="/" className="text-blue-400">
                    <small>Already have account?</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
