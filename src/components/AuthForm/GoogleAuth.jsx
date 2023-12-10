import { Flex, Image, Text } from "@chakra-ui/react";

function GoogleAuth() {
  return (
    <Flex
      cursor={"pointer"}
      gap={1}
      alignItems={"center"}
      justifyContent={"center"}
      my={3}
    >
      <Image src={"../../public/google.png"} alt={"google logo"} w={6} />
      <Text mx={2} color={"lightblue"}>
        Log In With Google
      </Text>
    </Flex>
  );
}

export default GoogleAuth;
