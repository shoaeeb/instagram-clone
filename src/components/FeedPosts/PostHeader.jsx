import { Flex, Box, Text, Avatar, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowAndUnfollowUser from "../../hooks/useFollowAndUnfollowUser";
import { timeAgo } from "../../utils/timeAgo";

function PostHeader({ post, userProfile }) {
  const { isUpdating, isFollowing, handleFollowUser } =
    useFollowAndUnfollowUser(post.createdBy);
  return (
    <Flex
      w={"full"}
      my={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex gap={2} alignItems={"center"}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar
            src={userProfile?.profilePicURL}
            alt={"user profile pic"}
            size={"sm"}
          />
        </Link>
        <Flex gap={"2"} fontSize={12} fontWeight={"bold"}>
          {userProfile?.username}
          <Box color={"gray.400"}> {timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
}

export default PostHeader;
