import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/header.tsx";

const Layout = ({Component}: PageProps) => {
    return(
        <div class="layout">
            <Header/>
            <div>
                <Component/>
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;