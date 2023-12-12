import { Avatar, Box, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAuthStore from "../../store/authStore";
function ProfileLink() {
  const authUser = useAuthStore((state) => state.user);
  return (
    <Tooltip
      hasArrow
      placement={"right"}
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Link
        display={"flex"}
        alignItems={"center"}
        gap={4}
        _hover={{
          bg: "whiteAlpha.400",
        }}
        to={`/${authUser?.username}`}
        as={RouterLink}
        p={{ md: 1 }}
        borderRadius={6}
        w={{ base: "10", md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
        <Box display={{ base: "none", md: "block" }}>Profile</Box>
      </Link>
    </Tooltip>
  );
}

export default ProfileLink;
