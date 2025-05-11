import axios from "axios";
import { api } from "@/services/api";
import { toast } from "sonner";

export const s3Uploader = async (file, setLoading) => {
  try {
    const response = await api.post("/upload-helper", {
      fileName: file.name,
      fileType: file.type,
    });
    const { url, fileKey } = response.data;
    const config = {
      headers: {
        "Content-Type": file.type,
      },
    };
    await axios.put(url, file, config);
    setLoading(false);
    const fileUrl = `https://sidhupaints-storages.s3.ca-central-1.amazonaws.com/${fileKey}`;
    return fileUrl;
  } catch (error) {
    setLoading(false);
    toast.error("Failed to upload image");
    return error;
  }
};
