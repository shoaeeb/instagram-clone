import {
  Container,
  VStack,
  Flex,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";

function FeedPosts() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
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
      {!isLoading && (
        <>
          <FeedPost
            img="../../../public/img1.png"
            userName={"burkorkmez"}
            avatar="../../../public/img1.png"
          />
          <FeedPost
            img="../../../public/img2.png"
            userName={"josh"}
            avatar="../../../public/img2.png"
          />
          <FeedPost
            img="../../../public/img3.png"
            userName={"janedoe"}
            avatar="../../../public/img3.png"
          />
          <FeedPost
            img="../../../public/img4.png"
            userName={"johndoe"}
            avatar="../../../public/img4.png"
          />
        </>
      )}
    </Container>
  );
}

export default FeedPosts;
