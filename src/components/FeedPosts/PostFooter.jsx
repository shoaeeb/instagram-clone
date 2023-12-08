import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants";

function PostFooter() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  function handleLike() {
    if (liked) {
      setLiked(!liked);
      setLikes((likes) => likes--);
    } else {
      setLiked(!liked);
      setLikes((likes) => likes++);
    }
  }
  return (
    <>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"auto"}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLike}>
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
      </Flex>
    </>
  );
}

export default PostFooter;
