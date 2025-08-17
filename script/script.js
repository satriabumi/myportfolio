// toggle navigasi mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // add kunci scroll body saat menu terbuka
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// close menu mobile saat mengklik link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// smooth scroll untuk link navigasi
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

// link navigasi aktif berdasarkan posisi scroll dengan optimasi
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

// Throttle function untuk optimasi scroll event
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// Menggunakan throttled scroll handler untuk performa lebih baik
const throttledUpdateActiveNavLink = throttle(updateActiveNavLink, 100);
window.addEventListener('scroll', throttledUpdateActiveNavLink);

// perubahan latar belakang navbar saat scroll dengan throttling
const updateNavbarBackground = () => {
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
};
const throttledUpdateNavbarBackground = throttle(updateNavbarBackground, 100);
window.addEventListener('scroll', throttledUpdateNavbarBackground);

// animasi scroll
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

// amati elemen untuk animasi
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-card, .contact-item, .about-intro, .about-description');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// animasi mengetik untuk judul hero
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

// inisialisasi animasi mengetik saat halaman dimuat
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// efek parallax untuk bagian hero dengan throttling
const updateParallaxEffects = () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (hero && profilePhoto) {
        // Menggunakan transform: translate3d untuk hardware acceleration
        const rate = scrolled * -0.5;
        profilePhoto.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
    
    // Efek parallax untuk elemen latar belakang bagian about
    const about = document.querySelector('.about');
    const floatingCircles = document.querySelectorAll('.floating-circle');
    
    if (about) {
        const aboutTop = about.offsetTop;
        const aboutHeight = about.offsetHeight;
        const aboutScrolled = scrolled - aboutTop;
        
        if (aboutScrolled > 0 && aboutScrolled < aboutHeight) {
            floatingCircles.forEach((circle, index) => {
                const rate = aboutScrolled * (0.1 + index * 0.05);
                // Menggunakan transform: translate3d untuk hardware acceleration
                circle.style.transform = `translate3d(0, ${rate}px, 0) rotate(${rate * 0.5}deg)`;
            });
        }
    }
};
const throttledParallaxEffects = throttle(updateParallaxEffects, 16); // ~60fps
window.addEventListener('scroll', throttledParallaxEffects);

// tambahkan animasi loading - dengan optimasi performance
window.addEventListener('load', () => {
    // Gunakan requestAnimationFrame untuk animasi yang lebih efisien
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
        
        // Tambahkan delay animasi avatar dengan requestAnimationFrame
        const avatar = document.querySelector('.avatar-container');
        if (avatar) {
            avatar.style.opacity = '0';
            avatar.style.transform = 'scale(0.8)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    avatar.style.transition = 'all 0.8s ease';
                    avatar.style.opacity = '1';
                    avatar.style.transform = 'scale(1)';
                }, 500);
            });
        }
        
        // Tambahkan animasi partikel dengan batching untuk kinerja lebih baik
        const particles = document.querySelectorAll('.avatar-particles span');
        if (particles.length) {
            // Batch particles into groups for better performance
            const batchSize = 5;
            for (let i = 0; i < particles.length; i += batchSize) {
                const batch = Array.from(particles).slice(i, i + batchSize);
                setTimeout(() => {
                    batch.forEach(particle => {
                        particle.style.transition = 'opacity 0.6s ease';
                        particle.style.opacity = '1';
                    });
                }, 1000 + (i * 40));
            }
        }
    });
});

// efek hover kartu proyek
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// efek hover kartu skill
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

// efek hover kartu statistik
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

// validasi form kontak (jika Anda menambahkan form nanti)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Efek hover teks highlight
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

// tambahkan animasi reveal halus untuk bagian
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

// tambahkan animasi counter untuk statistik
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

// pemicu animasi counter saat bagian statistik terlihat
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                // Skip elements that don't contain numeric values (like "Resume")
                const text = stat.textContent.replace('+', '');
                if (!isNaN(parseFloat(text)) && parseFloat(text) > 0) {
                    const target = parseFloat(text);
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// tambahkan CSS untuk keadaan loaded

// New GitHub Statistics Widget
async function loadGitHubStatsNew() {
    try {
        const username = 'satriabumi';
        
        // Add loading animation
        const statCards = document.querySelectorAll('.stat-card-new');
        statCards.forEach(card => {
            card.classList.add('loading');
        });
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Animate stats update
        await animateStatUpdateNew('repo-count-new', userData.public_repos || 0);
        await animateStatUpdateNew('followers-new', userData.followers || 0);
        
        // Load repositories to get total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
            await animateStatUpdateNew('stars-new', totalStars);
        } else {
            await animateStatUpdateNew('stars-new', 0);
        }
        
        // Estimate commits (GitHub API doesn't provide this directly)
        const estimatedCommits = Math.floor((userData.public_repos || 0) * 15);
        await animateStatUpdateNew('commits-new', estimatedCommits);
        
        // Remove loading animation
        statCards.forEach(card => {
            card.classList.remove('loading');
        });
        
    } catch (error) {
        console.error('Error loading GitHub stats:', error);
        
        // Fallback data if API fails
        await animateStatUpdateNew('repo-count-new', 15);
        await animateStatUpdateNew('followers-new', 25);
        await animateStatUpdateNew('stars-new', 45);
        await animateStatUpdateNew('commits-new', 225);
        
        // Remove loading animation
        const statCards = document.querySelectorAll('.stat-card-new');
        statCards.forEach(card => {
            card.classList.remove('loading');
        });
    }
}

async function animateStatUpdateNew(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    
    // Add bounce effect
    element.style.transform = 'scale(1.1)';
    element.style.color = '#2ea043';
    
    for (let i = 0; i < steps; i++) {
        current += increment;
        element.textContent = Math.floor(current);
        await new Promise(resolve => setTimeout(resolve, duration / steps));
    }
    
    element.textContent = targetValue;
    
    // Reset styles
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#f0f6fc';
    }, 300);
}

// Load GitHub stats when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGitHubStatsNew();
    
    // Add hover effects for stat cards
    const statCards = document.querySelectorAll('.stat-card-new');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-4px) scale(1.05)';
            }, 150);
        });
    });
    
    // Add ripple effect to GitHub link
    const githubLink = document.querySelector('.github-link-new');
    if (githubLink) {
        githubLink.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Skill categories interaction - Only one card open at a time
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    let currentlyOpenCard = null;
    
    skillCategories.forEach(category => {
        // Hover effect
        category.addEventListener('mouseenter', () => {
            // Close previously open card
            if (currentlyOpenCard && currentlyOpenCard !== category) {
                currentlyOpenCard.classList.remove('active');
                const prevTechIcons = currentlyOpenCard.querySelectorAll('.tech-icon');
                prevTechIcons.forEach(icon => {
                    icon.style.animation = 'none';
                    setTimeout(() => {
                        icon.style.animation = '';
                    }, 10);
                });
            }
            
            // Open current card
            category.classList.add('active');
            currentlyOpenCard = category;
            
            // Add staggered animation to tech icons
            const techIcons = category.querySelectorAll('.tech-icon');
            techIcons.forEach((icon, index) => {
                icon.style.animationDelay = `${index * 0.1}s`;
                icon.style.animation = 'techIconAppear 0.6s ease forwards';
            });
        });
        
        category.addEventListener('mouseleave', () => {
            category.classList.remove('active');
            if (currentlyOpenCard === category) {
                currentlyOpenCard = null;
            }
            
            // Reset tech icons
            const techIcons = category.querySelectorAll('.tech-icon');
            techIcons.forEach(icon => {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 10);
            });
        });
        
        // Click effect
        category.addEventListener('click', () => {
            // Add click animation
            category.style.transform = 'scale(0.95)';
            setTimeout(() => {
                category.style.transform = '';
            }, 150);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            category.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Individual tech icon hover effects
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.1) translateY(-5px)';
            icon.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.boxShadow = '';
        });
    });
});

// Add CSS for ripple effect and existing styles
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
    
    .skill-category {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .skill-category.active .tech-icons {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-category.active .tech-icon {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(style);

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Mohon lengkapi semua field', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Format email tidak valid', 'error');
                return;
            }
            
            // Create mailto link
            const mailtoLink = `mailto:satriabumi25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Form berhasil dikirim! Email client akan terbuka.', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        }
        
        .notification.visible {
            transform: translateX(0);
        }
        
        .notification-success {
            background: #10b981;
            color: white;
            border-left: 4px solid #059669;
        }
        
        .notification-error {
            background: #ef4444;
            color: white;
            border-left: 4px solid #dc2626;
        }
        
        .notification-info {
            background: #3b82f6;
            color: white;
            border-left: 4px solid #2563eb;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .notification {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        notificationStyle.id = 'notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('visible');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
} 

// Project data for carousel - now shared between script.js and carousel.js
window.projectData = [
    {
        title: "PAKU – Presensi Akurat Klinik Pratama Asih Usadha",
        description: "Aplikasi Android berbasis BSSID Wi-Fi dan Geolocation untuk presensi staf klinik kesehatan dengan sistem keamanan yang tinggi dan interface yang intuitif.",
        type: "Android App",
        tech: ["Kotlin", "XML", "Firebase"],
        features: ["Wi-Fi BSSID Detection", "Geolocation Tracking", "Secure Data Storage", "Real-time Analytics"],
        stats: { months: 3, features: 5, success: "100%" },
        image: "assets/logo_paku2.png",
        github: "https://github.com/satriabumi/paku-app",
        demo: "https://figma.com/proto/paku-app"
    },
    {
        title: "SIPIMO - Sistem Pengingat Minum Obat",
        description: "Aplikasi Android yang membantu pengguna mengatur jadwal dan pengingat konsumsi obat dengan interface yang user-friendly dan fitur yang lengkap.",
        type: "Android App",
        tech: ["Kotlin", "XML", "SQLite"],
        features: ["Smart Scheduling", "Push Notifications", "Medicine Database", "Progress Tracking"],
        stats: { months: 2, features: 4, success: "95%" },
        image: "assets/sipimo.png",
        github: "https://github.com/satriabumi/sipimo-app",
        demo: "https://figma.com/proto/sipimo-app"
    },
    {
        title: "Travlio - Website Agent Travel Penerbangan Logistik",
        description: "Website wisata yang menyajikan destinasi, maskapai penerbangan, dan booking tiket untuk penerbangan di Indonesia dengan desain modern dan responsif.",
        type: "Web App",
        tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
        features: ["Flight Booking System", "Destination Explorer", "Airline Integration", "Secure Payment"],
        stats: { months: 4, features: 6, success: "90%" },
        image: "assets/travlio.png",
        github: "https://github.com/satriabumi/travlio-website",
        demo: "https://travlio-website.vercel.app"
    }
];