// Telecom & Datacenter Practice - Interactive Features

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavbar();
    initScrollReveal();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    initGrowthBars();
    initTrendCharts();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.trend-card, .tech-category, .opportunity-card, .service-card, .contact-wrapper > *'
    );

    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    };

    // Set initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            let mobileNav = document.querySelector('.mobile-nav');
            
            if (!mobileNav) {
                mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                mobileNav.innerHTML = `
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#trends">Market Trends</a></li>
                        <li><a href="#technologies">Technologies</a></li>
                        <li><a href="#opportunities">Opportunities</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                    <button class="btn btn-primary btn-full">Get Started</button>
                `;
                mobileNav.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.98);
                    padding: 24px;
                    transform: translateY(-100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 999;
                    backdrop-filter: blur(20px);
                `;
                mobileNav.querySelector('ul').style.cssText = `
                    list-style: none;
                    margin-bottom: 20px;
                `;
                mobileNav.querySelectorAll('li').forEach(li => {
                    li.style.cssText = 'margin-bottom: 16px;';
                });
                mobileNav.querySelectorAll('a').forEach(a => {
                    a.style.cssText = `
                        color: #f1f5f9;
                        text-decoration: none;
                        font-size: 1.125rem;
                        font-weight: 500;
                    `;
                });
                document.body.appendChild(mobileNav);
            }

            if (mobileMenu.classList.contains('active')) {
                mobileNav.style.transform = 'translateY(0)';
                mobileNav.style.opacity = '1';
            } else {
                mobileNav.style.transform = 'translateY(-100%)';
                mobileNav.style.opacity = '0';
            }

            // Close menu when clicking a link
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileNav.style.transform = 'translateY(-100%)';
                    mobileNav.style.opacity = '0';
                });
            });
        });
    }
}

// Contact form handling
function initContactForm() {
    // Let Formspree handle the form natively
    // Form will redirect to Formspree thank you page
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .nav-links a.active {
        color: #6366f1 !important;
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate growth bars on scroll
function initGrowthBars() {
    const growthBars = document.querySelectorAll('.growth-fill');
    
    const animateBars = () => {
        growthBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                bar.style.width = bar.style.width || '0%';
            }
        });
    };

    window.addEventListener('scroll', animateBars);
    animateBars();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Intersection Observer for lazy animations
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

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});


// Initialize Trend Charts
function initTrendCharts() {
    // Chart.js global defaults for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.05)';
    Chart.defaults.font.family = "'Inter', sans-serif";

    // Gradient helper function
    function createGradient(ctx, colorStart, colorEnd) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, colorEnd);
        return gradient;
    }

    // 1. Global Data Growth Chart (Area Chart)
    const dataGrowthCtx = document.getElementById('dataGrowthChart');
    if (dataGrowthCtx) {
        const ctx = dataGrowthCtx.getContext('2d');
        const gradient = createGradient(ctx, 'rgba(99, 102, 241, 0.4)', 'rgba(99, 102, 241, 0.0)');
        
        new Chart(dataGrowthCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'Data Created (ZB)',
                    data: [64, 79, 97, 120, 147, 181, 221, 270, 330],
                    borderColor: '#6366f1',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: (context) => `${context.parsed.y} Zettabytes`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.03)' },
                        ticks: { 
                            font: { size: 11 },
                            callback: (value) => value + ' ZB'
                        }
                    }
                }
            }
        });
    }

    // 2. 5G Subscriptions Chart (Bar Chart)
    const fiveGCtx = document.getElementById('fiveGChart');
    if (fiveGCtx) {
        new Chart(fiveGCtx, {
            type: 'bar',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025', '2026', '2027'],
                datasets: [{
                    label: '5G Subscriptions',
                    data: [0.6, 1.0, 1.6, 2.3, 3.2, 4.4, 5.5],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.6)',
                        'rgba(99, 102, 241, 0.65)',
                        'rgba(99, 102, 241, 0.7)',
                        'rgba(99, 102, 241, 0.75)',
                        'rgba(14, 165, 233, 0.8)',
                        'rgba(14, 165, 233, 0.85)',
                        'rgba(34, 211, 238, 0.9)'
                    ],
                    borderColor: [
                        '#6366f1',
                        '#6366f1',
                        '#6366f1',
                        '#6366f1',
                        '#0ea5e9',
                        '#0ea5e9',
                        '#22d3ee'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: (context) => `${context.parsed.y}B Subscriptions`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.03)' },
                        ticks: { 
                            font: { size: 11 },
                            callback: (value) => value + 'B'
                        }
                    }
                }
            }
        });
    }

    // 3. Datacenter Market Size Chart (Line Chart)
    const datacenterCtx = document.getElementById('datacenterMarketChart');
    if (datacenterCtx) {
        const ctx = datacenterCtx.getContext('2d');
        const gradient = createGradient(ctx, 'rgba(14, 165, 233, 0.3)', 'rgba(14, 165, 233, 0.0)');
        
        new Chart(datacenterCtx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'Market Size',
                    data: [215, 251, 293, 342, 400, 467, 545, 637],
                    borderColor: '#0ea5e9',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#0ea5e9',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(14, 165, 233, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: (context) => `$${context.parsed.y}B Revenue`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    },
                    y: {
                        beginAtZero: false,
                        min: 150,
                        grid: { color: 'rgba(255, 255, 255, 0.03)' },
                        ticks: { 
                            font: { size: 11 },
                            callback: (value) => '$' + value + 'B'
                        }
                    }
                }
            }
        });
    }

    // 4. Technology Investment Split (Doughnut Chart)
    const investmentCtx = document.getElementById('investmentChart');
    if (investmentCtx) {
        new Chart(investmentCtx, {
            type: 'doughnut',
            data: {
                labels: ['Cloud & Edge', '5G Networks', 'AI/ML Infrastructure', 'Security', 'Sustainability'],
                datasets: [{
                    data: [28, 24, 22, 15, 11],
                    backgroundColor: [
                        '#6366f1',
                        '#0ea5e9',
                        '#22d3ee',
                        '#a855f7',
                        '#10b981'
                    ],
                    borderColor: '#0f172a',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: (context) => ` ${context.label}: ${context.parsed}%`
                        }
                    }
                }
            }
        });
    }
}
