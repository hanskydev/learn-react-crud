// React
import React, { useEffect, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Services
import { findAllProduk } from "../../services/ProdukService";

// Layout
import Main from "../../layout/Main";

// PrimeReact Components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";

const Produk = () => {
    const [produk, setProduk] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const response = await findAllProduk();
                setProduk(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        load();
    }, []);

    const namaBodyTemplate = (row) => {
        return (
            <Link to={`/admin/produk/detail/${row.id}`} className="cell-link">
                {row.nama}
            </Link>
        );
    };

    return (
        <Main>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Produk</h2>
                            <div>
                                <Link to="/admin/produk/create" style={{ textDecoration: "none" }}>
                                    <Button label="Tambah" icon="pi pi-plus" />
                                </Link>
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable value={produk} size="small" className="table-view" stripedRows>
                                    <Column field="nama" header="Nama Produk" body={namaBodyTemplate} />
                                    <Column field="kategori.nama" header="Kategori" />
                                    <Column field="harga" header="Harga" style={{ width: "100px" }} />
                                    <Column field="stok" header="Stok" style={{ width: "100px" }} />
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Produk;
