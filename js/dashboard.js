document.addEventListener("DOMContentLoaded", function() {
    const dashboard = document.querySelector('.dashboard-container');
    let hasAnimated = false;

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            
            if (obj.id === 'penjualanHariIni') {
                obj.innerHTML = currentValue.toLocaleString('id-ID');
            } else {
                obj.innerHTML = currentValue;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                const mejaElem = document.getElementById("mejaDireservasi");
                const pelangganElem = document.getElementById("pelangganSelesai");
                const penjualanElem = document.getElementById("penjualanHariIni");

                animateValue(mejaElem, 0, 15, 2000);
                animateValue(pelangganElem, 0, Math.floor(Math.random() * (400 - 100 + 1)) + 100, 2000);
                animateValue(penjualanElem, 0, Math.floor(Math.random() * (2500000 - 1000000 + 1)) + 1000000, 2000);
                
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, { threshold: 0.5 });

    if (dashboard) {
        observer.observe(dashboard);
    }
});