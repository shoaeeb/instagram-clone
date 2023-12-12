import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useState } from "react";
import useEditProfile from "../../hooks/useEditProfile";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const EditProfile = ({ isOpen, onClose }) => {
  const authUser = useAuthStore((state) => state.user);

  const [inputs, setInputs] = useState(function () {
    return {
      fullName: authUser?.fullName || "",
      userName: authUser?.username || "",
      bio: authUser?.bio || "",
    };
  });

  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
  const { editProfile, isUpdating } = useEditProfile();
  const showToast = useShowToast();
  async function handleEditProfile() {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast("error", error.message, "error");
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid gray"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {/* Container Flex */}
            <Flex bg={"black"}>
              <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile || authUser.profilePicURL}
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w="full">
                      <Button onClick={() => fileRef.current.click()} w="full">
                        Edit Profile Picture
                      </Button>
                    </Center>
                    <Input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                    />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                  <Input
                    value={inputs.fullName}
                    onChange={(e) =>
                      setInputs({ ...inputs, fullName: e.target.value })
                    }
                    placeholder={"Full Name"}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    value={inputs.userName}
                    onChange={(e) =>
                      setInputs({ ...inputs, userName: e.target.value })
                    }
                    placeholder={"Username"}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Bio</FormLabel>
                  <Input
                    value={inputs.bio}
                    onChange={(e) =>
                      setInputs({ ...inputs, bio: e.target.value })
                    }
                    placeholder={"Bio"}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    onClick={handleEditProfile}
                    isLoading={isUpdating}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
