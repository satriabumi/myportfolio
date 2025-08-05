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

// link navigasi aktif berdasarkan posisi scroll
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

// perubahan latar belakang navbar saat scroll
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

// efek parallax untuk bagian hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const profilePhoto = document.querySelector('.profile-photo');
    
    if (hero && profilePhoto) {
        const rate = scrolled * -0.5;
        profilePhoto.style.transform = `translateY(${rate}px)`;
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
                circle.style.transform = `translateY(${rate}px) rotate(${rate * 0.5}deg)`;
            });
        }
    }
});

// tambahkan animasi loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Tambahkan delay animasi avatar
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
    
    // Tambahkan animasi partikel
    const particles = document.querySelectorAll('.avatar-particles span');
    particles.forEach((particle, index) => {
        particle.style.opacity = '0';
        setTimeout(() => {
            particle.style.transition = 'opacity 0.6s ease';
            particle.style.opacity = '1';
        }, 1000 + (index * 200));
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
                
                const text = stat.textContent.replace('+', '');
                if (!isNaN(parseFloat(text))) {
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
// GitHub API integration
async function loadGitHubStats() {
    try {
        const username = 'satriabumi';
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('GitHub API request failed');
        }
        
        const userData = await response.json();
        
        // Update user stats
        document.getElementById('repo-count').textContent = userData.public_repos || 0;
        document.getElementById('followers').textContent = userData.followers || 0;
        
        // Load repositories to get total stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=100`);
        if (reposResponse.ok) {
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
            document.getElementById('stars').textContent = totalStars;
        }
        

        
    } catch (error) {
        console.error('Error loading GitHub stats:', error);
        
        // Fallback data if API fails
        document.getElementById('repo-count').textContent = '15';
        document.getElementById('followers').textContent = '25';
        document.getElementById('stars').textContent = '45';
    }
}

// Load GitHub stats when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGitHubStats();
    
    // Add click handler only for GitHub button
    const githubButton = document.querySelector('.github-controls');
    if (githubButton) {
        githubButton.addEventListener('click', () => {
            window.open('https://github.com/satriabumi', '_blank');
        });
    }
});

// Skill categories interaction
document.addEventListener('DOMContentLoaded', () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        // Hover effect
        category.addEventListener('mouseenter', () => {
            category.classList.add('active');
            
            // Add staggered animation to tech icons
            const techIcons = category.querySelectorAll('.tech-icon');
            techIcons.forEach((icon, index) => {
                icon.style.animationDelay = `${index * 0.1}s`;
                icon.style.animation = 'techIconAppear 0.6s ease forwards';
            });
        });
        
        category.addEventListener('mouseleave', () => {
            category.classList.remove('active');
            
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