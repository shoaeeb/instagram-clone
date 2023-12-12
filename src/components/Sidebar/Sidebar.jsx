import { Box, Flex, Link, Tooltip, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
function Sidebar() {
  const { handleLogout, isLoggingOut } = useLogout();

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
          <SidebarItems />
        </Flex>
        {/* LogOut */}
        <Tooltip
          hasArrow
          label={"Logout "}
          placement={"right"}
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
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
            <Button
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
              display={{ base: "none", md: "block" }}
            >
              Log Out
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
}

export default Sidebar;
