import { Box, Flex, Tooltip } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";

function Notifactions() {
  return (
    <Tooltip
      hasArrow
      placement={"right"}
      ml={1}
      openDelay={500}
      display={{ base: "block", md: "none" }}
    >
      <Flex
        display={"flex"}
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
        <NotificationsLogo />
        <Box display={{ base: "none", md: "block" }}>Notifications</Box>
      </Flex>
    </Tooltip>
  );
}

export default Notifactions;
