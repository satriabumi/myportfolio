// Access projectData from window object
const projectData = window.projectData;

class ElegantCarousel {
    constructor() {
        this.currentIndex = 0;
        this.totalItems = projectData.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
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
        
        // Set initial state
        this.setInitialState();
        this.bindEvents();
        this.startAutoPlay();
    }

    setInitialState() {
        this.carouselSlides.forEach((slide, index) => {
            const adjustedIndex = (index - this.currentIndex + this.totalItems) % this.totalItems;
            slide.setAttribute('data-index', adjustedIndex);
            
            if (adjustedIndex === 0) {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(-50%) translateZ(0) rotateY(0deg)';
                slide.style.zIndex = '3';
                slide.style.filter = 'blur(0px)';
                slide.style.pointerEvents = 'all';
            } else if (adjustedIndex === 1) {
                slide.style.transform = 'translateX(25%) translateZ(-200px) rotateY(25deg)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '2';
                slide.style.filter = 'blur(1px)';
                slide.style.pointerEvents = 'all';
            } else if (adjustedIndex === 2) {
                slide.style.transform = 'translateX(-125%) translateZ(-200px) rotateY(-25deg)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '1';
                slide.style.filter = 'blur(1px)';
                slide.style.pointerEvents = 'all';
            }
        });
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

        this.carouselSlides.forEach((slide) => {
            slide.addEventListener('click', (e) => {
                e.preventDefault();
                const slideIndex = parseInt(slide.getAttribute('data-index'));
                
                if (slideIndex === 1) {
                    this.next();
                } else if (slideIndex === 2) {
                    this.prev();
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
        
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        
        const currentSlide = document.querySelector('.carousel-slide.active');
        if (currentSlide) {
            currentSlide.classList.add('slide-out-right');
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.cleanupAnimations();
        }, 800);
    }
    
    next() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        
        const currentSlide = document.querySelector('.carousel-slide.active');
        if (currentSlide) {
            currentSlide.classList.add('slide-out-left');
        }
        
        this.updateCarousel();
        
        setTimeout(() => {
            this.cleanupAnimations();
        }, 800);
    }
    
    updateCarousel() {
        this.carouselSlides.forEach((slide, index) => {
            const adjustedIndex = (index - this.currentIndex + this.totalItems) % this.totalItems;
            slide.setAttribute('data-index', adjustedIndex);
            
            if (adjustedIndex === 0) {
                slide.classList.add('active');
                slide.style.transform = 'translateX(-50%) translateZ(0) rotateY(0deg)';
                slide.style.opacity = '1';
                slide.style.zIndex = '3';
                slide.style.filter = 'blur(0px)';
                slide.style.pointerEvents = 'all';
            } else if (adjustedIndex === 1) {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(25%) translateZ(-200px) rotateY(25deg)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '2';
                slide.style.filter = 'blur(1px)';
                slide.style.pointerEvents = 'all';
            } else if (adjustedIndex === 2) {
                slide.classList.remove('active');
                slide.style.transform = 'translateX(-125%) translateZ(-200px) rotateY(-25deg)';
                slide.style.opacity = '0.8';
                slide.style.zIndex = '1';
                slide.style.filter = 'blur(1px)';
                slide.style.pointerEvents = 'all';
            }
        });

        this.updateIndicators();
    }
    
    cleanupAnimations() {
        this.carouselSlides.forEach(slide => {
            slide.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        });
        this.isAnimating = false;
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
        
        const direction = index > this.currentIndex ? 'next' : 'prev';
        this.currentIndex = index;
        
        if (direction === 'next') {
            this.next();
        } else {
            this.prev();
        }
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 6000);
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
    new ElegantCarousel();
});
