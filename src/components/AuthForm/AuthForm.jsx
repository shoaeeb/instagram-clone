import { VStack, Image, Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} padding={4} justifyContent={"center"}>
        <VStack spacing={4}>
          <Image
            h={24}
            cursor={"pointer"}
            src="../../public/logo.png"
            alt="instagram"
          />
          {isLogin ? <Login /> : <Signup />}
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            w={"full"}
          >
            <Box flex={2} bg={"gray.400"} h={"1px"} />
            <Text color={"white"}>OR</Text>
            <Box flex={2} bg={"gray.400"} h={"1px"} />
          </Flex>
        </VStack>
        <GoogleAuth />
      </Box>
      {/* switch between login and signup */}
      <Box border={"1px solid gray"} borderRadius={4} padding={4}>
        <Flex
          cursor={"pointer"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box mx={2}>
            {isLogin ? "Don't Have An Account?" : "Already Have An Account"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"}>
            {isLogin ? "Sign Up" : "Log In"}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default AuthForm;
