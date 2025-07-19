// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize particles.js with enhanced configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#FF6F0D'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#FF6F0D',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Enhanced typing effect
const text = "Perfection. Transparency. Delivery.";
const typingText = document.getElementById('typing-text');
let i = 0;
let isDeleting = false;
let currentText = '';
let typeSpeed = 100;

function typeWriter() {
    if (i < text.length && !isDeleting) {
        currentText = text.substring(0, i + 1);
        typingText.textContent = currentText;
        i++;
        typeSpeed = 100;
    } else if (i === text.length && !isDeleting) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting) {
        currentText = text.substring(0, i);
        typingText.textContent = currentText;
        i--;
        typeSpeed = 50;
        if (i === 0) {
            isDeleting = false;
            typeSpeed = 1000;
        }
    }
    setTimeout(typeWriter, typeSpeed);
}

// Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    setTimeout(() => {
        loading.classList.add('hidden');
        typeWriter();
    }, 1000);
});

// Scroll to top functionality
const scrollToTop = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced mobile menu
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

// Remove conflicting logic and only use .active
if (menuToggle && closeMenu && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Enhanced navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-transparent');
        
        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-transparent');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
    
    cursorDot.style.left = e.clientX - 2 + 'px';
    cursorDot.style.top = e.clientY - 2 + 'px';
});

// Add hover effect to clickable elements
const clickableElements = document.querySelectorAll('a, button, input, .btn-primary, .btn-outline');

clickableElements.forEach(element => {
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

// Enhanced Disclaimer Modal
const disclaimerModal = document.getElementById('disclaimerModal');
const disclaimerAccept = document.getElementById('disclaimerAccept');
const proceedToWebsiteBtn = document.getElementById('proceedToWebsite');

disclaimerModal.style.display = 'block';
document.body.style.overflow = 'hidden';
setTimeout(() => {
    disclaimerModal.classList.add('show');
}, 100);

disclaimerAccept.addEventListener('change', () => {
    proceedToWebsiteBtn.disabled = !disclaimerAccept.checked;
});

proceedToWebsiteBtn.addEventListener('click', () => {
    if (disclaimerAccept.checked) {
        disclaimerModal.classList.remove('show');
        setTimeout(() => {
            disclaimerModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 400);
    }
});

// Image lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Newsletter Form Handling
const newsletterForms = document.querySelectorAll('form[class*="newsletter"]');

newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonHTML = submitButton.innerHTML;
    
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
    
        const email = emailInput.value.trim();
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            submitButton.innerHTML = originalButtonHTML;
            submitButton.disabled = false;
            return;
        }
    
        try {
            // 1. Send with EmailJS
            const templateParams = {
                from_email: email,
                to_name: 'Narayani Associates',
                message: 'Newsletter subscription request',
                subject: 'New Newsletter Subscription'
            };
    
            await emailjs.send(
                'service_v280jqs',       // Your EmailJS service ID
                'template_5ijkkd8',      // Your EmailJS template ID
                templateParams
            );
    
            // 2. Check if email already exists in Sheet.best
            const sheetResponse = await fetch('https://api.sheetbest.com/sheets/03134ab4-b14e-42ac-afc7-074cad9fe647');
            const existingEmails = await sheetResponse.json();
    
            // Check if email is already subscribed
            const emailExists = existingEmails.some(entry => entry.email?.toLowerCase() === email.toLowerCase());
    
            if (emailExists) {
                alert('You have already subscribed to the newsletter.');
            } else {
                // 3. If not, add email to Sheet.best
                const postResponse = await fetch('https://api.sheetbest.com/sheets/03134ab4-b14e-42ac-afc7-074cad9fe647', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
    
                if (!postResponse.ok) throw new Error('Failed to save subscription.');
    
                alert('Thank you for subscribing to our newsletter!');
                form.reset();
            }
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            alert('There was an error subscribing. Please try again later.');
        } finally {
            submitButton.innerHTML = originalButtonHTML;
            submitButton.disabled = false;
        }
    });
});
        
