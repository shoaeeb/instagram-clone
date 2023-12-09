import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";

function SuggestedUser({ name, followers, avatar }) {
  const [isFollowed, setisFollowed] = useState(false);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} name={name} size={"md"} />
        <VStack spacing={2}>
          <Box fontSize={12} fontWeight={"bold"}>
            {name}
          </Box>
          <Box alignSelf={"flex-start"} fontSize={11} color={"gray.400"}>
            {followers} followers
          </Box>
        </VStack>
      </Flex>
      <Button
        _hover={{ bg: "transparent", color: "white" }}
        bg={"transparent"}
        onClick={() => setisFollowed(!isFollowed)}
        color={"blue.400"}
        p={0}
        h={"max-content"}
        cursor={"pointer"}
        fontWeight={"bold"}
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
}

export default SuggestedUser;
