// API
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

export const getImage = async (gambar, token) => {
    const res = await api.get(`/api/images/${gambar}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
    });

    return URL.createObjectURL(res.data);
};

export const uploadImage = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/api/uploadImage", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};
