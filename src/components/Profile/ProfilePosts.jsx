import { Box, Flex, Text, Grid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";

function ProfilePosts() {
  const { isLoading, posts } = useGetUserPosts();

  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1,1fr)",
        md: "repeat(3,1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {isLoading &&
        [0, 1, 2].map((_, index) => {
          return (
            <VStack key={index} gap={4} alignItems={"flex-start"}>
              <Skeleton w={"full"}>
                <Box h={"300px"}>Contents Wrapped</Box>
              </Skeleton>
            </VStack>
          );
        })}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
}

export default ProfilePosts;

function NoPostsFound() {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found 😕</Text>
    </Flex>
  );
}
