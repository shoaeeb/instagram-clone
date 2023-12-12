import { useState } from "react";
import useShowToast from "./useShowToast";

function usePreviewImg(img) {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const MAXFILEINBYTES = 2 * 1024 * 1024; //2MB

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > MAXFILEINBYTES) {
        showToast("Error", "File size must be  2MB or less ", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please Select An Image File", "error");
      setSelectedFile(null);
    }
  }
  return { selectedFile, handleImageChange, setSelectedFile };
}

export default usePreviewImg;
