// Loading Animation
function initializeLoadingAnimation() {
    const loading = document.querySelector('.loading');
    if (loading) {
        // Hide loading animation when page is fully loaded
        window.addEventListener('load', () => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        });
    }
}

// Scroll to Top Button
function initializeScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all UI components
document.addEventListener('DOMContentLoaded', () => {
    initializeLoadingAnimation();
    initializeScrollToTop();
}); 