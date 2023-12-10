import { Flex, Box, Text } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
function ProfileTabs() {
  return (
    <Flex
      w={"full"}
      justifyContent={"center"}
      gap={{ base: 4, sm: 10 }}
      textTransform={"uppercase"}
      fontWeight={"bold"}
    >
      <Flex
        borderTop={"1px solid white"}
        alignItems={"center"}
        p={"3"}
        gap={2}
        cursor={"pointer"}
      >
        <Box fontSize={20}>
          <BsGrid3X3 fontWeight={"bold"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Posts
        </Text>
      </Flex>
      <Flex alignItems={"center"} p={"3"} gap={2} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsBookmark fontWeight={"bold"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Saved
        </Text>
      </Flex>
      <Flex alignItems={"center"} p={"3"} gap={2} cursor={"pointer"}>
        <Box fontSize={20}>
          <BsSuitHeart fontWeight={"bold"} />
        </Box>
        <Text fontSize={12} display={{ base: "none", md: "block" }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
}

export default ProfileTabs;
