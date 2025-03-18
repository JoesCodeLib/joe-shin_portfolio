// Smooth scrolling for navigation links
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

// Navbar scroll effect with improved performance
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                navbar.style.transform = 'translateY(0)';
            } else if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
                navbar.style.transform = 'translateY(-100%)';
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.dataset.delay = index * 0.2;
    card.classList.add('fade-out');
    observer.observe(card);
});

// Enhanced mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Enhanced typing animation for hero text that prevents layout shifts
const heroText = document.querySelector('.animate-text');
const originalText = heroText.textContent;

// Create container for the text
const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = '100%';

// Create placeholder with invisible text to maintain layout
const placeholder = document.createElement('span');
placeholder.className = 'placeholder';
placeholder.textContent = originalText;

// Create element for visible typed text
const typedText = document.createElement('span');
typedText.className = 'typed-text';

// Replace original content with our new structure
heroText.textContent = '';
container.appendChild(placeholder);
container.appendChild(typedText);
heroText.appendChild(container);

// Calculate the height needed for the text
const tempDiv = document.createElement('div');
tempDiv.style.position = 'absolute';
tempDiv.style.visibility = 'hidden';
tempDiv.style.whiteSpace = 'pre-wrap';
tempDiv.style.width = '600px';
tempDiv.style.fontSize = '3.2rem';
tempDiv.style.fontWeight = '600';
tempDiv.style.letterSpacing = '-0.5px';
tempDiv.style.lineHeight = '1.2';
tempDiv.textContent = originalText;
document.body.appendChild(tempDiv);
const height = tempDiv.offsetHeight;
document.body.removeChild(tempDiv);

// Set the container height
container.style.height = `${height}px`;

let i = 0;
function typeWriter() {
    if (i < originalText.length) {
        typedText.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
    }
}

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// Enhanced parallax effect for hero section
let parallaxTicking = false;
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            parallaxTicking = false;
        });
        parallaxTicking = true;
    }
});

// Enhanced hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add CSS for enhanced animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card {
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                    box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
`;
document.head.appendChild(style); 