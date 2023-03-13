// React
import React, { useEffect, useState } from "react";

// React Router
import { useNavigate } from "react-router-dom";

// Auth Manager
import { getTokenFromLocalStorage } from "../../auth/useAuth";

// Services
import { findAllKategori } from "../../services/KategoriService";
import { createProduk, uploadImage } from "../../services/ProdukService";

// Layout
import Main from "../../layout/Main";

// PrimeReact Components
import { ProgressBar } from "primereact/progressbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";

const ProdukCreate = () => {
    const token = getTokenFromLocalStorage();
    const [produk, setProduk] = useState({
        id: null,
        nama: "",
        gambar: "",
        kategori: { id: null },
        deskripsi: "",
        stok: 0,
        harga: 0,
    });
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submited, setSubmited] = useState(false);

    const navigate = useNavigate();
    const [img, setImg] = useState();

    useEffect(() => {
        const loadKategori = async () => {
            try {
                const response = await findAllKategori();
                setKategori(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        loadKategori();
        setLoading(false);
    }, []);

    const saveProduk = async () => {
        try {
            setSubmited(true);
            const response = await createProduk(produk);
            const _produk = response.data;
            navigate(`/admin/produk/detail/${_produk.id}`, {
                replace: true,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onUpload = async (event) => {
        try {
            const [file] = event.files;
            const imageObjectURL = URL.createObjectURL(file);
            setImg(imageObjectURL);

            const response = await uploadImage(file, token);
            setProduk((prev) => ({
                ...prev,
                gambar: response.fileName,
            }));
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const onBeforeSend = (event) => {
        if (token) {
            event.xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value || "";
        setProduk((prevProduk) => ({
            ...prevProduk,
            [field]: value,
        }));
    };

    const handleDropdownChange = (e) => {
        const value = e.target.value || null;
        setProduk((prevProduk) => ({
            ...prevProduk,
            kategori: { id: value },
        }));
    };

    return (
        <Main>
            {loading ? (
                <ProgressBar mode="indeterminate" className="my-progress-bar" />
            ) : (
                <div className="main-content">
                    <div className="content">
                        <div className="content-inner">
                            <div className="content-header">
                                <h2>Tambah Produk</h2>
                            </div>
                            <div className="content-body">
                                <div className="content-form shadow-1">
                                    <div className="flex">
                                        <div className="flex-grow-1">
                                            <div className="p-fluid mb-4">
                                                <div className="p-field mb-3">
                                                    <label htmlFor="nama" className="form-label">
                                                        Nama
                                                    </label>
                                                    <InputText
                                                        value={produk.nama}
                                                        placeholder="Ketik nama produk"
                                                        id="nama"
                                                        onChange={(e) => handleInputChange(e, "nama")}
                                                    />
                                                    {submited && !produk.nama && (
                                                        <span className="p-error">Nama produk tidak boleh kosong</span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="kategori" className="form-label">
                                                        Kategori
                                                    </label>
                                                    <Dropdown
                                                        optionLabel="nama"
                                                        optionValue="id"
                                                        id="kategori"
                                                        value={produk.kategori.id}
                                                        options={kategori}
                                                        placeholder="Pilih kategori"
                                                        onChange={handleDropdownChange}
                                                    />
                                                    {submited && !produk.kategori.id && (
                                                        <span className="p-error">Kategori produk harus dipilih</span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="deskripsi" className="form-label">
                                                        Deskripsi
                                                    </label>
                                                    <InputText
                                                        value={produk.deskripsi}
                                                        placeholder="Ketik deskripsi produk"
                                                        id="deskripsi"
                                                        onChange={(e) => handleInputChange(e, "deskripsi")}
                                                    />
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="harga" className="form-label">
                                                        Harga
                                                    </label>
                                                    <InputText
                                                        value={produk.harga}
                                                        placeholder="Ketik harga produk"
                                                        id="harga"
                                                        onChange={(e) => handleInputChange(e, "harga")}
                                                    />
                                                    {submited && !produk.harga && (
                                                        <span className="p-error">Harga produk tidak boleh kosong</span>
                                                    )}
                                                </div>

                                                <div className="p-field mb-3">
                                                    <label htmlFor="stok" className="form-label">
                                                        Stok
                                                    </label>
                                                    <InputText
                                                        value={produk.stok}
                                                        placeholder="Ketik stok produk"
                                                        id="stok"
                                                        onChange={(e) => handleInputChange(e, "stok")}
                                                    />
                                                    {submited && !produk.stok && (
                                                        <span className="p-error">Stok produk tidak boleh kosong</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Button label="Simpan" icon="pi pi-check" onClick={saveProduk} />
                                            </div>
                                        </div>
                                        <div className="flex-none ml-6 mt-4" style={{ textAlign: "center" }}>
                                            <div className="image-display-wrapper">
                                                {img ? (
                                                    <img src={img} alt="Gambar Produk" className="image-display" />
                                                ) : (
                                                    <i className="icon-display pi pi-image"></i>
                                                )}
                                            </div>
                                            <FileUpload
                                                name="file"
                                                accept="image/*"
                                                onUpload={onUpload}
                                                onBeforeSend={onBeforeSend}
                                                chooseLabel="Pilih Gambar"
                                                mode="basic"
                                                auto
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Main>
    );
};

export default ProdukCreate;
