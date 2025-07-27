import axios from 'axios';
import { toast } from 'react-hot-toast';

const cloudName = "your_cloud_name";
const uploadPreset = "medimap_upload";

const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    toast.success("Image uploaded successfully");
    return res.data.secure_url; // 👈 This is what you store in DB
  } catch (err) {
    console.error("Upload failed:", err);
    toast.error("Image upload failed");
    return null;
  }
};
