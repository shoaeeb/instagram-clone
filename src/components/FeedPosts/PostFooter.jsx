import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  CommentLogo,
  NotificationsLogo,
  UnlikeLogo,
} from "../../assets/constants";

function PostFooter({ userName, isProfilePage = false }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  function handleLike() {
    if (liked) {
      setLiked(!liked);
      setLikes((likes) => likes - 1);
    } else {
      setLiked(!liked);
      setLikes((likes) => likes + 1);
    }
  }
  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLike}>
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box fontSize={18} cursor={"pointer"}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"} cursor={"pointer"}>
            {userName} <Text as={"span"}>Feeling good</Text>
          </Text>
          <Text mt={1} fontSize={"sm"} color={"gray.400"}>
            View all 1,000 comments
          </Text>
        </>
      )}
      <Flex
        alignItem={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
      >
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder={"Add a comment..."}
            fontSize={14}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={500}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
}

export default PostFooter;
