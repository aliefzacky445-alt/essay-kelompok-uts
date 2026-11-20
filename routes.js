import express from "express";
import pesanan from "./data.js";

const router = express.Router();

router.get("/pesanan", (req, res) => {
  res.json({
    pesan: "Daftar semua pesanan berhasil diambil",
    data: pesanan
  });
});

// 2. ROUTE MENCARI DATA BERDASARKAN NAMA MENU (GET + Perulangan)
router.get("/pesanan/cari", (req, res) => {
  const keyword = req.query.nama?.toLowerCase() || "";
  const hasilCari = [];

  // Menggunakan perulangan (for) untuk mencari data
  for (let i = 0; i < pesanan.length; i++) {
    if (pesanan[i].namaMenu && pesanan[i].namaMenu.toLowerCase().includes(keyword)) {
      hasilCari.push(pesanan[i]);
    }
  }

  res.json({
    pesan: `Hasil pencarian untuk '${keyword}'`,
    data: hasilCari
  });
});

router.post("/pesanan", (req, res) => {
  const { namaMenu, harga, jumlah } = req.body;

  const subtotal = harga * jumlah;
  let diskon = 0;

  if (subtotal >= 50000) {
    diskon = 5000;
  }

  const totalHarga = subtotal - diskon;

  const pesananBaru = {
    id: pesanan.length > 0 ? pesanan[pesanan.length - 1].id + 1 : 1,
    namaMenu,
    harga,
    jumlah,
    diskon,
    totalHarga
  };

  pesanan.push(pesananBaru);

  res.status(201).json({
    pesan: "Pesanan berhasil ditambahkan",
    data: pesananBaru
  });
});

router.put("/pesanan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { namaMenu, harga, jumlah } = req.body;

  const index = pesanan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ pesan: "Pesanan tidak ditemukan" });
  }

  const subtotal = harga * jumlah;
  const diskon = subtotal >= 50000 ? 5000 : 0;
  const totalHarga = subtotal - diskon;

  pesanan[index] = {
    id,
    namaMenu,
    harga,
    jumlah,
    diskon,
    totalHarga
  };

  res.json({
    pesan: "Pesanan berhasil diubah",
    data: pesanan[index]
  });
});

router.delete("/pesanan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pesanan.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ pesan: "Pesanan tidak ditemukan" });
  }

  const dihapus = pesanan.splice(index, 1);

  res.json({
    pesan: "Pesanan berhasil dihapus",
    data: dihapus[0]
  });
});

export default router;