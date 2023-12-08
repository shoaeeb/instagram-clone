import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function PageLayout({ children }) {
  const { pathname: pathName } = useLocation();
  console.log(pathName);
  return (
    <Flex>
      {/* side bar on the left*/}
      {/* render sidebar other than auth page */}
      {pathName !== "/auth" ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* the page on the right */}

      <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
        {children}
      </Box>
    </Flex>
  );
}

export default PageLayout;
