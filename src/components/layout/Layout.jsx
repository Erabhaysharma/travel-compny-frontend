import Navbar from "./Navbar";
import SocialSidebar from "./SocialSidebar";
import BookSeatModal from "../modals/BookSeatModal";
import NotifyMeModal from "../modals/NotifyMeModal";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>{children}</main>
      <Footer/>

      {/* Rendered once at the root so any page/component can trigger them via useModal() */}
      <BookSeatModal />
      <NotifyMeModal />
    </>
  );
}
