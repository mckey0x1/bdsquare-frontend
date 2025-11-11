import axios from "axios";

/**
 * Uploads an image file to Cloudinary
 * @param file - The image file to upload
 * @returns Promise<string> - The secure URL of the uploaded image
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables are not set");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

/**
 * Uploads multiple image files to Cloudinary
 * @param files - Array of image files to upload
 * @returns Promise<string[]> - Array of secure URLs of the uploaded images
 */
export const uploadMultipleImagesToCloudinary = async (
  files: File[]
): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadImageToCloudinary(file));
  return Promise.all(uploadPromises);
};
