import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";
import useLikeUnlike from "../../hooks/useLikeUnlike";
import usePostComment from "../../hooks/usePostComment";
import CommentsModal from "../../Modal/CommentModal";
import useAuthStore from "../../store/authStore";
import { timeAgo } from "../../utils/timeAgo";
function PostFooter({ post, userProfile, isProfilePage = false }) {
  const { isLiked, likes, handleLikePost, isUpdating } = useLikeUnlike(post);
  const authUser = useAuthStore((state) => state.user);
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  async function handleSubmitComment() {
    await handlePostComment(post.id, comment);
    setComment("");
  }
  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLikePost}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box
          onClick={() => commentRef.current.focus()}
          fontSize={18}
          cursor={"pointer"}
        >
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize={"12"} color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"} cursor={"pointer"}>
            {userProfile?.username} <Text as={"span"}>{post?.caption}</Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              cursor={"pointer"}
              mt={1}
              fontSize={"sm"}
              color={"gray.400"}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {isOpen && (
            <CommentsModal post={post} isOpen={isOpen} onClose={onClose} />
          )}
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={500}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
}

export default PostFooter;
