import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowAndUnfollowUser from "../../hooks/useFollowAndUnfollowUser";
import useAuthStore from "../../store/authStore";

function SuggestedUser({ user, setUser }) {
  // console.log(setUser);
  const { isFollowing, isUpdating, handleFollowUser } =
    useFollowAndUnfollowUser(user?.uid);
  const authUser = useAuthStore((state) => state.user);

  async function onFollowUser() {
    await handleFollowUser();
    setUser?.({
      ...user,
      followers: isFollowing
        ? user.followers.filter((uid) => uid !== authUser.uid)
        : [...user.followers, authUser.uid],
    });
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`/${user.username}`}>
          <Avatar src={user?.profilePicURL} name={user?.fullName} size={"md"} />
        </Link>
        <VStack spacing={2}>
          <Link to={`/${user.username}`}>
            <Box fontSize={12} fontWeight={"bold"}>
              {user?.fullName}
            </Box>
          </Link>
          <Box alignSelf={"flex-start"} fontSize={11} color={"gray.400"}>
            {user?.followers?.length} followers
          </Box>
        </VStack>
      </Flex>
      {authUser.uid !== user?.uid && (
        <Button
          _hover={{ bg: "transparent", color: "white" }}
          bg={"transparent"}
          onClick={onFollowUser}
          color={"blue.400"}
          p={0}
          h={"max-content"}
          cursor={"pointer"}
          fontWeight={"bold"}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
}

export default SuggestedUser;
