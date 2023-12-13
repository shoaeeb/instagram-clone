import {
  GridItem,
  Box,
  Flex,
  Text,
  useDisclosure,
  Image,
  Avatar,
  Divider,
  VStack,
  Button,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Caption from "../Comment/Caption";
import { firestore, storage } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

function ProfilePost({ post }) {
  console.log(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore((state) => state.deletePost);
  const decrementPostCount = useUserProfileStore((state) => state.deletePost);
  async function handleDeletePost() {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      //first delete the image from the firebase storage
      //then delete from posts colletion
      //then delele from users collection
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);

      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      //delete from the post
      deletePost(post.id);
      decrementPostCount(post.id);
      showToast("Success", "Post Deleted Succesfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              maxH={"90vh"}
              minH={"50vh"}
              gap={4}
              w={{ base: "70%", sm: "70%", md: "full" }}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
              >
                <Image src={post.imageURL} alt={"profile post"} />
              </Flex>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar
                      src={userProfile.profilePicURL}
                      size={"sm"}
                      name={userProfile.fullName}
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      bg={"transparent"}
                      size={"sm"}
                      _hover={{ bg: "whiteAplha.300", color: "red.600" }}
                      onClick={handleDeletePost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  {/* caption */}
                  {post.caption && <Caption post={post} />}
                  {/* comments */}
                  {post.comments.map((comment, i) => (
                    <Comment comment={comment} key={i} />
                  ))}
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter post={post} isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <GridItem
        cursor={"pointer"}
        overflow={"hidden"}
        borderRadius={4}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{
            opacity: 1,
          }}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3 ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={post.imageURL} alt={"profile post"} h={"100%"} w={"100%"} />
      </GridItem>
    </>
  );
}

export default ProfilePost;
