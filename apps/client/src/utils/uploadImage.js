import axios from "axios";
const token =
  "3bdb4a8710b03aee7e5ddfc8838f325f0521fc1ba8dbd26456b07342afb9655d8e3cdabf4d2b86636a527c56d230c5b6c3a661d815da60b0c368ed538d90c60e25fd5e7b559e2bf79217b018bb5557c69642ec8730c9df7938c637058f2107e909384251d024d2b44535c7344a5edf289909810f3ba1e7c304136959eacb8e30";
const uploadFileHandler = async (event, setImages) => {
  const files = event.target.files;

  if (!files || files.length === 0) {
    alert("Please select a file.");
    return;
  }
  const uploadPromises = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    try {
      const response = await axios.post(
        "https://brilliant-birthday-003dfbf498.strapiapp.com/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const uploadedFile = response.data?.[0];
      if (!uploadedFile || !uploadedFile.url) {
        throw new Error("Invalid response from server.");
      }
      return uploadedFile.url;
    } catch (error) {
      console.log("Error uploading file:", error);
      throw new Error("File upload failed.");
    }
  });
  try {
    const urls = await Promise.all(uploadPromises); // Wait for all uploads to finish
    setImages((prev) =>
      prev ? `${prev}, ${urls.join(", ")}` : urls.join(", ")
    );
    alert("Files uploaded successfully!");
  } catch (error) {
    alert("Some files failed to upload. Please try again.", error);
  }
};
export default uploadFileHandler;

// import React, { useState } from "react";
// import uploadFileHandler from "./upload"; // Import the universal function
// const UploadImage = () => {
//   const [images, setImages] = useState("");
//   return (
//     <div>
//       <h2>Upload Image</h2>
//       <input
//         type="file"
//         onChange={(e) => uploadFileHandler(e, setImages)} // Use the universal function
//         multiple // Allow multiple file selection
//       />
//       <p>Uploaded Images: </p>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {/* Split the images string and map over the array */}
//         {images.split(", ").map((url, index) => (
//           <img
//             key={index}
//             src={url}
//             style={{
//               width: "100px",
//               height: "100px",
//               objectFit: "cover",
//               borderRadius: "8px",
//             }}
//           />
//         ))}
//       </div>

//     </div>
//   );
// };
// export default UploadImage;
