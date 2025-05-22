// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    // Only initialize cursor if elements exist and not on touch device
    if (cursor && cursorDot && !('ontouchstart' in window)) {
        // Hide default cursor
        document.body.style.cursor = 'none';

        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .btn, .nav-link, .social-icon, .social-link');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Add click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Handle reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    } else {
        // If cursor elements don't exist or on touch device, show default cursor
        document.body.style.cursor = 'auto';
    }
});