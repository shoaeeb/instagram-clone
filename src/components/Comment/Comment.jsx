import { Flex, Avatar, Text, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useGetUserByProfileId from "../../hooks/useGetUserByProfileId";
import { timeAgo } from "../../utils/timeAgo";

function Comment({ comment }) {
  const { isLoading, userProfile, setUserProfile } = useGetUserByProfileId(
    comment.createdBy
  );
  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar
          src={userProfile.profilePicURL}
          name={userProfile.username}
          size={"sm"}
        />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Link to={`/${userProfile.username}`}>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={12}>{comment.comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {timeAgo(userProfile.createdAt)}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Comment;

function CommentSkeleton() {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w={10} />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
}
