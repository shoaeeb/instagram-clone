import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import useGetUserByProfileId from "../../hooks/useGetUserByProfileId";
function FeedPost({ post }) {
  const { isLoading, userProfile, setUserProfile } = useGetUserByProfileId(
    post.createdBy
  );
  return (
    <>
      <PostHeader post={post} userProfile={userProfile} />
      <Box overflow={"hidden"} borderRadius={4} my={2}>
        <Image width={"100%"} src={post.imageURL} alt={"posts"} />
      </Box>
      <PostFooter post={post} userProfile={userProfile} />
    </>
  );
}

export default FeedPost;
