import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { auth } from "../firebase/firebase";

function PageLayout({ children }) {
  const { pathname: pathName } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRender = pathName !== "/auth" && user;
  const canRenderNavbar = !user && !loading && pathName !== "/auth";

  const checkingUserAuth = !user && loading;
  if (checkingUserAuth) return <PageLayoutSpinner />;
  return (
    <Flex flexDir={`${canRenderNavbar ? "column" : "row"}`}>
      {/* side bar on the left*/}
      {/* render sidebar other than auth page */}
      {canRender ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* the page on the right */}
      {/* Navabar */}
      {canRenderNavbar ? <Navbar /> : null}
      <Box flex={1} w={{ base: "calc(100%-70px)", md: "calc(100%-240px)" }}>
        {children}
      </Box>
    </Flex>
  );
}

export default PageLayout;

function PageLayoutSpinner() {
  return (
    <Flex
      flexDir={"column"}
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
}
