import axios from "axios";
const token =
  "1d0dc21dc13ad63edd2f1ef1034e6208435ce20ae5b4e29c5fcb8d623b8a272941b1561fb52c8eec35a8cd0ff15e568b938731ecbcc2d05f01fe2612191b4d7e96e2a00425b2f8960e60c2538ccbed75cbcb35bd2cb2137e8ae230ccc8f3cae07d3fc985d20f1e6e6e71f2e9e5bfc32d4964cf75da6d0698bb2906ceb2a91d4f";
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
    alert("Some files failed to upload. Please try again.",error);
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
