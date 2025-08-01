// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature items
document.querySelectorAll('.feature-item').forEach(item => {
    observer.observe(item);
});

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Observe all security cards
document.querySelectorAll('.security-card').forEach(card => {
    observer.observe(card);
});

// Form submission handling
const studentForm = document.getElementById('student-form');
if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(studentForm);
        const submitButton = studentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate form submission (replace with actual fetch in production)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            submitButton.innerHTML = '<i class="fas fa-check"></i> Success!';
            studentForm.reset();
            
            // Create and show success notification
            const notification = document.createElement('div');
            notification.className = 'form-notification success';
            notification.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Thank you for registering! We'll contact you soon.</span>
            `;
            studentForm.appendChild(notification);
            
            // Remove notification after delay
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        } catch (error) {
            // Show error message
            submitButton.innerHTML = '<i class="fas fa-times"></i> Error';
            
            // Create and show error notification
            const notification = document.createElement('div');
            notification.className = 'form-notification error';
            notification.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>Something went wrong. Please try again.</span>
            `;
            studentForm.appendChild(notification);
            
            // Remove notification after delay
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        } finally {
            // Reset button after delay
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Mobile menu toggle (add this HTML to your header)
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuButton.setAttribute('aria-label', 'Toggle menu');

const headerContainer = document.querySelector('.header-container');
if (headerContainer) {
    headerContainer.appendChild(mobileMenuButton);
    
    const nav = document.querySelector('nav');
    mobileMenuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuButton.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Add hover effect to AI level cards
document.querySelectorAll('.ai-level').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const percent = card.querySelector('.ai-level-percent');
        if (percent) {
            percent.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const percent = card.querySelector('.ai-level-percent');
        if (percent) {
            percent.style.transform = 'scale(1)';
        }
    });
});

// Dynamic year in footer
const yearElement = document.createElement('span');
yearElement.textContent = new Date().getFullYear();
document.querySelector('.footer-bottom').innerHTML = `© ${yearElement.textContent} Zenova. Designed by Zaheer Baloch`;

// Add some additional styles via JavaScript
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .form-notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 15px 25px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
        z-index: 1000;
    }
    
    .form-notification.success {
        background: rgba(40, 167, 69, 0.9);
        color: white;
    }
    
    .form-notification.error {
        background: rgba(220, 53, 69, 0.9);
        color: white;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; bottom: 30px; }
    }
    
    .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-button {
            display: block;
        }
        
        nav ul {
            display: none;
            flex-direction: column;
            width: 100%;
            padding: 1rem 0;
        }
        
        nav.active ul {
            display: flex;
        }
    }
    
    /* Glow animation for special elements */
    .glow {
        animation: glowPulse 2s infinite alternate;
    }
    
    @keyframes glowPulse {
        from { box-shadow: 0 0 5px rgba(110, 69, 226, 0.5); }
        to { box-shadow: 0 0 20px rgba(110, 69, 226, 0.8); }
    }
`;
document.head.appendChild(dynamicStyles);

// Add glow effect to beta button
const betaButton = document.querySelector('.btn-beta');
if (betaButton) {
    betaButton.classList.add('glow');
}

// Product card hover animation enhancement
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Add a scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = `${scrolled}%`;
});

// Add styles for scroll progress
const progressStyles = document.createElement('style');
progressStyles.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--primary), var(--accent));
        z-index: 1000;
        width: 0%;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(progressStyles);
