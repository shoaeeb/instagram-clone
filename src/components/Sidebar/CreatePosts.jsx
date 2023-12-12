import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";

function CreatePosts() {
  return (
    <Tooltip
      hasArrow
      placement={"right"}
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        display={"flex"}
        alignItems={"center"}
        gap={4}
        _hover={{
          bg: "whiteAlpha.400",
        }}
        p={{ md: 1 }}
        borderRadius={6}
        w={{ base: "10", md: "full" }}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <CreatePostLogo />
        <Box display={{ base: "none", md: "block" }}>Create</Box>
      </Flex>
    </Tooltip>
  );
}

export default CreatePosts;
