import { Avatar, Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink, Router } from "react-router-dom";
import {
  CreatePostLogo,
  InstagramLogo,
  InstagramMobileLogo,
  NotificationsLogo,
  SearchLogo,
} from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
function Sidebar() {
  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: "Home",
      link: "/",
    },

    {
      icon: <SearchLogo />,
      text: "Search",
    },
    {
      icon: <NotificationsLogo />,
      text: "Notifications",
    },
    {
      icon: <CreatePostLogo />,
      text: "Create",
    },
    {
      icon: <Avatar size={"sm"} name="Burak Orkmez" src="/profilepic.png" />,
      text: "Profile",
      link: "/asaprogrammer",
    },
  ];
  return (
    <Box
      height={"100vh"}
      borderRight={{ base: "1px solid", md: "none" }}
      borderColor={"whiteAlpha.100"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
        <Link
          to={"/"}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
          as={RouterLink}
        >
          <InstagramLogo />
        </Link>

        <Link
          to={"/"}
          p={2}
          ml={0.1}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.200",
          }}
          w={10}
          as={RouterLink}
        >
          <InstagramMobileLogo />
        </Link>

        <Flex gap={5} direction={"column"} cursor={"pointer"}>
          {sidebarItems.map((item, index) => {
            return (
              <Tooltip
                hasArrow
                label={item.text}
                placement={"right"}
                key={index}
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
              >
                <Link
                  display={"flex"}
                  to={item?.link}
                  as={RouterLink}
                  alignItems={"center"}
                  gap={4}
                  _hover={{
                    bg: "whiteAlpha.400",
                  }}
                  p={{ md: 1 }}
                  borderRadius={6}
                  w={{ base: "10", md: "full" }}
                  justifyContent={{ base: "center", md: "flex-start" }}
                >
                  {item.icon}
                  <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                </Link>
              </Tooltip>
            );
          })}
        </Flex>

        <Tooltip
          hasArrow
          label={"Logout "}
          placement={"right"}
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Link
            display={"flex"}
            to={"/auth"}
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            p={1}
            _hover={{
              bg: "whiteAlpha.400",
            }}
            mt={"auto"}
            borderRadius={6}
            w={{ base: "10", md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut size={25} />
            <Box display={{ base: "none", md: "block" }}>Log Out</Box>
          </Link>
        </Tooltip>
      </Flex>
    </Box>
  );
}

export default Sidebar;
