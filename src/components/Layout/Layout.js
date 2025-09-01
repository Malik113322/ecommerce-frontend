import Headers from "./Headers";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title }) => {
  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="title" content={title} />
      </Helmet>
      <Headers />
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "eCommerce App",
};

export default Layout;
