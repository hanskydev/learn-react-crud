// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

// Auth Manager
import { useAuth } from "../auth/useAuth";

// PrimeReact Components
import { Menu } from "primereact/menu";

const Sidebar = () => {
    const { signout, user } = useAuth();

    const createMenuItem = (label, icon, to, command) => ({
        label,
        icon,
        template: (item, options) => (
            <Link to={to} className={options.className}>
                <span className={options.iconClassName}></span>
                <span className={options.labelClassName}>{item.label}</span>
            </Link>
        ),
        command,
    });

    const userMenus = [
        createMenuItem("Dashboard", "pi pi-th-large", "/user/dashboard"),
        { label: "Sign Out", icon: "pi pi-sign-out", command: () => signout() },
    ];

    const adminMenus = [
        createMenuItem("Dashboard", "pi pi-th-large", "/admin/dashboard"),
        createMenuItem("Pesanan", "pi pi-shopping-cart", "/admin/pesanan"),
        createMenuItem("Kategori", "pi pi-tags", "/admin/kategori"),
        createMenuItem("Produk", "pi pi-box", "/admin/produk"),
        createMenuItem("Pengguna", "pi pi-users", "/admin/pengguna"),
        { label: "Sign Out", icon: "pi pi-sign-out", command: () => signout() },
    ];

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <Menu model={user.role === "admin" ? adminMenus : userMenus} />
        </div>
    );
};

export default Sidebar;
