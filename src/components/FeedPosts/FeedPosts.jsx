import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
  Text,
} from "@chakra-ui/react";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import FeedPost from "./FeedPost";

function FeedPosts() {
  const { isLoading, posts } = useGetFeedPosts();
  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((_, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={"2"}>
              <SkeletonCircle size={"10"} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton h={"10px"} w={"200px"} />
                <Skeleton h={"10px"} w={"150px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={"500px"}>Contents Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}
      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost post={post} key={post.id} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text textAlign={"center"} fontSize={"md"} color={"red.400"}>
            Looks Like You don&apos;t have any friend
          </Text>
          <Text textAlign={"center"} color={"red.400"}>
            Stop coding and go make some!!
          </Text>
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
