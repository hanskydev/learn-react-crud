// API
import api from "./api";

export const findAllKategori = async () => {
    return await api.get("/api/kategori/");
};

export const createKategori = async (kategori) => {
    return await api.post("/api/kategori/", kategori);
};

export const updateKategori = async (kategori) => {
    return await api.put("/api/kategori/", kategori);
};

export const deleteKategoriById = async (id) => {
    return await api.delete(`/api/kategori/${id}`);
};
