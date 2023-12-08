import { Container } from "@chakra-ui/react";
import FeedPost from "./FeedPost";

function FeedPosts() {
  return (
    <Container border={"1px solid red"} maxW={"container.sm"} py={10} px={2}>
      <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Container>
  );
}

export default FeedPosts;
