// mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Add body scroll lock when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));



// smooth scrolling for navigation links
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

// Active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        navbar.style.borderBottom = '1px solid rgba(59, 130, 246, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
    }
});

// scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-item, .about-intro, .about-description');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (hero && profilePhoto) {
        const rate = scrolled * -0.5;
        profilePhoto.style.transform = `translateY(${rate}px)`;
    }
    
    // Parallax effect for about section background elements
    const about = document.querySelector('.about');
    const floatingCircles = document.querySelectorAll('.floating-circle');
    
    if (about) {
        const aboutTop = about.offsetTop;
        const aboutHeight = about.offsetHeight;
        const aboutScrolled = scrolled - aboutTop;
        
        if (aboutScrolled > 0 && aboutScrolled < aboutHeight) {
            floatingCircles.forEach((circle, index) => {
                const rate = aboutScrolled * (0.1 + index * 0.05);
                circle.style.transform = `translateY(${rate}px) rotate(${rate * 0.5}deg)`;
            });
        }
    }
});

// add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add avatar animation delay
    const avatar = document.querySelector('.avatar-container');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.transform = 'scale(0.8)';
        setTimeout(() => {
            avatar.style.transition = 'all 0.8s ease';
            avatar.style.opacity = '1';
            avatar.style.transform = 'scale(1)';
        }, 500);
    }
    
    // Add particles animation
    const particles = document.querySelectorAll('.avatar-particles span');
    particles.forEach((particle, index) => {
        particle.style.opacity = '0';
        setTimeout(() => {
            particle.style.transition = 'opacity 0.6s ease';
            particle.style.opacity = '1';
        }, 1000 + (index * 200));
    });
});

// project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
    });
});

// stat card hover effects
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
    });
});

// contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Highlight text hover effects
document.querySelectorAll('.highlight-text').forEach(text => {
    text.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.8)';
        this.style.transform = 'scale(1.05)';
    });
    
    text.addEventListener('mouseleave', function() {
        this.style.textShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
        this.style.transform = 'scale(1)';
    });
});

// add smooth reveal animation for sections
const revealSections = document.querySelectorAll('section');

const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target % 1 !== 0;
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (isDecimal) {
                element.textContent = start.toFixed(2);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(2);
            } else {
                element.textContent = target + '+';
            }
        }
    }
    updateCounter();
}

// trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseFloat(stat.textContent.replace('+', ''));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// add CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 