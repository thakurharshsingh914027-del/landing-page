/**
 * Neural Academy - Core Site Logic
 * Version: 2.0 (Internship Ready)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVIGATION LOGIC ---
    const navbar = document.getElementById('navbar');
    
    /**
     * Handles the glassmorphism effect and height change on scroll.
     * Uses { passive: true } to prevent scroll lag on mobile devices.
     */
    const handleNavbarScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-glass', 'shadow-xl');
            navbar.classList.remove('py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('nav-glass', 'shadow-xl');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-6');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    // --- 2. SCROLL REVEAL ANIMATIONS ---
    /**
     * Uses the Intersection Observer API.
     * This is far more performant than listening to scroll events 
     * to trigger animations.
     */
    const revealOptions = {
        threshold: 0.15,      // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before it hits the viewport
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class defined in your CSS
                entry.target.classList.add('active');
                
                // IMPORTANT: Stop watching this element once it's visible.
                // This saves CPU and Memory!
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    // Apply observer to all elements with the 'reveal' class
    const elementsToReveal = document.querySelectorAll('.reveal');
    elementsToReveal.forEach(el => revealObserver.observe(el));


    // --- 3. FORM & INTERACTIVITY LOGIC ---
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const newsletterForm = document.getElementById('newsletterForm');

    /**
     * Handle Contact Form Submission with Mock API Loading State
     */
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerHTML;

            // Visual Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i> Sending...';

            // Simulate a network request (1.5 seconds)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message and hide form
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');

            console.log("Form Log: Lead captured successfully.");
        });
    }

    /**
     * Handle Footer Newsletter with UI Feedback
     */
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            const submitBtn = newsletterForm.querySelector('button');

            // Success feedback
            submitBtn.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.classList.replace('bg-blue-600', 'bg-emerald-600');
            emailInput.value = "Subscribed!";
            emailInput.disabled = true;
            
            console.log("Newsletter Log: Email added to distribution list.");
        });
    }
});