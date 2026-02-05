// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // ===== Mobile Navigation =====
    setupMobileNavigation();
    
    // ===== Scroll Active Nav Highlight =====
    setupScrollSpy();
    
    // ===== Scroll-to-Top Button =====
    setupScrollToTop();
    
    // ===== Form Validation =====
    setupFormValidation();
    
    // ===== Animations on Scroll =====
    setupScrollAnimations();
    
    // ===== Skill Bar Animations =====
    animateSkillBars();
    
    // ===== Lazy Loading for Images =====
    setupLazyLoading();
}

// ===== Mobile Navigation =====
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (!menuToggle || !navList) return;
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navList.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navList.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===== Scroll Spy =====
function setupScrollSpy() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Create Intersection Observer for scroll spy
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== Scroll to Top =====
function setupScrollToTop() {
    // Create scroll to top button if it doesn't exist
    if (!document.getElementById('scrollTopBtn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.innerHTML = '&uarr;';
        
        // Append the button to the body
        document.body.appendChild(scrollBtn);
    }
}
