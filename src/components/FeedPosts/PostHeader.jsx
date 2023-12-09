import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

function PostHeader({ userName, avatar }) {
  return (
    <Flex
      w={"full"}
      my={2}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Flex gap={2} alignItems={"center"}>
        <Avatar src={avatar} alt={"user profile pic"} size={"sm"} />
        <Flex gap={"2"} fontSize={12} fontWeight={"bold"}>
          {userName}
          <Box color={"gray.400"}> 1w</Box>
        </Flex>
      </Flex>

      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
        >
          Follow
        </Text>
      </Box>
    </Flex>
  );
}

export default PostHeader;
