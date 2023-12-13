import {
  Box,
  Button,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";

import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
function CreatePosts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [caption, setCaption] = useState("");
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const imageRef = useRef(null);
  const showToast = useShowToast();
  const { isLoading, handleCreatedPost } = useCreatePost();

  async function handleCreationPost() {
    try {
      await handleCreatedPost(selectedFile, caption);
      onClose();
      setSelectedFile(null);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return (
    <>
      <Tooltip
        hasArrow
        placement={"right"}
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          display={"flex"}
          alignItems={"center"}
          gap={4}
          _hover={{
            bg: "whiteAlpha.400",
          }}
          p={{ md: 1 }}
          borderRadius={6}
          w={{ base: "10", md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <CreatePostLogo />
          <Box display={{ base: "none", md: "block" }}>Create</Box>
        </Flex>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"}>
          <ModalHeader>Create A New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Post caption..."
            />

            <Input
              type="file"
              ref={imageRef}
              onChange={handleImageChange}
              hidden
            />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => imageRef.current.click()}
              size={16}
            />

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={selectedFile} alt="Selected Img" />
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                ></CloseButton>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button isLoading={isLoading} onClick={handleCreationPost} mr={3}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePosts;

function useCreatePost() {
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const createPost = usePostStore((state) => state.createPosts);
  const addPost = useUserProfileStore((state) => state.addPost);
  const userProfile = useUserProfileStore((state) => state.userProfile);

  const { pathname } = useLocation();

  async function handleCreatedPost(selectedFile, caption) {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please Select a file");
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      setIsLoading(true);

      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(postDocRef, { imageURL: downloadURL });
      newPost.imgURL = downloadURL;
      if (userProfile.uid === authUser.uid)
        createPost({ ...newPost, id: postDocRef.id });
      if (pathname !== "/" && userProfile.uid === authUser.uid)
        addPost({ ...newPost, id: postDocRef.id });
      showToast("Success", "Post Created Successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, handleCreatedPost };
}
