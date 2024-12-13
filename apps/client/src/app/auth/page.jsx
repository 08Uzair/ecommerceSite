"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../redux/actions/auth";
import { createProfile } from "../redux/actions/profile";
import { useRouter } from "next/navigation";
import uploadFileHandler from "../../utils/uploadImage";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [images, setImages] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [signInData, setSignInData] = useState({
    identifier: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profileData, setProfileData] = useState({
    fname: "",
    lname: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    phone: "",
    images: images,
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const profile = localStorage.getItem("profile");
      if (profile) {
        router.push("/");
      }
    }
  }, [router]);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name === "username" || name === "email" || name === "password") {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
      images,
      role: "user",
    }));
  };

  const dispatch = useDispatch();

  const validateSignIn = () => {
    const newErrors = {};
    if (!signInData.identifier) newErrors.identifier = "Email is required.";
    if (!signInData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpStep = () => {
    const stepFields = [
      [], // Placeholder for step 0 (not used)
      ["email", "username", "password"], // Step 1
      ["fname", "lname", "country"], // Step 2
      ["state", "city", "pincode"], // Step 3
      ["address", "phone"], // Step 4
    ][currentStep];
    const newErrors = {};
    stepFields.forEach((field) => {
      if (!profileData[field]) newErrors[field] = `${field} is required.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    setLoading(true);
    try {
      await dispatch(signIn(signInData));
      setLoading(false);
      router.push("/"); // Redirect after sign-in

      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignUpStep()) return;

    setLoading(true);
    try {
      console.log(signUpData);
      await dispatch(signUp(signUpData));
      await dispatch(createProfile({ data: profileData }));
      setLoading(false);
      // router.push("/"); // Redirect after sign-in
      // window.location.reload()
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const nextStep = () => {
    if (validateSignUpStep()) {
      setErrors({});
      if (currentStep < 4) setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl text-gray-800 font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        {isSignIn ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="identifier"
                value={signInData.identifier}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm">{errors.identifier}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={signInData.password}
                onChange={handleSignInChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-4">
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={signUpData.username}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    value={profileData.fname}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.fname && (
                    <p className="text-red-500 text-sm">{errors.fname}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    value={profileData.lname}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.lname && (
                    <p className="text-red-500 text-sm">{errors.lname}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div>
                  <label className="block text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm">{errors.state}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Pin Code</label>
                  <input
                    type="text"
                    name="pincode"
                    value={profileData.pincode}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm">{errors.pincode}</p>
                  )}
                </div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Profile Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => uploadFileHandler(e, setImages)}
                    accept="image/*"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm">{errors.image}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleSignUpChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-gray-600 focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </>
            )}
            {currentStep < 4 && (
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                onClick={nextStep}
              >
                Next
              </button>
            )}
            {currentStep > 1 && (
              <button
                type="button"
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition mt-2"
                onClick={previousStep}
              >
                Previous
              </button>
            )}
            {currentStep === 4 && (
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            )}
          </form>
        )}
        <p
          className="mt-6 text-center text-gray-500 cursor-pointer hover:underline"
          onClick={() => {
            setIsSignIn(!isSignIn);
            setCurrentStep(1); // Reset step when switching
            setErrors({});
          }}
        >
          {isSignIn
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
}
