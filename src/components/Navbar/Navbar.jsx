import { Button, Container, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Container maxW={"container.lg"} my={4}>
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
      >
        <Image
          src="../../../public/logo.png"
          cursor={"pointer"}
          h={20}
          display={{ base: "none", sm: "block" }}
        />
        <Flex gap={4}>
          <Link to="/auth">
            <Button colorScheme={"blue"} size={"sm"}>
              Log In
            </Button>
          </Link>
          <Link to="/auth">
            <Button colorScheme={"blue"} size={"sm"}>
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Navbar;
