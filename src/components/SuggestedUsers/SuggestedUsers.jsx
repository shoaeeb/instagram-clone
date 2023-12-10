import {
  Box,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

function SuggestedUsers() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  return (
    <VStack py={8} px={6} gap={4}>
      {isLoading && (
        <>
          <VStack w={"full"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"full"}
            >
              <Flex alignItems={"center"} gap={2}>
                <SkeletonCircle size="10" />
                <VStack>
                  <Skeleton height="15px" w={"100px"} />
                  {/* <Skeleton height="20px" w={"100px"} /> */}
                </VStack>
              </Flex>
              <Skeleton height="15px" w={"60px"} />
            </Flex>
          </VStack>
          <Flex
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            w={"full"}
          >
            <Skeleton height="20px" w={"120px"} />
            <Skeleton height="20px" w={"60px"} />
          </Flex>
          {[0, 1, 2].map((_, index) => (
            <VStack key={index} w={"full"}>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
              >
                <Flex alignItems={"center"} gap={2}>
                  <SkeletonCircle size="10" />
                  <VStack>
                    <Skeleton height="15px" w={"100px"} />
                    <Skeleton height="15px" w={"100px"} />
                  </VStack>
                </Flex>
                <Skeleton height="15px" w={"60px"} />
              </Flex>
            </VStack>
          ))}
        </>
      )}
      {!isLoading && (
        <>
          {" "}
          <SuggestedHeader />
          <Flex
            alignItems={"center"}
            w={"full"}
            justifyContent={"space-between"}
          >
            <Text
              cursor={"pointer"}
              fontSize={12}
              fontWeight={"bold"}
              color={"gray.500"}
            >
              Suggested for you
            </Text>
            <Text
              cursor={"pointer"}
              fontSize={13}
              fontWeight={"bold"}
              color={"white"}
            >
              See All
            </Text>
          </Flex>
          <SuggestedUser
            name={"Dan Abrahmov"}
            followers={1392}
            avatar={"https://bit.ly/dan-abramov"}
          />
          <SuggestedUser
            name={"Ryan FLorence"}
            followers={567}
            avatar={"https://bit.ly/ryan-florence"}
          />
          <SuggestedUser
            name={"Dan Abrahmov"}
            followers={759}
            avatar={"https://bit.ly/code-beast"}
          />
          <Box alignSelf={"flex-start"} fontSize={12} color={"gray.500"} mt={5}>
            &copy; {new Date().getFullYear()} Built By{" "}
            <Link
              href="https://www.github.com/shoaeeb"
              color={"blue.400"}
              _hover={{ textDecoration: "underline" }}
              target={"_blank"}
            >
              Shoaeeb{" "}
            </Link>
          </Box>
        </>
      )}
    </VStack>
  );
}

export default SuggestedUsers;
