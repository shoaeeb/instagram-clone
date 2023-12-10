import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(function () {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
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
        [0, 1, 2, 3, 4, 5].map((_, index) => {
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
          <ProfilePost img={"../../../public/img1.png"} />
          <ProfilePost img={"../../../public/img2.png"} />
          <ProfilePost img={"../../../public/img3.png"} />
          <ProfilePost img={"../../../public/img4.png"} />
        </>
      )}
    </Grid>
  );
}

export default ProfilePosts;
