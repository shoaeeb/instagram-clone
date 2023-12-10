import {
  GridItem,
  Box,
  Flex,
  Text,
  useDisclosure,
  Image,
  Avatar,
  Divider,
  VStack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

function ProfilePost({ img }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        size={{ base: "3xl", md: "5xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{ base: "70%", sm: "70%", md: "full" }}>
              <Box
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
              >
                <Image
                  objectFit={"cover"}
                  src={img}
                  w={"100%"}
                  h={"100%"}
                  alt={"profile post"}
                />
              </Box>
              <Flex
                flex={1}
                flexDir={"column"}
                px={10}
                display={{ base: "none", md: "flex" }}
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={2}>
                    <Avatar
                      src={"../../../public/profilepic.png"}
                      size={"sm"}
                      name={"As a Programmer"}
                    />
                    <Text fontWeight={"bold"} fontSize={12}>
                      asaprogrammer
                    </Text>
                  </Flex>
                  <Box _hover={{ bg: "whiteAplha.300", color: "red.600" }}>
                    <MdDelete size={20} cursor={"pointer"} />
                  </Box>
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack
                  w={"full"}
                  alignItems={"start"}
                  maxH={"350px"}
                  overflowY={"auto"}
                >
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"asaprogrammer"}
                    profilePic={"../../../public/profilepic.png"}
                    text={"dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h Ago"}
                    userName={"abrahmov"}
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice Pic"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"kentdodds"}
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good Clone Dude"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"asaprogrammer"}
                    profilePic={"../../../public/profilepic.png"}
                    text={"dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h Ago"}
                    userName={"abrahmov"}
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice Pic"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"kentdodds"}
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good Clone Dude"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"asaprogrammer"}
                    profilePic={"../../../public/profilepic.png"}
                    text={"dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h Ago"}
                    userName={"abrahmov"}
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice Pic"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"kentdodds"}
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good Clone Dude"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"asaprogrammer"}
                    profilePic={"../../../public/profilepic.png"}
                    text={"dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h Ago"}
                    userName={"abrahmov"}
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice Pic"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"kentdodds"}
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good Clone Dude"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"asaprogrammer"}
                    profilePic={"../../../public/profilepic.png"}
                    text={"dummy images from unsplash"}
                  />
                  <Comment
                    createdAt={"12h Ago"}
                    userName={"abrahmov"}
                    profilePic={"https://bit.ly/dan-abramov"}
                    text={"Nice Pic"}
                  />
                  <Comment
                    createdAt={"1d Ago"}
                    userName={"kentdodds"}
                    profilePic={"https://bit.ly/kent-c-dodds"}
                    text={"Good Clone Dude"}
                  />
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <GridItem
        cursor={"pointer"}
        overflow={"hidden"}
        borderRadius={4}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        <Flex
          opacity={0}
          _hover={{
            opacity: 1,
          }}
          position={"absolute"}
          top={0}
          bottom={0}
          right={0}
          left={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3 ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image
          src={img}
          alt={"profile post"}
          h={"100%"}
          w={"100%"}
          objectFit={"cover"}
        />
      </GridItem>
    </>
  );
}

export default ProfilePost;
