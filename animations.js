// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing animations...');
    
    // Safe initialization with error handling
    try {
        createParticles();
        initScrollReveal();
        initTypewriter();
        initMobileMenu();
        console.log('All animations initialized successfully!');
    } catch (error) {
        console.error('Error initializing animations:', error);
    }
});

// Create floating code particles
function createParticles() {
    try {
        const particlesContainer = document.querySelector('.cyber-bg');
        if (!particlesContainer) {
            console.log('Particles container not found');
            return;
        }
        
        const characters = ['{court}', '[tech]', '(2025);', 'whatsapp', '00110110', '1010011', 'bot.', 'js', 'node'];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'code-particle';
            particle.textContent = characters[Math.floor(Math.random() * characters.length)];
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.fontSize = (Math.random() * 20 + 40) + 'px';
            
            particlesContainer.appendChild(particle);
        }
        
        console.log('Particles created:', particleCount);
    } catch (error) {
        console.error('Error creating particles:', error);
    }
}

// Scroll reveal animation
function initScrollReveal() {
    try {
        const reveals = document.querySelectorAll('.scroll-reveal');
        if (reveals.length === 0) {
            console.log('No scroll reveal elements found');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
        
        console.log('Scroll reveal initialized for', reveals.length, 'elements');
    } catch (error) {
        console.error('Error initializing scroll reveal:', error);
    }
}

// Typewriter effect
function initTypewriter() {
    try {
        const typewriterElements = document.querySelectorAll('.typewriter');
        if (typewriterElements.length === 0) {
            console.log('No typewriter elements found');
            return;
        }
        
        typewriterElements.forEach(el => {
            const originalText = el.textContent.trim();
            if (!originalText) return;
            
            el.textContent = '';
            el.style.borderRight = '2px solid var(--accent-cyan)';
            
            let currentIndex = 0;
            const typeSpeed = 100; // ms per character
            
            const typeInterval = setInterval(() => {
                if (currentIndex < originalText.length) {
                    el.textContent += originalText.charAt(currentIndex);
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    // Keep cursor blinking for a moment, then remove
                    setTimeout(() => {
                        el.style.borderRight = 'none';
                    }, 1000);
                }
            }, typeSpeed);
        });
        
        console.log('Typewriter effect initialized for', typewriterElements.length, 'elements');
    } catch (error) {
        console.error('Error initializing typewriter:', error);
    }
}

// Mobile menu functionality - SIMPLIFIED AND STABLE
function initMobileMenu() {
    try {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navToggle || !navLinks) {
            console.log('Mobile menu elements not found');
            return;
        }
        
        console.log('Mobile menu elements found, setting up listeners');
        
        let isMenuOpen = false;
        
        // Toggle menu on button click
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Open menu
                navToggle.classList.add('active');
                navLinks.classList.add('active');
                navLinks.style.display = 'flex';
                
                // Force reflow for smooth animation
                navLinks.offsetHeight;
                
                setTimeout(() => {
                    navLinks.style.opacity = '1';
                    navLinks.style.transform = 'translateY(0)';
                }, 10);
                
                console.log('Menu opened');
            } else {
                // Close menu
                closeMenu();
            }
        });
        
        // Close menu when clicking on links
        const navLinksItems = navLinks.querySelectorAll('a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
                console.log('Menu closed via link click');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !navToggle.contains(e.target) && 
                !navLinks.contains(e.target)) {
                closeMenu();
                console.log('Menu closed via outside click');
            }
        });
        
        // Prevent menu from closing when clicking inside it
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Close menu function
        function closeMenu() {
            isMenuOpen = false;
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                if (!isMenuOpen) { // Double check we still want to close
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        console.log('Mobile menu initialized successfully');
        
    } catch (error) {
        console.error('Error initializing mobile menu:', error);
    }
}

// Utility function: Shake animation
function shakeElement(element) {
    try {
        if (!element || !(element instanceof Element)) {
            console.log('Invalid element for shake animation');
            return;
        }
        
        element.classList.add('shake');
        setTimeout(() => {
            if (element.classList.contains('shake')) {
                element.classList.remove('shake');
            }
        }, 500);
    } catch (error) {
        console.error('Error in shake animation:', error);
    }
}

// Utility function: Particle burst effect
function createParticleBurst(x, y) {
    try {
        const burst = document.createElement('div');
        burst.className = 'particle-burst';
        burst.style.position = 'fixed';
        burst.style.left = x + 'px';
        burst.style.top = y + 'px';
        burst.style.zIndex = '10000';
        burst.style.pointerEvents = 'none';
        
        document.body.appendChild(burst);
        
        // Auto-remove after animation
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 600);
        
    } catch (error) {
        console.error('Error creating particle burst:', error);
    }
}

// Global click handler for button effects
document.addEventListener('click', function(e) {
    try {
        if (e.target.classList.contains('action-btn') && 
            e.target.classList.contains('btn-active') &&
            e.target.href && // Only if it has a link
            e.target.href !== '#') {
            
            createParticleBurst(e.clientX, e.clientY);
        }
    } catch (error) {
        console.error('Error in button click handler:', error);
    }
});

// Export functions for global access (optional)
if (typeof window !== 'undefined') {
    window.Animations = {
        createParticles,
        initScrollReveal,
        initTypewriter,
        initMobileMenu,
        shakeElement,
        createParticleBurst
    };
}