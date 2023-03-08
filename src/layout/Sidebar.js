import React from "react";

import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
    const { signout, user } = useAuth();

    const userMenus = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: dashboardUserTemplate,
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout(),
        },
    ];

    const adminMenus = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: dashboardTemplate,
        },
        {
            label: "Pesanan",
            icon: "pi pi-shopping-cart",
            template: pesananTemplate,
        },
        {
            label: "Kategori",
            icon: "pi pi-tags",
            template: kategoriTemplate,
        },
        {
            label: "Produk",
            icon: "pi pi-box",
            template: produkTemplate,
        },
        {
            label: "Pengguna",
            icon: "pi pi-users",
            template: penggunaTemplate,
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout(),
        },
    ];

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <Menu model={user.role === "admin" ? adminMenus : userMenus} />
        </div>
    );
};

// Define the template functions outside of the Sidebar component
const dashboardTemplate = (item, options) => {
    return (
        <Link to="/admin/dashboard" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

const pesananTemplate = (item, options) => {
    return (
        <Link to="/admin/pesanan" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

const kategoriTemplate = (item, options) => {
    return (
        <Link to="/admin/kategori" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

const produkTemplate = (item, options) => {
    return (
        <Link to="/admin/produk" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

const penggunaTemplate = (item, options) => {
    return (
        <Link to="/admin/pengguna" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

const dashboardUserTemplate = (item, options) => {
    return (
        <Link to="/user/dashboard" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
        </Link>
    );
};

export default Sidebar;
