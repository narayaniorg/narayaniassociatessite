// Create cursor elements
const cursor = document.createElement('div');
cursor.className = 'cursor-particle';
document.body.appendChild(cursor);

// Create trail elements
const trails = Array.from({ length: 20 }, () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    return trail;
});

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let trailX = 0;
let trailY = 0;
let isMoving = false;
let moveTimeout;

// Update cursor position
function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        isMoving = false;
    }, 100);
}

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    
    // Update cursor position
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    // Update trail positions
    if (isMoving) {
        trails.forEach((trail, index) => {
            const delay = index * 2;
            setTimeout(() => {
                trailX = cursorX;
                trailY = cursorY;
                trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
                trail.classList.add('active');
                
                setTimeout(() => {
                    trail.classList.remove('active');
                }, 500);
            }, delay);
        });
    }
    
    requestAnimationFrame(animateCursor);
}

// Handle mouse movement
document.addEventListener('mousemove', updateCursor);

// Handle touch devices
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    updateCursor({
        clientX: touch.clientX,
        clientY: touch.clientY
    });
});

// Start animation
animateCursor();

// Handle interactive elements
const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.background = 'var(--primary-light)';
        cursor.style.mixBlendMode = 'normal';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--primary)';
        cursor.style.mixBlendMode = 'difference';
    });
});

// Handle reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    cursor.style.display = 'none';
    trails.forEach(trail => trail.style.display = 'none');
} 