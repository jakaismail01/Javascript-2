// =============================================================
// nilai.js - LOGIKA hitung nilai, berjalan di BROWSER
// =============================================================

function hitungNilaiAkhir(tugas, uts, uas) {
  // Bobot standar: Tugas 30%, UTS 30%, UAS 40% (dibulatkan 2 desimal)
  const hasil = (0.3 * tugas) + (0.3 * uts) + (0.4 * uas);
  return Number(hasil.toFixed(2));
}

function tentukanGrade(nilai) {
  if (nilai >= 85) return 'A';
  if (nilai >= 75) return 'B';
  if (nilai >= 60) return 'C';
  if (nilai >= 50) return 'D';
  return 'E';
}

function buatRekap(daftar) {
  return daftar.map((m) => {
    const nilaiAkhir = hitungNilaiAkhir(m.tugas, m.uts, m.uas);
    const grade = tentukanGrade(nilaiAkhir);
    const lulus = grade === 'A' || grade === 'B' || grade === 'C';
    return {
      ...m,
      nilaiAkhir,
      grade,
      lulus,
    };
  });
}

function hitungRataRata(rekap) {
  if (rekap.length === 0) return 0;
  const total = rekap.reduce((acc, m) => acc + m.nilaiAkhir, 0);
  return Number((total / rekap.length).toFixed(2));
}

function cariTertinggi(rekap) {
  if (rekap.length === 0) return null;
  return rekap.reduce((tertinggi, m) =>
    m.nilaiAkhir > tertinggi.nilaiAkhir ? m : tertinggi
  );
}

function hitungDistribusiGrade(rekap) {
  const distribusi = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  for (const m of rekap) {
    if (distribusi[m.grade] !== undefined) {
      distribusi[m.grade]++;
    }
  }
  return distribusi;
}

function cariMahasiswa(rekap, kataKunci) {
  const keyword = kataKunci.trim().toLowerCase();
  if (!keyword) return rekap;
  return rekap.filter(
    (m) =>
      m.nama.toLowerCase().includes(keyword) ||
      m.nim.toLowerCase().includes(keyword)
  );
}

// ---- Sudah jadi: validasi input mahasiswa baru (dipakai sebelum memanggil api.js) ----
function validasiMahasiswa(input) {
  const errors = [];
  if (typeof input.nim !== 'string' || !/^\d{7}$/.test(input.nim)) {
    errors.push('NIM harus 7 digit angka');
  }
  if (typeof input.nama !== 'string' || input.nama.trim().length < 3) {
    errors.push('Nama minimal 3 karakter');
  }
  for (const kolom of ['tugas', 'uts', 'uas']) {
    const n = input[kolom];
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
      errors.push(`Nilai ${kolom} harus angka 0-100`);
    }
  }
  return errors;
}