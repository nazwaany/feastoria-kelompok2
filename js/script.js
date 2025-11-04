let mejaTerpakai = 0;
let pelangganSelesai = 0;
let penjualan = 0;
const hargaPerMeja = 100000;

function updateDisplay() {
    document.getElementById("mejaTerpakai").textContent = mejaTerpakai;

    document.getElementById("pelangganSelesai").textContent = pelangganSelesai;

    document.getElementById("penjualan").textContent = penjualan.toLocaleString();

    document.getElementById("keuntungan").textContent = (penjualan * 0.7).toLocaleString();
}

function tambahReservasi() {
    mejaTerpakai++;
    penjualan += hargaPerMeja;
    updateDisplay();
}

function selesaiMakan() {
    if (mejaTerpakai > 0) {
        mejaTerpakai--;
        pelangganSelesai++;
        updateDisplay();
    }
}

function resetData() {
    mejaTerpakai = 0;
    pelangganSelesai = 0;
    penjualan = 0;
    updateDisplay();
}
