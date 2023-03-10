import React, { useEffect, useState } from "react";
import Main from "../../layout/Main";
import { createKategori, deleteKategoriById, findAllKategori, updateKategori } from "../../services/KategoriService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const Kategori = () => {
    const [kategori, setKategori] = useState([]);
    const [kategoriDialog, setKategoriDialog] = useState(false);
    const [deleteKategoriDialog, setDeleteKategoriDialog] = useState(false);
    const [submited, setSubmited] = useState(false);
    const [insertMode, setInsertMode] = useState(false);

    const emptyKategori = {
        id: null,
        nama: "",
    };

    const [selectedKategori, setSelectedKategori] = useState(emptyKategori);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const response = await findAllKategori();
            setKategori(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const openNew = () => {
        setSelectedKategori(emptyKategori);
        setInsertMode(true);
        setKategoriDialog(true);
        setSubmited(false);
    };

    const hideDialog = () => {
        setKategoriDialog(false);
        setSubmited(false);
    };

    const hideDeleteDialog = () => {
        setDeleteKategoriDialog(false);
    };

    const editKategori = (kategori) => {
        setInsertMode(false);
        setSubmited(false);
        setSelectedKategori({ ...kategori });
        setKategoriDialog(true);
    };

    const confirmDeleteKategori = (kategori) => {
        setSelectedKategori(kategori);
        setDeleteKategoriDialog(true);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-text p-button-plain p-mr-2"
                    onClick={() => editKategori(rowData)}
                />

                <Button
                    icon="pi pi-times"
                    className="p-button-rounded p-button-text p-button-plain"
                    onClick={() => confirmDeleteKategori(rowData)}
                />
            </>
        );
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < kategori.length; i++) {
            if (kategori[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const saveKategori = async () => {
        try {
            setSubmited(true);
            if (selectedKategori.nama.trim()) {
                if (insertMode) {
                    const response = await createKategori(selectedKategori);
                    const data = response.data;
                    const _kategori = [...kategori];
                    _kategori.push(data);
                    setKategori(_kategori);
                } else {
                    const response = await updateKategori(selectedKategori);
                    const data = response.data;
                    const _kategori = [...kategori];
                    const index = findIndexById(data.id);
                    _kategori[index] = data;
                    setKategori(_kategori);
                }

                setInsertMode(false);
                setKategoriDialog(false);
                setSelectedKategori(emptyKategori);
                setSubmited(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteKategori = async () => {
        try {
            await deleteKategoriById(selectedKategori.id);
            let _kategori = kategori.filter((val) => val.id !== selectedKategori.id);
            setKategori(_kategori);
            setDeleteKategoriDialog(false);
            setSelectedKategori(emptyKategori);
        } catch (error) {
            console.error(error);
        }
    };

    const kategoriDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Simpan Kategori" icon="pi pi-check" className="p-button-text" onClick={saveKategori} />
        </>
    );

    const deleteKategoriDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Hapus" icon="pi pi-check" className="p-button-text" onClick={deleteKategori} />
        </>
    );

    return (
        <Main>
            <div className="main-content">
                <div className="content">
                    <div className="content-inner">
                        <div className="content-header">
                            <h2>Kategori</h2>
                            <div className="p-d-inline">
                                <Button label="Tambah" icon="pi pi-plus" className="p-mr-2" onClick={openNew} />
                            </div>
                        </div>
                        <div className="content-body">
                            <div className="content-data shadow-1">
                                <DataTable value={kategori} size="small" className="table-view" stripedRows>
                                    <Column field="nama" header="Nama Kategori"></Column>
                                    <Column
                                        body={actionBodyTemplate}
                                        style={{
                                            width: "120px",
                                            textAlign: "right",
                                        }}></Column>
                                </DataTable>
                            </div>
                        </div>

                        <Dialog
                            visible={kategoriDialog}
                            style={{ width: "500px" }}
                            header="Kategori"
                            modal
                            className="p-fluid"
                            onHide={hideDialog}
                            footer={kategoriDialogFooter}>
                            <div className="p-field">
                                <label htmlFor="nama">Nama</label>
                                <InputText
                                    id="nama"
                                    value={selectedKategori.nama}
                                    onChange={(e) => {
                                        const val = (e.target && e.target.value) || "";
                                        const _selectedKategori = { ...selectedKategori };
                                        _selectedKategori.nama = val;
                                        setSelectedKategori(_selectedKategori);
                                    }}
                                />
                                {submited && !selectedKategori.nama && (
                                    <small className="p-error">Nama harus diisi</small>
                                )}
                            </div>
                        </Dialog>

                        <Dialog
                            visible={deleteKategoriDialog}
                            style={{ width: "500px" }}
                            header="Konfirmasi"
                            modal
                            footer={deleteKategoriDialogFooter}
                            onHide={hideDeleteDialog}>
                            <div className="confirmation-content">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }}></i>
                                {selectedKategori && (
                                    <span>
                                        Apakah anda yakin akan menghapus kategori <b>{selectedKategori.nama}</b>?
                                    </span>
                                )}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Kategori;
