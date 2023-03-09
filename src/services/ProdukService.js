import api from "./api";

export const findAllProduk = async () => {
    return await api.get("/api/produk/");
};

export const findProdukById = async (id) => {
    return await api.get(`/api/produk/${id}`);
};

export const createProduk = async (produk) => {
    return await api.post("/api/produk/", produk);
};

export const updateProduk = async (produk) => {
    return await api.put("/api/produk/", produk);
};

export const deleteProdukById = async (id) => {
    return await api.delete(`/api/produk/${id}`);
};
