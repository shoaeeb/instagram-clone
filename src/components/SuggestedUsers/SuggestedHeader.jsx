import { Flex, Avatar, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
function SuggestedHeader() {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  if (!authUser) return null; //if no user just return
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex flexDir={"row"} alignItems={"center"} gap={2}>
        <Link to={`/${authUser?.username}`}>
          <Avatar src={authUser?.profilePicURL} size={"lg"} />
        </Link>
        <Link to={`/${authUser?.username}`}>
          <Text fontSize={12} fontWeight={"bold"}>
            {authUser?.username}
          </Text>
        </Link>
      </Flex>
      <Button
        background={"transparent"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        _hover={{ background: "transparent" }}
        onClick={handleLogout}
        isLoading={isLoggingOut}
      >
        Log Out
      </Button>
    </Flex>
  );
}

export default SuggestedHeader;
