// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize EmailJS first
        if (typeof emailjs === 'undefined') {
            // Load EmailJS if not already loaded
            await loadScript('https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js');
        }
        
        // Initialize EmailJS with your public key
        emailjs.init("uTTToUvth5zoNBAth");

        // Load components in sequence
        await loadNavbar();
        await loadFooter();
        await loadModal();

        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true
            });
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Helper function to load scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Load footer
async function loadFooter() {
    try {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) {
            console.warn('Footer placeholder not found');
            return;
        }

        const response = await fetch('./components/footer.html');
        if (!response.ok) {
            throw new Error(`Failed to load footer: ${response.status}`);
        }
        const footerHTML = await response.text();
        footerPlaceholder.innerHTML = footerHTML;
        
        // Initialize newsletter functionality after footer loads
        setTimeout(() => {
            initializeNewsletter();
        }, 100); // Small delay to ensure DOM is updated
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load navbar
async function loadNavbar() {
    try {
        const navbarPlaceholder = document.getElementById('navbar-placeholder');
        if (!navbarPlaceholder) {
            console.warn('Navbar placeholder not found');
            return;
        }

        const response = await fetch('./components/navbar.html');
        if (!response.ok) {
            throw new Error(`Failed to load navbar: ${response.status}`);
        }
        const navbarHTML = await response.text();
        navbarPlaceholder.innerHTML = navbarHTML;
        
        // Initialize navbar functionality after loading
        initializeNavbar();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Load modal
async function loadModal() {
    try {
        const modalPlaceholder = document.getElementById('modal-placeholder');
        if (!modalPlaceholder) {
            console.warn('Modal placeholder not found');
            return;
        }

        const response = await fetch('./components/modal.html');
        if (!response.ok) {
            throw new Error(`Failed to load modal: ${response.status}`);
        }
        const modalHTML = await response.text();
        modalPlaceholder.innerHTML = modalHTML;
        
        // Initialize modal functionality after loading
        initializeModal();
    } catch (error) {
        console.error('Error loading modal:', error);
    }
}

// Initialize newsletter functionality
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('form.newsletter-form');
    if (!newsletterForms.length) {
        console.warn('No newsletter forms found');
        return;
    }

    newsletterForms.forEach(form => {
        // Remove any existing event listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        newForm.addEventListener('submit', async (e) => {
            e.preventDefault();
        
            const emailInput = newForm.querySelector('input[type="email"]');
            const submitButton = newForm.querySelector('button[type="submit"]');
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
                // Check if EmailJS is loaded
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS not loaded. Please refresh the page and try again.');
                }

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
                    alert('You have already subscribed to our newsletter.');
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
                    newForm.reset();
                }
            } catch (error) {
                console.error('Newsletter subscription failed:', error);
                alert(error.message || 'There was an error subscribing. Please try again later.');
            } finally {
                submitButton.innerHTML = originalButtonHTML;
                submitButton.disabled = false;
            }
        });
    });
}

// Initialize navbar functionality
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }

    // Set initial state
    if (window.scrollY > 50) {
        navbar.classList.add('bg-black');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-transparent');
    }

    // Update on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-black');
            navbar.classList.add('bg-transparent');
        }
    });

    // Initialize mobile menu
    initializeMobileMenu();
}

// Initialize mobile menu
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (!menuToggle || !closeMenu || !mobileMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    });

    // Close menu
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Initialize modal
function initializeModal() {
    const disclaimerModal = document.getElementById('disclaimerModal');
    const disclaimerAccept = document.getElementById('disclaimerAccept');
    const proceedToWebsiteBtn = document.getElementById('proceedToWebsite');

    if (disclaimerModal && disclaimerAccept && proceedToWebsiteBtn) {
        // Show modal if disclaimer hasn't been accepted
        if (!localStorage.getItem('disclaimerAccepted')) {
            disclaimerModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                disclaimerModal.classList.add('show');
            }, 100);
        }

        // Handle checkbox change
        disclaimerAccept.addEventListener('change', () => {
            proceedToWebsiteBtn.disabled = !disclaimerAccept.checked;
        });

        // Handle proceed button click
        proceedToWebsiteBtn.addEventListener('click', () => {
            if (disclaimerAccept.checked) {
                localStorage.setItem('disclaimerAccepted', 'true');
                disclaimerModal.classList.remove('show');
                setTimeout(() => {
                    disclaimerModal.style.display = 'none';
                    document.body.style.overflow = '';
                }, 400);
            }
        });
    }
}

