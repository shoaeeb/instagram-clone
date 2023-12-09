import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
function FeedPost({ img, userName, avatar }) {
  return (
    <>
      <PostHeader userName={userName} avatar={avatar} />
      <Box overflow={"hidden"} borderRadius={4} my={2}>
        <Image src={img} alt={"user profile pic"} />
      </Box>
      <PostFooter userName={userName} />
    </>
  );
}

export default FeedPost;
