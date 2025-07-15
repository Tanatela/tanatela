// Global Variables
const whatsappNumbers = {
    vendas: "5514991212811", // Substitua pelo número de vendas
    suporte: "5514991093075", // Substitua pelo número de suporte
    comercial: "5519991029809" // Substitua pelo número comercial
};
const whatsappMessage = "Olá! Gostaria de saber mais sobre os serviços da Tanatela.dev";

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const loadingScreen = document.getElementById('loading-screen');
const typewriter = document.getElementById('typewriter');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeIcons();
    initializeLoading();
    initializeNavigation();
    initializeTypewriter();
    initializeAnimations();
    initializeParticles();
    initializeContactForm();
});

// Initialize Lucide Icons
function initializeIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Loading Screen
function initializeLoading() {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
}

// Navigation
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
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
}

// Typewriter Effect
function initializeTypewriter() {
    const texts = ['Landing Pages', 'Sites Profissionais', 'E-commerce'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Scroll Animations
function initializeAnimations() {
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

    // Add animation classes to elements
    document.querySelectorAll('.product-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.feature-card').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.testimonial-card').forEach((el, index) => {
        el.classList.add('slide-in-left');
        el.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.stat-item').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Particles Animation
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        const whatsappText = `
*Nova mensagem do site Tanatela.dev*

*Nome:* ${name}
*E-mail:* ${email}
*Telefone:* ${phone}
*Serviço:* ${service}
*Mensagem:* ${message}
        `.trim();
        
        openWhatsApp(whatsappText);
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        showNotification('Mensagem enviada! Redirecionando para o WhatsApp...', 'success');
    });
}

// WhatsApp Integration
function openWhatsApp(customMessage, department = 'vendas') {
    const message = customMessage || whatsappMessage;
    const phoneNumber = whatsappNumbers[department] || whatsappNumbers.vendas;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Função para mostrar modal de seleção de departamento
function showWhatsAppModal(customMessage) {
    const modal = document.createElement('div');
    modal.className = 'whatsapp-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeWhatsAppModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Escolha o departamento</h3>
                <button class="modal-close" onclick="closeWhatsAppModal()">
                    <i data-lucide="x"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>Para qual departamento você gostaria de enviar sua mensagem?</p>
                <div class="department-buttons">
                    <button class="btn btn-primary department-btn" onclick="selectDepartment('vendas', '${customMessage || ''}')">
                        <i data-lucide="shopping-cart"></i>
                        Vendas
                        <span>Produtos e orçamentos</span>
                    </button>
                    <button class="btn btn-primary department-btn" onclick="selectDepartment('suporte', '${customMessage || ''}')">
                        <i data-lucide="headphones"></i>
                        Suporte
                        <span>Ajuda técnica</span>
                    </button>
                    <button class="btn btn-primary department-btn" onclick="selectDepartment('comercial', '${customMessage || ''}')">
                        <i data-lucide="briefcase"></i>
                        Comercial
                        <span>Parcerias e negócios</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Reinitialize icons for the modal
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeWhatsAppModal() {
    const modal = document.querySelector('.whatsapp-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function selectDepartment(department, customMessage) {
    closeWhatsAppModal();
    openWhatsApp(customMessage, department);
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Performance Optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Smooth reveal animations for sections
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Add CSS for section animations
const sectionAnimationCSS = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .section-visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

const style = document.createElement('style');
style.textContent = sectionAnimationCSS;
document.head.appendChild(style);

// Initialize section animations
document.addEventListener('DOMContentLoaded', initializeSectionAnimations);

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

const rippleStyle = document.createElement('style');
rippleStyle.textContent = rippleCSS;
document.head.appendChild(rippleStyle);

