import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";

function HomePage() {
  return (
    <Container maxW={"container.lg"}>
      {/* flex change from 3 to 2 */}
      <Flex gap={20}>
        <Box flex={3} py={10}>
          <FeedPosts />
        </Box>
        <Box
          flex={3}
          mr={20}
          display={{ base: "none", lg: "block" }}
          maxW={"300px"}
        >
          Suggested Users
        </Box>
      </Flex>
    </Container>
  );
}

export default HomePage;
