// Access projectData from window object
const projectData = window.projectData;

class ResponsiveCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slides = [];
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.slidesPerView = 1; // Default for mobile
        
        this.init();
    }
    
    init() {
        this.carouselContainer = document.querySelector('.carousel-simple');
        this.carouselViewport = document.querySelector('.carousel-viewport');
        this.carouselSlides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.prev-btn-simple');
        this.nextBtn = document.querySelector('.next-btn-simple');
        this.indicators = document.querySelectorAll('.indicator-simple');
        
        if (!this.carouselSlides.length) {
            console.error('Carousel slides not found');
            return;
        }
        
        // Convert NodeList to Array for easier manipulation
        this.slides = Array.from(this.carouselSlides);
        this.totalSlides = this.slides.length;
        
        // Set responsive breakpoints
        this.setResponsiveBreakpoints();
        
        // Set initial state
        this.setInitialState();
        this.bindEvents();
        this.startAutoPlay();
        
        // Handle window resize with debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    setResponsiveBreakpoints() {
        const width = window.innerWidth;
        if (width >= 1200) {
            this.slidesPerView = 3;
        } else if (width >= 768) {
            this.slidesPerView = 2;
        } else {
            this.slidesPerView = 1;
        }
    }

    handleResize() {
        const oldSlidesPerView = this.slidesPerView;
        this.setResponsiveBreakpoints();
        
        if (oldSlidesPerView !== this.slidesPerView) {
            // Reset current index to prevent out of bounds
            if (this.currentIndex >= this.totalSlides) {
                this.currentIndex = 0;
            }
            
            // Temporarily disable transitions during resize
            this.slides.forEach(slide => {
                slide.style.transition = 'none';
            });
            
            // Force reflow
            this.carouselViewport.offsetHeight;
            
            // Reinitialize state
            this.setInitialState();
            
            // Re-enable transitions after a short delay
            setTimeout(() => {
                this.slides.forEach(slide => {
                    if (this.slidesPerView === 3) {
                        slide.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    } else {
                        slide.style.transition = 'all 0.5s ease-in-out';
                    }
                });
            }, 50);
        }
    }

    setInitialState() {
        this.slides.forEach((slide, index) => {
            // Reset all styles first
            slide.style.transition = '';
            slide.style.position = '';
            slide.style.width = '';
            slide.style.maxWidth = '';
            slide.style.left = '';
            slide.style.top = '';
            slide.style.transformStyle = '';
            slide.style.transform = '';
            slide.style.opacity = '';
            slide.style.zIndex = '';
            slide.style.filter = '';
            slide.style.pointerEvents = '';
            
            // Force reflow
            slide.offsetHeight;
            
            if (this.slidesPerView === 3) {
                // Desktop 3D mode
                slide.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                slide.style.position = 'absolute';
                slide.style.width = '100%';
                slide.style.maxWidth = '750px';
                slide.style.left = '50%';
                slide.style.top = '0';
                slide.style.transformStyle = 'preserve-3d';
            } else {
                // Mobile/Tablet responsive mode
                slide.style.transition = 'all 0.5s ease-in-out';
                slide.style.position = 'absolute';
                slide.style.width = `${100 / this.slidesPerView}%`;
                slide.style.left = '0';
                slide.style.top = '0';
                slide.style.transformStyle = 'flat';
            }
        });
        
        this.updateCarousel();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prev();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.next();
            });
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.goTo(index);
            });
        });

        if (this.carouselViewport) {
            this.carouselViewport.addEventListener('touchstart', (e) => {
                this.touchStartX = e.touches[0].clientX;
                this.pauseAutoPlay();
            });
            
            this.carouselViewport.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
            
            this.carouselViewport.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe();
                this.resumeAutoPlay();
            });
        }

        // Handle slide clicks for navigation
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', (e) => {
                const isLinkOrButton = e.target.closest('a') || e.target.closest('button');
                
                if (!isLinkOrButton) {
                    e.preventDefault();
                    
                    // For desktop 3D mode, handle side slide clicks
                    if (this.slidesPerView === 3) {
                        const slideIndex = parseInt(slide.getAttribute('data-index'));
                        if (slideIndex === 1) {
                            this.next();
                        } else if (slideIndex === 2) {
                            this.prev();
                        }
                    } else {
                        // For mobile/tablet mode, go directly to clicked slide
                        this.goTo(index);
                    }
                }
            });
        });
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }

    prev() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    updateCarousel() {
        const maxIndex = this.totalSlides - this.slidesPerView;
        let adjustedIndex = this.currentIndex;
        
        // Handle infinite loop
        if (adjustedIndex < 0) {
            adjustedIndex = this.totalSlides + adjustedIndex;
        } else if (adjustedIndex > maxIndex) {
            adjustedIndex = adjustedIndex % this.totalSlides;
        }
        
        this.slides.forEach((slide, index) => {
            let slideIndex = (index - adjustedIndex + this.totalSlides) % this.totalSlides;
            
            // Check if we're on desktop (3 slides per view) or mobile/tablet
            if (this.slidesPerView === 3) {
                // Desktop 3D mode
                slide.setAttribute('data-index', slideIndex);
                
                // Ensure proper positioning for desktop mode
                slide.style.left = '50%';
                slide.style.width = '100%';
                slide.style.maxWidth = '750px';
                slide.style.transformStyle = 'preserve-3d';
                
                if (slideIndex === 0) {
                    slide.classList.add('active');
                    slide.style.transform = 'translateX(-50%) translateZ(0) rotateY(0deg)';
                    slide.style.opacity = '1';
                    slide.style.zIndex = '3';
                    slide.style.filter = 'blur(0px)';
                    slide.style.pointerEvents = 'all';
                } else if (slideIndex === 1) {
                    slide.classList.remove('active');
                    slide.style.transform = 'translateX(15%) translateZ(-150px) rotateY(15deg)';
                    slide.style.opacity = '0.9';
                    slide.style.zIndex = '2';
                    slide.style.filter = 'blur(0.5px)';
                    slide.style.pointerEvents = 'all';
                } else if (slideIndex === 2) {
                    slide.classList.remove('active');
                    slide.style.transform = 'translateX(-115%) translateZ(-150px) rotateY(-15deg)';
                    slide.style.opacity = '0.9';
                    slide.style.zIndex = '1';
                    slide.style.filter = 'blur(0.5px)';
                    slide.style.pointerEvents = 'all';
                } else {
                    slide.classList.remove('active');
                    slide.style.opacity = '0';
                    slide.style.pointerEvents = 'none';
                }
            } else {
                // Mobile/Tablet responsive mode
                slide.removeAttribute('data-index');
                
                // Ensure proper positioning for mobile/tablet mode
                slide.style.left = '0';
                slide.style.width = `${100 / this.slidesPerView}%`;
                slide.style.maxWidth = 'none';
                slide.style.transformStyle = 'flat';
                
                // Calculate position based on slides per view
                let position = 0;
                let opacity = 0;
                let zIndex = 1;
                let transform = 'scale(0.8)';
                
                if (slideIndex < this.slidesPerView) {
                    position = (slideIndex * 100) / this.slidesPerView;
                    opacity = 1;
                    zIndex = this.slidesPerView - slideIndex + 1;
                    transform = 'scale(1)';
                    
                    if (slideIndex === 0) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                } else {
                    slide.classList.remove('active');
                }
                
                slide.style.left = `${position}%`;
                slide.style.opacity = opacity;
                slide.style.zIndex = zIndex;
                slide.style.transform = transform;
                slide.style.filter = 'none';
            }
        });

        this.updateIndicators();
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;
        
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        if (!this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveCarousel();
});
