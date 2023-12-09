import { Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
function SuggestedHeader() {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={"../../../public/profilepic.png"} size={"lg"} />
        <Text fontSize={12} fontWeight={"bold"}>
          asaprogrammer
        </Text>
      </Flex>
      <Link
        to={"/auth"}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        as={RouterLink}
        _hover={{ textDecoration: "none" }}
      >
        Log Out
      </Link>
    </Flex>
  );
}

export default SuggestedHeader;
