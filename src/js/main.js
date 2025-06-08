// Evans Handyman Services - Main JavaScript

// Configuration for random background images with SEO metadata
const BACKGROUND_IMAGES = [
    {
        url: 'images/backgrounds/hero1.jpg',
        alt: 'Professional handyman working with tools on home renovation project',
        description: 'Skilled craftsman using professional tools for quality home repairs'
    },
    {
        url: 'images/backgrounds/hero2.jpg',
        alt: 'Modern home improvement and construction work in progress',
        description: 'Professional home renovation showcasing quality workmanship'
    },
    {
        url: 'images/backgrounds/hero3.jpg',
        alt: 'Handyman tools and equipment for professional home repairs',
        description: 'Collection of professional tools used for reliable home maintenance'
    },
    {
        url: 'images/backgrounds/hero4.jpg',
        alt: 'Expert carpenter working on custom home improvement project',
        description: 'Skilled carpenter demonstrating precision in home renovation work'
    },
    {
        url: 'images/backgrounds/hero5.jpg',
        alt: 'Professional handyman services for residential maintenance and repairs',
        description: 'Quality handyman services ensuring reliable home maintenance solutions'
    }
];

// Configuration
const CONFIG = {
    scrollThreshold: 100, // pixels from top before showing nav
    animationDuration: 300 // ms for nav animation
};

class HeroManager {
    constructor() {
        this.currentBackgroundIndex = 0;
        this.heroElement = document.querySelector('.hero');
        this.aboutElement = document.querySelector('#about');
        this.headerElement = document.querySelector('.site-header');
        this.isNavVisible = false;
        this.selectedImageUrl = '';
        
        this.init();
    }

    init() {
        this.setupRandomBackground();
        this.setupScrollNavigation();
        this.preloadImages();
        this.addScrollToTopButton();
    }

    // Preload all background images for smooth transitions
    preloadImages() {
        BACKGROUND_IMAGES.forEach(imageData => {
            const img = new Image();
            img.src = imageData.url;
            img.alt = imageData.alt; // Set alt for preloaded images
        });
    }

    // Set up random background image (static per page load)
    setupRandomBackground() {
        if (!this.heroElement) return;

    // Pick a random background and set it (no rotation)
        this.currentBackgroundIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
        this.selectedImage = BACKGROUND_IMAGES[this.currentBackgroundIndex];
        
        // Set background for both hero and about sections
        this.setHeroBackground();
        this.setAboutBackground();
        this.addAccessibilityAttributes();
        
        console.log(`🎨 Random background selected: ${this.selectedImage.alt}`);
    }

    setHeroBackground() {
        if (!this.heroElement || !this.selectedImage) return;

        this.heroElement.style.backgroundImage = `url('${this.selectedImage.url}')`;
        this.heroElement.style.backgroundSize = 'cover';
        this.heroElement.style.backgroundPosition = 'center';
        this.heroElement.style.backgroundRepeat = 'no-repeat';
        this.heroElement.style.backgroundAttachment = 'fixed';
        this.heroElement.style.transition = 'none';
        
        // Force a repaint
        this.heroElement.offsetHeight;
        
        console.log(`🖼️ Background image set: ${this.selectedImage.url}`);
    }
    
    setAboutBackground() {
        if (!this.aboutElement || !this.selectedImage) return;

        // Set the same background image for about section with overlay
        this.aboutElement.style.backgroundImage = `url('${this.selectedImage.url}')`;
        this.aboutElement.style.backgroundSize = 'cover';
        this.aboutElement.style.backgroundPosition = 'center';
        this.aboutElement.style.backgroundAttachment = 'fixed';
        this.aboutElement.style.position = 'relative';
        
        // Create overlay for better text readability
        const overlay = document.createElement('div');
        overlay.className = 'about-background-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.75) 0%,
                rgba(255, 255, 255, 0.65) 50%,
                rgba(255, 255, 255, 0.75) 100%
            );
            z-index: 1;
        `;
        
        // Only add overlay if it doesn't exist
        if (!this.aboutElement.querySelector('.about-background-overlay')) {
            this.aboutElement.appendChild(overlay);
        }
        
        // Ensure content is above overlay
        const container = this.aboutElement.querySelector('.container');
        if (container) {
            container.style.position = 'relative';
            container.style.zIndex = '2';
        }
    }
    
    // Add accessibility and SEO attributes
    addAccessibilityAttributes() {
        if (!this.selectedImage) return;
        
        // Add aria-label to hero section for screen readers
        if (this.heroElement) {
            this.heroElement.setAttribute('aria-label', this.selectedImage.alt);
            this.heroElement.setAttribute('role', 'img');
        }
        
        // Add aria-label to about section
        if (this.aboutElement) {
            this.aboutElement.setAttribute('aria-label', `Background: ${this.selectedImage.alt}`);
        }
        
        // Add structured data for SEO
        this.addImageStructuredData();
        
        // Update page meta description to include image context
        this.updateMetaDescription();
    }
    
    // Add structured data for better SEO
    addImageStructuredData() {
        if (!this.selectedImage) return;
        
        // Create structured data script
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ImageObject',
            'url': window.location.origin + '/' + this.selectedImage.url,
            'description': this.selectedImage.description,
            'name': this.selectedImage.alt,
            'contentUrl': window.location.origin + '/' + this.selectedImage.url,
            'caption': this.selectedImage.alt,
            'creator': {
                '@type': 'Organization',
                'name': 'Evans Handyman Services'
            },
            'copyrightHolder': {
                '@type': 'Organization',
                'name': 'Evans Handyman Services'
            }
        };
        
        // Add or update structured data script
        let scriptTag = document.getElementById('hero-image-structured-data');
        if (!scriptTag) {
            scriptTag = document.createElement('script');
            scriptTag.type = 'application/ld+json';
            scriptTag.id = 'hero-image-structured-data';
            document.head.appendChild(scriptTag);
        }
        
        scriptTag.textContent = JSON.stringify(structuredData);
    }
    
    // Update meta description to include image context for better SEO
    updateMetaDescription() {
        if (!this.selectedImage) return;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            const baseDescription = 'Evans Handyman Services - Professional home repairs, maintenance, and improvements in New Brunswick & Nova Scotia.';
            const imageContext = ` Featuring ${this.selectedImage.description.toLowerCase()}.`;
            metaDescription.setAttribute('content', baseDescription + imageContext);
        }
    }

    // Background rotation removed - now using static random background per page load

    // Set up scroll-triggered navigation
    setupScrollNavigation() {
        if (!this.headerElement) return;

        // Initially show the header briefly, then hide it
        this.headerElement.style.transform = 'translateY(0)';
        this.headerElement.style.opacity = '1';
        this.isNavVisible = true;
        
        // Hide after a short delay
        setTimeout(() => {
            if (window.pageYOffset <= CONFIG.scrollThreshold) {
                this.hideNavigation();
            }
        }, 1000);

        // Listen for scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > CONFIG.scrollThreshold && !this.isNavVisible) {
            this.showNavigation();
        } else if (scrollTop <= CONFIG.scrollThreshold && this.isNavVisible) {
            this.hideNavigation();
        }
    }

    showNavigation() {
        if (!this.headerElement) return;
        
        this.headerElement.style.transform = 'translateY(0)';
        this.headerElement.style.opacity = '1';
        this.isNavVisible = true;
        
        // Add backdrop blur effect when nav is visible
        this.headerElement.style.backdropFilter = 'blur(10px)';
        this.headerElement.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }

    hideNavigation() {
        if (!this.headerElement) return;
        
        this.headerElement.style.transform = 'translateY(-100%)';
        this.headerElement.style.opacity = '0';
        this.isNavVisible = false;
        
        // Remove backdrop effects
        this.headerElement.style.backdropFilter = 'none';
        this.headerElement.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    }

    // Add a scroll to top button that appears when user scrolls down
    addScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        
        // Style the button
        Object.assign(scrollButton.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'var(--ehms-primary)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            opacity: '0',
            transform: 'scale(0)',
            transition: 'all 0.3s ease',
            zIndex: '1000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        });

        document.body.appendChild(scrollButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 500) {
                scrollButton.style.opacity = '1';
                scrollButton.style.transform = 'scale(1)';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.transform = 'scale(0)';
            }
        });

        // Scroll to top functionality
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.backgroundColor = 'var(--ehms-secondary)';
            scrollButton.style.transform = 'scale(1.1)';
        });

        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.backgroundColor = 'var(--ehms-primary)';
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            scrollButton.style.transform = scrollTop > 500 ? 'scale(1)' : 'scale(0)';
        });
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Parallax effect for hero and about sections
class ParallaxEffect {
    constructor() {
        this.heroElement = document.querySelector('.hero');
        this.aboutElement = document.querySelector('#about');
        this.init();
    }

    init() {
        if (!this.heroElement && !this.aboutElement) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax effect
        if (this.heroElement) {
            const heroSpeed = 0.5;
            const heroYPos = -(scrolled * heroSpeed);
            this.heroElement.style.backgroundPosition = `center ${heroYPos}px`;
        }
        
        // About section parallax effect
        if (this.aboutElement) {
            const aboutTop = this.aboutElement.offsetTop;
            const aboutHeight = this.aboutElement.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when about section is in view
            if (scrolled + windowHeight > aboutTop && scrolled < aboutTop + aboutHeight) {
                const aboutSpeed = 0.3;
                const relativeScroll = scrolled - aboutTop + windowHeight;
                const aboutYPos = -(relativeScroll * aboutSpeed);
                this.aboutElement.style.backgroundPosition = `center ${aboutYPos}px`;
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔨 Evans Handyman Services - Website Loaded');
    
    // Initialize all features
    new HeroManager();
    new SmoothScroll();
    new ParallaxEffect();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle form submission (if needed)
document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());
            
            // For now, just show an alert (you can integrate with a backend later)
            alert('Thank you for your quote request! We\'ll get back to you within 24 hours.');
            
            // Reset form
            quoteForm.reset();
        });
    }
});

