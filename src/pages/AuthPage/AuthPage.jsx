import { Container, Flex } from "@chakra-ui/react";
import { Box, Image } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

function AuthPage() {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={5}>
          {/* left hand side */}
          {/* box element  with display base to none for mobile and for medium to block */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="../../public/auth.png" h={400} alt="phone img" />
          </Box>

          {/* Right-hand-side */}
          {/* to put the element on top of each other  */}
          <VStack spacing={4} align={"stretch "}>
            <AuthForm />
            <Box textAlign={"center"}>Get the App</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image
                src="../../public/playstore.png"
                h={"10"}
                alt="PlayStore logo"
              />
              <Image
                src="../../public/microsoft.png"
                h={"10"}
                alt="Microsoft logo"
              />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
}

export default AuthPage;
