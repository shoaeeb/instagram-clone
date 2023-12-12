import {
  Avatar,
  AvatarGroup,
  Flex,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useFollowAndUnfollowUser from "../../hooks/useFollowAndUnfollowUser";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import EditProfile from "./EditProfile";

function ProfileHeader() {
  const { userProfile } = useUserProfileStore();
  const { isUpdating, isFollowing, handleFollowUser } =
    useFollowAndUnfollowUser(userProfile?.uid);
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const visitingOwnProfileAndAuthenticated =
    authUser && authUser.username === userProfile.username;
  const visitingOtherProfileAndAuthenticated =
    authUser && authUser.username !== userProfile.username;

  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar
          name={userProfile.fullName}
          alt="Profile Pic"
          src={userProfile.profilePicURL}
        />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>
            {userProfile.username}
          </Text>
          {visitingOwnProfileAndAuthenticated && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={{ bg: "whiteAlpha.300" }}
                size={{ base: "xs", md: "sm" }}
                onClick={onOpen}
              >
                Edit Profile
              </Button>
            </Flex>
          )}

          {visitingOtherProfileAndAuthenticated && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                size={{ base: "xs", md: "sm" }}
                isLoading={isUpdating}
                onClick={handleFollowUser}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"Bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>

        <Text fontSize={"sm"} fontWeight={"medium"}>
          {userProfile.bio}
        </Text>
      </VStack>

      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
}

export default ProfileHeader;
