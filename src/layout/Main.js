import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Main = ({ children }) => {
    return (
        <div>
            <Header />
            <Sidebar />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Main;
