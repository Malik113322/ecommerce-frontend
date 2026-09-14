import Headers from "./Headers";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

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
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "eCommerce App",
};

export default Layout;
