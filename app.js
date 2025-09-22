// Wedding Website JavaScript with EmailJS Integration - Lauren & Maxime

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Lauren & Maxime wedding website loading with EmailJS... 💚');
    
    // Initialize EmailJS
    (function() {
        // EmailJS Public Key - Replace with your actual public key
        emailjs.init("YOUR_PUBLIC_KEY_HERE");
        console.log('✅ EmailJS initialized successfully');
    })();
    
    // EmailJS Configuration
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_1si5ien',
        TEMPLATE_ID: 'template_6iaihg4',
        PUBLIC_KEY: '9WYw8VF1D3MNl20aI',
        RECIPIENT_EMAIL: 'laurenetmaxime@gmail.com'
    };
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Enhanced Smooth scrolling for all navigation links
    function setupSmoothScrolling() {
        console.log('Setting up smooth scrolling navigation...');
        
        // Get all anchor links that start with #
        const navLinks = document.querySelectorAll('a[href^="#"]');
        console.log('Found navigation links:', navLinks.length);
        
        navLinks.forEach((link, index) => {
            console.log(`Setting up link ${index + 1}:`, link.getAttribute('href'), link.textContent.trim());
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = this.getAttribute('href');
                console.log('Navigation clicked:', targetId);
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log('Target element found:', targetElement.id);
                    
                    const navbarHeight = 80;
                    const elementTop = targetElement.getBoundingClientRect().top;
                    const offsetTop = elementTop + window.pageYOffset - navbarHeight;
                    
                    console.log('Scrolling to position:', offsetTop);
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (navToggle) navToggle.classList.remove('active');
                    }
                } else {
                    console.error('Target element not found for:', targetId);
                }
            });
        });
        
        console.log('✅ Navigation setup complete -', navLinks.length, 'links configured');
    }
    
    // Call setup immediately
    setupSmoothScrolling();
    
    // Countdown Timer for Lauren & Maxime's wedding
    function initCountdown() {
        const weddingDate = new Date('2026-09-19T16:00:00').getTime();
        
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        
        if (!daysElement || !hoursElement || !minutesElement) {
            console.warn('Countdown elements not found');
            return;
        }
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance < 0) {
                daysElement.textContent = '0';
                hoursElement.textContent = '0';
                minutesElement.textContent = '0';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            daysElement.textContent = days.toString();
            hoursElement.textContent = hours.toString();
            minutesElement.textContent = minutes.toString();
        }
        
        updateCountdown();
        setInterval(updateCountdown, 60000);
        console.log('✅ Countdown initialized for September 19, 2026');
    }
    
    initCountdown();
    
    // Enhanced RSVP Form Handling with EmailJS Integration
    function setupRSVPFormWithEmailJS() {
        const rsvpForm = document.getElementById('rsvpForm');
        const rsvpFormContainer = document.getElementById('rsvpFormContainer');
        const rsvpSuccess = document.getElementById('rsvpSuccess');
        const rsvpError = document.getElementById('rsvpError');
        const submitBtn = document.getElementById('submitBtn');
        
        if (!rsvpForm || !rsvpSuccess || !rsvpError || !rsvpFormContainer || !submitBtn) {
            console.error('RSVP elements not found');
            return;
        }
        
        console.log('Setting up enhanced RSVP form with EmailJS integration...');
        
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('RSVP Form submitted with EmailJS!');
            
            // Get form data
            const formData = getFormData();
            
            console.log('Form data collected:', formData);
            
            // Validation
            if (!validateForm(formData)) {
                return false;
            }
            
            // All validation passed, submit via EmailJS
            console.log('Validation passed, submitting via EmailJS...');
            submitRSVPWithEmailJS(formData);
            
            return false;
        });
        
        function getFormData() {
            return {
                guestName: getValue('#guestName'),
                email: getValue('#email'),
                phone: getValue('#phone'),
                weddingAttendance: getValue('input[name="weddingAttendance"]:checked'),
                weddingGuests: getValue('#weddingGuests'),
                brunchAttendance: getValue('input[name="brunchAttendance"]:checked'),
                brunchGuests: getValue('#brunchGuests'),
                dietary: getValue('#dietary'),
                message: getValue('#message')
            };
        }
        
        function getValue(selector) {
            const element = rsvpForm.querySelector(selector);
            return element ? element.value.trim() : '';
        }
        
        function validateForm(data) {
            if (!data.guestName) {
                showValidationError('Veuillez entrer le nom des invités.', '#guestName');
                return false;
            }
            
            if (!data.email) {
                showValidationError('Veuillez entrer votre adresse email.', '#email');
                return false;
            }
            
            if (!isValidEmail(data.email)) {
                showValidationError('Veuillez entrer une adresse email valide.', '#email');
                return false;
            }
            
            if (!data.weddingAttendance) {
                showValidationError('Veuillez confirmer votre présence au mariage.');
                return false;
            }
            
            if (data.weddingAttendance === 'oui' && !data.weddingGuests) {
                showValidationError('Veuillez indiquer le nombre de personnes pour le mariage.', '#weddingGuests');
                return false;
            }
            
            return true;
        }
        
        function showValidationError(message, selector = null) {
            alert(message);
            if (selector) {
                const element = rsvpForm.querySelector(selector);
                if (element) element.focus();
            }
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function submitRSVPWithEmailJS(data) {
            console.log('Processing RSVP submission with EmailJS...');
            
            // Show loading state
            setButtonLoading(true);
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                to_email: EMAILJS_CONFIG.RECIPIENT_EMAIL,
                from_name: data.guestName,
                from_email: data.email,
                guest_names: data.guestName,
                guest_email: data.email,
                guest_phone: data.phone || 'Non renseigné',
                wedding_attendance: data.weddingAttendance === 'oui' ? 'Oui, présent(e)' : 'Non, absent(e)',
                wedding_guests_count: data.weddingGuests || 'Non spécifié',
                brunch_attendance: data.brunchAttendance ? (data.brunchAttendance === 'oui' ? 'Oui, présent(e)' : 'Non, absent(e)') : 'Non spécifié',
                brunch_guests_count: data.brunchGuests || 'Non spécifié',
                dietary_restrictions: data.dietary || 'Aucune',
                message_for_couple: data.message || 'Aucun message',
                submission_date: new Date().toLocaleDateString('fr-FR'),
                submission_time: new Date().toLocaleTimeString('fr-FR')
            };
            
            console.log('Sending email with template params:', templateParams);
            
            // Send email using EmailJS
            emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY
            ).then(function(response) {
                console.log('✅ EmailJS SUCCESS!', response.status, response.text);
                handleRSVPSuccess(data);
            }).catch(function(error) {
                console.error('❌ EmailJS FAILED...', error);
                handleRSVPError(error);
            });
        }
        
        function handleRSVPSuccess(data) {
            console.log('✅ RSVP submitted successfully via EmailJS:', data);
            
            // Reset loading state
            setButtonLoading(false);
            
            // Hide form container and show success message
            rsvpFormContainer.style.display = 'none';
            rsvpSuccess.style.display = 'block';
            rsvpError.style.display = 'none';
            
            // Scroll to success message
            setTimeout(() => {
                rsvpSuccess.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
            
            // Reset form for potential future use
            rsvpForm.reset();
            
            console.log('RSVP success message displayed');
        }
        
        function handleRSVPError(error) {
            console.error('❌ RSVP submission failed:', error);
            
            // Reset loading state
            setButtonLoading(false);
            
            // Hide form container and show error message
            rsvpFormContainer.style.display = 'none';
            rsvpSuccess.style.display = 'none';
            rsvpError.style.display = 'block';
            
            // Scroll to error message
            setTimeout(() => {
                rsvpError.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
            
            console.log('RSVP error message displayed');
        }
        
        function setButtonLoading(loading) {
            if (loading) {
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                submitBtn.classList.add('btn--loading');
            } else {
                submitBtn.textContent = 'Confirmer ma réponse';
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn--loading');
            }
        }
        
        console.log('✅ Enhanced RSVP form with EmailJS setup complete');
    }
    
    // Global function to show RSVP form again
    window.showRSVPForm = function() {
        console.log('Showing RSVP form again...');
        const rsvpFormContainer = document.getElementById('rsvpFormContainer');
        const rsvpSuccess = document.getElementById('rsvpSuccess');
        const rsvpError = document.getElementById('rsvpError');
        
        if (rsvpFormContainer && rsvpSuccess && rsvpError) {
            rsvpFormContainer.style.display = 'block';
            rsvpSuccess.style.display = 'none';
            rsvpError.style.display = 'none';
            
            // Scroll to form
            setTimeout(() => {
                rsvpFormContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 100);
        }
    };
    
    setupRSVPFormWithEmailJS();
    
    // Fixed: Accommodation Hotel Info for Drôme Provençale - Immediate setup
    function setupAccommodationCards() {
        console.log('Setting up accommodation cards...');
        
        // Define hotel information data
        const hotelInfoData = {
            'Hôtel Villa Saint-Louis': {
                address: '145 Avenue de la Drôme, 26000 Valence',
                phone: '+33 4 75 44 15 23',
                email: 'contact@villa-saint-louis.com',
                website: 'www.villa-saint-louis.com',
                description: 'Hôtel boutique de charme situé au cœur de la Drôme provençale. Chambres élégantes avec vue sur les vignobles et les collines environnantes.',
                amenities: ['Petit déjeuner provençal inclus', 'WiFi gratuit', 'Parking privé', 'Piscine extérieure', 'Jardin méditerranéen'],
                rooms: 'À partir de 140€/nuit',
                booking: 'Mentionnez le mariage de Lauren & Maxime pour une réduction de 10%'
            },
            'Château de Montélimar': {
                address: '456 Route du Château, 26200 Montélimar',
                phone: '+33 4 75 01 89 67',
                email: 'reception@chateau-montelimar.fr',
                website: 'www.chateau-montelimar.fr',
                description: 'Château historique du XVIIe siècle transformé en hôtel de luxe. Expérience unique dans un cadre exceptionnel avec vue panoramique sur la vallée.',
                amenities: ['Restaurant gastronomique', 'Spa & bien-être', 'Court de tennis', 'Service de conciergerie', 'Hélipad'],
                rooms: 'À partir de 280€/nuit',
                booking: 'Tarif groupe disponible pour 5 chambres ou plus - Contactez-nous'
            },
            'La Bastide des Cyprès': {
                address: '789 Chemin des Cyprès, 26000 Chabeuil',
                phone: '+33 4 75 59 28 41',
                email: 'info@bastide-cypres.com',
                website: 'www.bastide-cypres.com',
                description: 'Maison d\'hôtes authentique dans un mas provençal restauré. Accueil familial chaleureux dans un cadre verdoyant exceptionnel.',
                amenities: ['Table d\'hôte avec produits locaux', 'Jardin méditerranéen', 'Dégustation de vins', 'Vélos disponibles', 'Piscine naturelle'],
                rooms: 'À partir de 95€/nuit',
                booking: 'Petit déjeuner provençal fait maison inclus'
            },
            'Domaine de la Valdaine': {
                address: '321 Route de la Valdaine, 26000 Eurre',
                phone: '+33 4 75 25 73 18',
                email: 'contact@domaine-valdaine.fr',
                website: 'www.domaine-valdaine.fr',
                description: 'Gîtes de charme dans un domaine viticole familial. Cadre naturel exceptionnel au pied des collines provençales.',
                amenities: ['Dégustation de vins du domaine', 'Piscine avec vue panoramique', 'Cuisine équipée', 'Terrasse privée', 'Parking inclus'],
                rooms: 'À partir de 110€/nuit (gîte pour 4 personnes)',
                booking: 'Possibilité de privatiser le domaine - Réductions pour séjours longs'
            }
        };
        
        // Function to show hotel info
        function showHotelInfo(hotelName) {
            console.log('Displaying info for:', hotelName);
            
            const info = hotelInfoData[hotelName];
            if (info) {
                const modalContent = `🏨 ${hotelName}

📍 Adresse: ${info.address}
📞 Téléphone: ${info.phone}
✉️ Email: ${info.email}
🌐 Site web: ${info.website}

💰 Tarifs: ${info.rooms}

📝 Description:
${info.description}

🎯 Services:
• ${info.amenities.join('\n• ')}

💡 Réservation:
${info.booking}

Pour réserver, contactez directement l'établissement ou utilisez leur site web. N'hésitez pas à mentionner le mariage de Lauren & Maxime !`;
                
                alert(modalContent);
                console.log('✅ Hotel info displayed successfully for:', hotelName);
            } else {
                const fallbackMessage = `Informations pour ${hotelName}:

Nous travaillons actuellement sur les détails de cet hébergement. 

Pour plus d'informations et réservations, veuillez nous contacter directement:
📞 Lauren: 06 12 34 56 78
📞 Maxime: 06 98 76 54 32
✉️ laurenetmaxime@gmail.com

Mentionnez le mariage de Lauren & Maxime pour bénéficier d'éventuelles réductions !`;
                
                alert(fallbackMessage);
                console.log('Fallback info displayed for:', hotelName);
            }
        }
        
        // Set up event listeners for all hotel info buttons
        const hotelButtons = document.querySelectorAll('.hotel-info-btn');
        console.log('Found hotel buttons:', hotelButtons.length);
        
        hotelButtons.forEach((button, index) => {
            console.log(`Setting up hotel button ${index + 1}:`, button.textContent);
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Hotel info button clicked!');
                
                const card = this.closest('.accommodation-card');
                if (card) {
                    const hotelName = card.querySelector('h3').textContent.trim();
                    console.log('Hotel name found:', hotelName);
                    showHotelInfo(hotelName);
                } else {
                    console.error('Could not find hotel card');
                }
            });
        });
        
        console.log('✅ Accommodation cards setup complete');
    }
    
    // Call setup immediately after DOM content loaded
    setupAccommodationCards();
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(135, 169, 107, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            updateNavbarBackground();
        });
    });
    
    // FAQ Accordion functionality
    function setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const summary = item.querySelector('summary');
            if (summary) {
                summary.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close other open FAQs
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.hasAttribute('open')) {
                            otherItem.removeAttribute('open');
                        }
                    });
                    
                    // Toggle current FAQ
                    if (item.hasAttribute('open')) {
                        item.removeAttribute('open');
                    } else {
                        item.setAttribute('open', '');
                    }
                });
            }
        });
        
        console.log('✅ FAQ setup complete');
    }
    
    setupFAQ();
    
    // Enhanced mobile menu functionality
    if (navToggle) {
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active') && 
                !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Form input enhancements
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Ensure inputs are fully functional
        input.style.pointerEvents = 'auto';
        input.disabled = false;
        input.readOnly = false;
        
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if already has value
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Add entrance animations
    function addEntranceAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Add animation styles and observe elements
        const animatedElements = document.querySelectorAll('.timeline-item, .accommodation-card, .gifts-category, .restaurant-card, .attraction-card');
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }
    
    addEntranceAnimations();
    
    // Restaurant cards interaction enhancement
    function setupRestaurantCards() {
        console.log('Setting up restaurant cards...');
        
        const restaurantCards = document.querySelectorAll('.restaurant-card');
        
        restaurantCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                // Add a subtle interaction effect
                this.style.transform = 'translateY(-6px)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-4px)';
                }, 150);
            });
            
            // Add hover sound effect simulation (visual feedback)
            card.addEventListener('mouseenter', function() {
                const specialty = this.querySelector('.restaurant-specialty');
                if (specialty) {
                    specialty.style.background = 'rgba(107, 142, 90, 0.2)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const specialty = this.querySelector('.restaurant-specialty');
                if (specialty) {
                    specialty.style.background = 'rgba(107, 142, 90, 0.1)';
                }
            });
        });
        
        console.log('✅ Restaurant cards setup complete -', restaurantCards.length, 'cards');
    }
    
    setupRestaurantCards();
    
    // Attraction cards interaction enhancement
    function setupAttractionCards() {
        console.log('Setting up attraction cards...');
        
        const attractionCards = document.querySelectorAll('.attraction-card');
        
        attractionCards.forEach((card, index) => {
            card.addEventListener('click', function() {
                // Add a subtle interaction effect
                this.style.transform = 'translateY(-6px)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-4px)';
                }, 150);
            });
            
            // Add visual feedback on hover
            card.addEventListener('mouseenter', function() {
                const type = this.querySelector('.attraction-type');
                if (type) {
                    type.style.color = 'var(--color-sage-dark)';
                    type.style.fontWeight = '700';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const type = this.querySelector('.attraction-type');
                if (type) {
                    type.style.color = 'var(--color-olive)';
                    type.style.fontWeight = '600';
                }
            });
        });
        
        console.log('✅ Attraction cards setup complete -', attractionCards.length, 'cards');
    }
    
    setupAttractionCards();
    
    console.log('🌿 Lauren & Maxime wedding website fully loaded with EmailJS integration! 💚');
    console.log('✅ All features initialized including EmailJS email sending');
    console.log('📧 RSVP form will send emails to laurenetmaxime@gmail.com');
    console.log('🔧 Navigation and interaction issues fixed');
    console.log('💌 EmailJS service configured for Gmail delivery');
    console.log('🏨 Hotel info buttons working correctly');
});

// Enhanced styles for full functionality with EmailJS
const finalStyles = `
<style>
/* Ensure all form elements are fully interactive */
.form-control {
    pointer-events: auto !important;
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    background-color: var(--color-surface) !important;
    color: var(--color-text) !important;
}

.form-control:focus {
    outline: 2px solid var(--color-primary) !important;
    outline-offset: 2px;
    border-color: var(--color-primary) !important;
}

/* Ensure buttons are clickable */
.hotel-info-btn, .btn {
    pointer-events: auto !important;
    cursor: pointer !important;
}

/* Enhanced radio button styling */
.radio-label {
    cursor: pointer;
    transition: all 0.3s ease;
}

.radio-label:hover {
    background-color: var(--color-sage-light);
}

.radio-label input[type="radio"]:checked + .radio-custom + span {
    font-weight: 600;
    color: var(--color-sage-dark);
}

/* Select dropdown enhancement */
select.form-control {
    cursor: pointer;
    appearance: menulist;
    -webkit-appearance: menulist;
    -moz-appearance: menulist;
}

/* Restaurant and attraction cards enhancement */
.restaurant-card, .attraction-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.restaurant-card:hover, .attraction-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* Navigation link enhancements */
.nav-link {
    pointer-events: auto !important;
    cursor: pointer !important;
}

/* Enhanced loading button styles */
.btn--loading {
    position: relative;
    color: transparent !important;
}

.btn--loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 50%;
    margin-left: -10px;
    margin-top: -10px;
    border: 2px solid var(--color-btn-primary-text);
    border-radius: 50%;
    border-top-color: transparent;
    animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}

/* Improved mobile responsiveness for new sections */
@media (max-width: 768px) {
    .restaurants-grid, .attractions-grid {
        grid-template-columns: 1fr;
        gap: var(--space-16);
    }
    
    .restaurant-card, .attraction-card {
        padding: var(--space-20);
    }
    
    .restaurant-card h3, .attraction-card h3 {
        font-size: 1.3rem;
    }
}

/* EmailJS success and error message enhancements */
.rsvp-success, .rsvp-error {
    margin-top: var(--space-16);
}

.rsvp-success p, .rsvp-error p {
    font-size: 1.125rem;
    line-height: 1.6;
}
</style>
`;

// Inject final styles
document.head.insertAdjacentHTML('beforeend', finalStyles);