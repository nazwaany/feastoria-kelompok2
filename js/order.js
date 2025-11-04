document.addEventListener('DOMContentLoaded', function () {
    const orderListContainer = document.querySelector('.order-list');
    const totalPriceElement = document.getElementById('total-price');
    const reserveBtn = document.querySelector('.reserve-btn');

    // Fungsi untuk merender daftar pesanan dari sessionStorage
    function renderOrderList() {
        const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
        orderListContainer.innerHTML = ''; // Kosongkan daftar sebelum merender ulang
        let totalPrice = 0;

        if (orders.length > 0) {
            orders.forEach((order, index) => {
                const orderItem = document.createElement('div');
                orderItem.classList.add('order-item');
                orderItem.style.display = 'flex';
                orderItem.style.justifyContent = 'space-between';
                orderItem.style.alignItems = 'center';
                orderItem.style.marginBottom = '10px';

                const price = parseFloat(order.price);
                totalPrice += price;

                orderItem.innerHTML = `
                    <span>${order.name}</span>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span>Rp${price.toLocaleString('id-ID')}</span>
                        <button class="remove-item-btn" data-index="${index}" style="background: #ff4d4d; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; line-height: 20px;">-</button>
                    </div>
                `;
                orderListContainer.appendChild(orderItem);
            });

            totalPriceElement.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;
            reserveBtn.disabled = false;
            reserveBtn.classList.add('active');
        } else {
            totalPriceElement.textContent = '-';
            reserveBtn.disabled = true;
            reserveBtn.classList.remove('active');
        }
    }

    // --- Logika untuk Halaman Menu ---
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();

            const name = this.dataset.name;
            const price = this.dataset.price;

            if (name && price) {
                let orders = JSON.parse(sessionStorage.getItem('orders')) || [];
                orders.push({ name, price });
                sessionStorage.setItem('orders', JSON.stringify(orders));

                // Arahkan kembali ke halaman reservasi
                window.location.href = '../reservasi.html';
            }
        });
    });

    // --- Logika untuk Halaman Reservasi ---
    if (orderListContainer) {
        renderOrderList();

        // Event listener untuk tombol hapus item
        orderListContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-item-btn')) {
                const itemIndex = parseInt(event.target.dataset.index, 10);
                let orders = JSON.parse(sessionStorage.getItem('orders')) || [];
                
                // Hapus item dari array
                if (itemIndex > -1) {
                    orders.splice(itemIndex, 1);
                }

                sessionStorage.setItem('orders', JSON.stringify(orders));
                renderOrderList(); // Render ulang daftar pesanan
            }
        });

        // Event listener untuk tombol reservasi
        if (reserveBtn) {
            reserveBtn.addEventListener('click', function() {
                if (!this.disabled) {
                    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];
                    let totalPrice = 0;
                    orders.forEach(order => {
                        totalPrice += parseFloat(order.price);
                    });
                    // Simpan total harga ke sessionStorage sebelum pindah halaman
                    sessionStorage.setItem('totalPayment', totalPrice);
                    window.location.href = 'payment/jenis-bank.html';
                }
            });
        }
    }
});