/**
 * Business Angels - Modern Enhancements JavaScript
 * Frontend Developer Agent - 2026
 * 
 * Features:
 * - Scroll-triggered animations
 * - Animated counters
 * - Form validation
 * - Smooth interactions
 * - Performance optimized
 */

(function($) {
    'use strict';

    // ============================================================================
    // SCROLL ANIMATIONS
    // ============================================================================
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    }

    // ============================================================================
    // ANIMATED COUNTERS
    // ============================================================================
    
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    animateCounter(entry.target, target);
                    entry.target.classList.add('counted');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ============================================================================
    
    function initContactForm() {
        const form = document.getElementById('contactform');
        if (!form) return;
        
        const submitBtn = document.getElementById('submit');
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const bodyField = document.getElementById('body');
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validation function
        window.check_values = function() {
            // Remove previous messages
            const existingMessages = form.querySelectorAll('.form-success, .form-error');
            existingMessages.forEach(msg => msg.remove());
            
            // Validate fields
            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const subject = subjectField.value.trim();
            const body = bodyField.value.trim();
            
            let errors = [];
            
            if (!name) {
                errors.push('Please enter your name');
                nameField.style.borderColor = '#ef4444';
            } else {
                nameField.style.borderColor = '';
            }
            
            if (!email) {
                errors.push('Please enter your email');
                emailField.style.borderColor = '#ef4444';
            } else if (!emailRegex.test(email)) {
                errors.push('Please enter a valid email address');
                emailField.style.borderColor = '#ef4444';
            } else {
                emailField.style.borderColor = '';
            }
            
            if (!subject) {
                errors.push('Please enter a subject');
                subjectField.style.borderColor = '#ef4444';
            } else {
                subjectField.style.borderColor = '';
            }
            
            if (!body) {
                errors.push('Please enter your message');
                bodyField.style.borderColor = '#ef4444';
            } else {
                bodyField.style.borderColor = '';
            }
            
            if (errors.length > 0) {
                showFormMessage('error', errors.join('<br>'));
                return false;
            }
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.value = 'Send A Message';
                submitBtn.disabled = false;
                
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                
                // Clear form
                form.reset();
                
                // Reset border colors
                [nameField, emailField, subjectField, bodyField].forEach(field => {
                    if (field) field.style.borderColor = '';
                });
            }, 1500);
            
            return false;
        };
        
        function showFormMessage(type, message) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-${type}`;
            messageDiv.innerHTML = message;
            messageDiv.style.display = 'block';
            
            form.appendChild(messageDiv);
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-hide success message after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    messageDiv.style.opacity = '0';
                    setTimeout(() => messageDiv.remove(), 300);
                }, 5000);
            }
        }
        
        // Real-time validation on blur
        if (emailField) {
            emailField.addEventListener('blur', function() {
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }

    // ============================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================================================
    // LAZY LOADING IMAGES
    // ============================================================================
    
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ============================================================================
    // PARALLAX EFFECT (SUBTLE)
    // ============================================================================
    
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ============================================================================
    // TESTIMONIALS SLIDER ENHANCEMENT
    // ============================================================================
    
    function enhanceTestimonials() {
        const sliders = document.querySelectorAll('.testimonials_slider');
        
        sliders.forEach(slider => {
            // Add fade-in animation to testimonials
            const items = slider.querySelectorAll('.testimonials_slider_ul li');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.transition = 'opacity 0.6s ease-in-out';
                    item.style.opacity = '1';
                }, index * 100);
            });
        });
    }

    // ============================================================================
    // NAVIGATION ACTIVE STATE
    // ============================================================================
    
    function updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const menuItems = document.querySelectorAll('#menu-main-menu li');
        
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            if (link) {
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    item.classList.add('current-menu-item');
                }
            }
        });
    }

    // ============================================================================
    // HEADER SCROLL EFFECT
    // ============================================================================
    
    function initHeaderScroll() {
        const header = document.getElementById('Top_bar');
        if (!header) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ============================================================================
    // MOBILE MENU ENHANCEMENT
    // ============================================================================
    
    function enhanceMobileMenu() {
        const menuToggle = document.querySelector('.responsive-menu-toggle');
        const menu = document.getElementById('menu');
        
        if (menuToggle && menu) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                menu.classList.toggle('active');
                this.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (menu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                    menu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // ============================================================================
    // SOCIAL ICONS ENHANCEMENT
    // ============================================================================
    
    function enhanceSocialIcons() {
        const socialLinks = document.querySelectorAll('.social-icons a, #Footer a[href*="facebook"], #Footer a[href*="twitter"]');
        
        socialLinks.forEach(link => {
            // Add aria-label for accessibility
            const icon = link.querySelector('i');
            if (icon) {
                const iconClass = icon.className;
                let label = 'Social media';
                
                if (iconClass.includes('facebook')) label = 'Facebook';
                if (iconClass.includes('twitter')) label = 'Twitter';
                if (iconClass.includes('linkedin')) label = 'LinkedIn';
                if (iconClass.includes('instagram')) label = 'Instagram';
                
                link.setAttribute('aria-label', label);
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ============================================================================
    // CLICKABLE CONTACT INFO
    // ============================================================================
    
    function makeContactInfoClickable() {
        // Find phone numbers and make them clickable
        const phoneElements = document.querySelectorAll('h4, p');
        phoneElements.forEach(el => {
            const text = el.textContent;
            const phoneMatch = text.match(/\+63\s*\d{3}\s*\d{3}\s*\d{4}/);
            if (phoneMatch) {
                const phone = phoneMatch[0].replace(/\s/g, '');
                el.innerHTML = el.innerHTML.replace(phoneMatch[0], `<a href="tel:${phone}">${phoneMatch[0]}</a>`);
            }
        });
        
        // Find emails and make them clickable
        const emailElements = document.querySelectorAll('p, a');
        emailElements.forEach(el => {
            if (el.tagName === 'A' && el.textContent.includes('@') && !el.getAttribute('href')) {
                const email = el.textContent.trim();
                el.setAttribute('href', `mailto:${email}`);
            } else if (el.tagName === 'P') {
                const text = el.innerHTML;
                const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
                if (emailMatch && !text.includes('href=')) {
                    el.innerHTML = text.replace(emailMatch[0], `<a href="mailto:${emailMatch[0]}">${emailMatch[0]}</a>`);
                }
            }
        });
    }

    // ============================================================================
    // PERFORMANCE: DEBOUNCE FUNCTION
    // ============================================================================
    
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ============================================================================
    // ADD LOADING ATTRIBUTE TO IMAGES
    // ============================================================================
    
    function optimizeImages() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach((img, index) => {
            // First few images load immediately, rest lazy load
            if (index > 3) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // ============================================================================
    // ENHANCE BUTTONS WITH RIPPLE EFFECT
    // ============================================================================
    
    function addRippleEffect() {
        const buttons = document.querySelectorAll('a.button, button, input[type="submit"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ============================================================================
    // TESTIMONIALS AUTO-PLAY ENHANCEMENT
    // ============================================================================
    
    function enhanceTestimonialsSlider() {
        // This will work with the existing slider plugin
        const sliders = document.querySelectorAll('.testimonials_slider');
        
        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.testimonials_slider_ul li');
            
            // Add smooth fade transitions
            slides.forEach(slide => {
                slide.style.transition = 'opacity 0.5s ease-in-out';
            });
        });
    }

    // ============================================================================
    // BACK TO TOP BUTTON VISIBILITY
    // ============================================================================
    
    function initBackToTop() {
        const backToTop = document.getElementById('back_to_top');
        if (!backToTop) return;
        
        // Initially hide
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
        backToTop.style.transition = 'opacity 0.3s, visibility 0.3s, transform 0.3s';
        
        window.addEventListener('scroll', debounce(() => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }, 100));
    }

    // ============================================================================
    // IMPROVE ACCESSIBILITY
    // ============================================================================
    
    function improveAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#Content';
        skipLink.className = 'skip-to-main';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add aria-labels to icon-only links
        const iconLinks = document.querySelectorAll('a i.icon-facebook-circled, a i.icon-twitter-circled');
        iconLinks.forEach(icon => {
            const link = icon.parentElement;
            if (!link.getAttribute('aria-label')) {
                const iconClass = icon.className;
                if (iconClass.includes('facebook')) {
                    link.setAttribute('aria-label', 'Visit our Facebook page');
                } else if (iconClass.includes('twitter')) {
                    link.setAttribute('aria-label', 'Visit our Twitter page');
                }
            }
        });
        
        // Ensure all images have alt text
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.setAttribute('alt', 'Business Angels');
        });
    }

    // ============================================================================
    // ENHANCE SERVICE CARDS
    // ============================================================================
    
    function enhanceServiceCards() {
        // Add service-card class to service sections
        const serviceWrappers = document.querySelectorAll('.mcb-wrap.one-second');
        
        serviceWrappers.forEach(wrapper => {
            const hasServiceIcon = wrapper.querySelector('img[src*="pic4"], img[src*="pic5"], img[src*="pic6"], img[src*="pic7"]');
            if (hasServiceIcon) {
                wrapper.classList.add('service-card-wrapper');
                
                // Add hover effect
                wrapper.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-4px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                wrapper.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            }
        });
    }

    // ============================================================================
    // INITIALIZE ALL ENHANCEMENTS
    // ============================================================================
    
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        console.log('🚀 Business Angels - Modern Enhancements Loaded');
        
        // Initialize all features
        initScrollAnimations();
        initCounters();
        initContactForm();
        initSmoothScroll();
        initLazyLoading();
        initBackToTop();
        enhanceTestimonialsSlider();
        enhanceSocialIcons();
        makeContactInfoClickable();
        improveAccessibility();
        optimizeImages();
        enhanceServiceCards();
        initHeaderScroll();
        enhanceMobileMenu();
        
        // Add loaded class to body
        setTimeout(() => {
            document.body.classList.add('enhancements-loaded');
        }, 100);
    }

    // ============================================================================
    // AUTO-INITIALIZE
    // ============================================================================
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================================================
    // EXPOSE PUBLIC API
    // ============================================================================
    
    window.BusinessAngelsEnhancements = {
        animateCounter: animateCounter,
        initScrollAnimations: initScrollAnimations,
        initCounters: initCounters
    };

})(jQuery);
