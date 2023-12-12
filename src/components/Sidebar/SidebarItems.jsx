import CreatePosts from "./CreatePosts";
import Home from "./Home";
import Notifactions from "./Notifactions";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

function SidebarItems() {
  return (
    <>
      <Home />
      <Search />
      <Notifactions />
      <CreatePosts />
      <ProfileLink />
    </>
  );
}

export default SidebarItems;
