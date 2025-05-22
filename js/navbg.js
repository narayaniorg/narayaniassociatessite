
        AOS.init({
            duration: 1000,
            once: true
        });

        // Navbar Background Change on Scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-black');
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.remove('bg-black');
                navbar.classList.add('bg-transparent');
            }
        });
