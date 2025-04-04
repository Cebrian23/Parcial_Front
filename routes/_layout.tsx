import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Head from "../components/Head.tsx";

const Layout = ({Component}: PageProps) => {
    return(
        <div class="layout">
            <Head/>
            <div>
                <Component/>
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;