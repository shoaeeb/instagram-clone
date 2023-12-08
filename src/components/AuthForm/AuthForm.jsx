import {
  VStack,
  Image,
  Input,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  //for email,password,and confirm password;
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  //programatically navigate to homepage
  const navigate = useNavigate();

  function handleAuth() {
    if (!inputs.email || !inputs.password) {
      alert("Please Enter all the fields");
      return;
    }
    //else navigate to home page
    navigate("/");
  }
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
          <Input
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            value={inputs.email}
            placeholder={"Email"}
            type={"email"}
            fontSize={14}
            _placeholder={{ color: "gray.100" }}
          />
          <Input
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder={"Password"}
            type={"password"}
            fontSize={14}
            _placeholder={{ color: "gray.100" }}
          />

          {!isLogin ? (
            <Input
              onChange={(e) =>
                setInputs({ ...inputs, confirmpassword: e.target.value })
              }
              placeholder={"Confirm Password"}
              type={"password"}
              fontSize={14}
              _placeholder={{ color: "gray.100" }}
            />
          ) : null}

          {/* w - full takes the width parent */}
          <Button
            onClick={handleAuth}
            w={"full"}
            fontSize={14}
            colorScheme={"blue"}
            size={"sm"}
          >
            {isLogin ? "Log in" : "Sign Up"}
          </Button>
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
        </VStack>
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
