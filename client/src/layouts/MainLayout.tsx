import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
