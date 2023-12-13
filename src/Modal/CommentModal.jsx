import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRef, useState } from "react";
import Comment from "../components/Comment/Comment";
import usePostComment from "../hooks/usePostComment";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { handlePostComment, isLoading } = usePostComment();
  const [comment, setComment] = useState("");
  const commentsContainerRef = useRef(null);
  async function handleSubmitComment(e) {
    e.preventDefault();
    await handlePostComment(post.id, comment);
    setComment("");
  }
  useEffect(
    function () {
      const scrollToBottom = () => {
        commentsContainerRef.current.scrollTo =
          commentsContainerRef.current.scrollHeight;
      };
      if (isOpen) {
        setTimeout(() => scrollToBottom(), 1000);
      }
    },
    [isOpen, post.comments.length]
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {post.comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </Flex>
          <form style={{ marginTop: "2rem" }} onSubmit={handleSubmitComment}>
            <Input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              size={"sm"}
            />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button
                isLoading={isLoading}
                type="submit"
                ml={"auto"}
                size={"sm"}
                my={4}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
