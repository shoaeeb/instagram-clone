import { Flex, Avatar, Text } from "@chakra-ui/react";

function Comment({ createdAt, profilePic, text, userName }) {
  return (
    <Flex gap={4}>
      <Avatar src={profilePic} name={userName} size={"sm"} />
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {userName}
          </Text>
          <Text fontSize={12}>{text}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Comment;
