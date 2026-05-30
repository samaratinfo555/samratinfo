/* ==========================================================================
   SAMRAT INFO - FRONTEND INTERACTION SCRIPTS (JAVASCRIPT)
   Author: Antigravity AI
   Managed for Founder: Indal Kumar Jaiswal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE NAVIGATION HAMBURGER MENU
    // ==========================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Toggle body scrolling to prevent scroll background when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // ==========================================
    // 2. SCROLLED HEADER EFFECT & NAVIGATION ACTIVE LINKS
    // ==========================================
    const mainHeader = document.getElementById('mainHeader');
    const sections = document.querySelectorAll('section');

    const handleScrollEffects = () => {
        const scrollPosition = window.scrollY;

        // Sticky scrolled styling
        if (mainHeader) {
            if (scrollPosition > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        }

        // Active link highlighting based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140; // Offset for header height
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}` || 
                   (currentSectionId === 'heroSection' && link.getAttribute('href') === '#')) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', handleScrollEffects);


    // ==========================================
    // 3. STATISTICAL COUNTERS ANIMATION ON SCROLL
    // ==========================================
    const counterNumbers = document.querySelectorAll('.counter-number');
    let countersAnimated = false;

    const animateCounters = () => {
        counterNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 1500; // 1.5 seconds
            const stepTime = Math.max(Math.floor(duration / target), 10);
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, stepTime);
        });
    };

    // Intersection Observer to detect when user reaches the counter segment
    const countersGrid = document.getElementById('countersGrid');
    if (countersGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    animateCounters();
                    countersAnimated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(countersGrid);
    }


    // ==========================================
    // 4. TESTIMONIALS SLIDER / CAROUSEL
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    };

    const startSlideShow = () => {
        slideInterval = setInterval(nextSlide, 5000); // Shift every 5 seconds
    };

    const stopSlideShow = () => {
        clearInterval(slideInterval);
    };

    // Initialize dots clicking interaction
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Start auto slider if elements exist
    if (slides.length > 0) {
        startSlideShow();
    }


    // ==========================================
    // 5. INQUIRY FORM VALIDATION & MODAL SUCCESS FEEDBACK
    // ==========================================
    const inquiryForm = document.getElementById('inquiryForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (inquiryForm && successModal) {
        inquiryForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop native page reload

            // Gather inputs (just for confirmation and sanitization)
            const nameInput = document.getElementById('formName').value.trim();
            const emailInput = document.getElementById('formEmail').value.trim();
            const phoneInput = document.getElementById('formPhone').value.trim();
            const serviceSelect = document.getElementById('formService').value;
            const messageInput = document.getElementById('formMessage').value.trim();

            if (!nameInput || !emailInput || !phoneInput || !serviceSelect || !messageInput) {
                alert('Please complete all required fields.');
                return;
            }

            // Simulate form dispatching delay
            const submitBtn = document.getElementById('formSubmitBtn');
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing Request...';

            setTimeout(() => {
                // Show custom modal overlays
                successModal.classList.add('show');
                document.body.style.overflow = 'hidden';

                // Reset form values and button configurations
                inquiryForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1000);
        });

        // Close modal actions
        const closeModal = () => {
            successModal.classList.remove('show');
            document.body.style.overflow = '';
        };

        closeModalBtn.addEventListener('click', closeModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeModal();
            }
        });
    }

    // ==========================================
    // 5B. DYNAMIC STARTUP BUSINESS PLANNER
    // ==========================================
    const selectorBtns = document.querySelectorAll('.selector-btn');
    const plannerDisplayCard = document.getElementById('plannerDisplayCard');
    
    // Venture datasets mapped fully
    const ventureData = {
        ai: {
            title: "AI Automation Business",
            niche: "Very High Demand",
            invest: "Low",
            profit: "Very High",
            speed: "1 - 2 Weeks",
            services: [
                "Custom AI Chatbots & assistants for sites",
                "WhatsApp auto-reply systems & sales leads routing",
                "AI customer support integrations & workflows",
                "AI invoice generator & data-entry script pipelines",
                "Auto AI social media content generation systems"
            ],
            target: "Small local businesses, online coaching centers, real estate developers, and private hospitals.",
            names: ["Nexora IT", "DigiRise Solutions", "SmartLink IT", "VisionTech India"],
            serviceVal: "aiautomation"
        },
        marketing: {
            title: "Digital Marketing Agency",
            niche: "Always In Demand",
            invest: "Low",
            profit: "High",
            speed: "1 Week",
            services: [
                "Instagram & Meta business promotions",
                "High-ROI Google Search & Banner Ad setups",
                "Optimized Search Engine Optimization (SEO) setups",
                "High-retention Video Editing & Youtube management",
                "Poster, banner, & digital card brand design"
            ],
            target: "E-commerce stores, local clinics, gyms, fitness centers, and startups.",
            names: ["DigiRise Solutions", "UrbanByte Technologies", "Samrat Tech Solutions"],
            serviceVal: "digitalmarketing"
        },
        listing: {
            title: "Local Business Listing App",
            niche: "Passive Income",
            invest: "Medium",
            profit: "Very High",
            speed: "3 - 4 Weeks",
            services: [
                "Nearby shop catalogs & distance coordinates search",
                "User review systems & rating stars metrics",
                "Instant call & direct WhatsApp action triggers",
                "Google Maps API path integrations",
                "Sponsored premium ad placements for business owners"
            ],
            target: "Retailers, service providers, and citizens in Noida, Kanpur, or Mumbai.",
            names: ["CityConnect", "BizFinder", "QuickMarket", "LocalHub", "NearPoint", "UrbanLink"],
            serviceVal: "locallisting"
        },
        repair: {
            title: "Computer Repair & IT Support",
            niche: "Highly Stable",
            invest: "Medium",
            profit: "Stable Profits",
            speed: "2 Weeks",
            services: [
                "Professional Laptop & desktop troubleshooting/repair",
                "CCTV installation & office router setup networks",
                "Printer micro-servicing & components replacements",
                "Custom offices workspace hardware architecture configurations",
                "Annual Maintenance Contracts (AMC) support services"
            ],
            target: "Commercial offices, co-working spaces, colleges, and local residents.",
            names: ["Samrat Tech Solutions", "SmartLink IT", "VisionTech India"],
            serviceVal: "hardware"
        },
        saas: {
            title: "SaaS Software Company",
            niche: "Recurring Earning Model",
            invest: "Medium",
            profit: "Very High",
            speed: "4 - 6 Weeks",
            services: [
                "Cloud billing & invoices dashboard systems",
                "School, colleges & student management portals",
                "Gym subscriptions & automated payment gateways",
                "Inventory tracking & warehouses stock trackers",
                "Salon, spa, and clinic automated booking schedulers"
            ],
            target: "Schools, gyms, large retail shops, salons, and mid-size corporate enterprises.",
            names: ["Nexora IT", "UrbanByte Technologies", "DigiRise Solutions"],
            serviceVal: "saas"
        },
        ecommerce: {
            title: "E-commerce Brand Setup",
            niche: "High Growth",
            invest: "Medium",
            profit: "Scalable Profit",
            speed: "2 - 3 Weeks",
            services: [
                "Custom web shopping platforms (accessories, LEDs)",
                "Full shop sync setups for Amazon & Flipkart",
                "Secure global checkout gateway integrations",
                "Automated delivery dispatch & logistic APIs",
                "Digital promotions & banner layout brand designs"
            ],
            target: "Online retail consumers, local wholesalers, and computer accessory shoppers.",
            names: ["QuickMarket", "UrbanLink", "Nexora IT"],
            serviceVal: "ecommerce"
        }
    };

    const updatePlannerDisplay = (ventureKey) => {
        const data = ventureData[ventureKey];
        if (!data || !plannerDisplayCard) return;

        // Transition fade animation
        plannerDisplayCard.style.opacity = '0.3';
        plannerDisplayCard.style.transform = 'translateY(10px)';

        setTimeout(() => {
            document.getElementById('displayVentureTitle').textContent = data.title;
            document.getElementById('displayVentureNiche').textContent = data.niche;
            document.getElementById('displayVentureInvest').textContent = data.invest;
            document.getElementById('displayVentureProfit').textContent = data.profit;
            document.getElementById('displayVentureSpeed').textContent = data.speed;

            // Render services list
            const servicesContainer = document.getElementById('displayVentureServices');
            servicesContainer.innerHTML = '';
            data.services.forEach(service => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-chevron-right"></i> ${service}`;
                servicesContainer.appendChild(li);
            });

            // Render target
            document.getElementById('displayVentureTarget').textContent = data.target;

            // Render names
            const namesContainer = document.getElementById('displayVentureNames');
            namesContainer.innerHTML = '';
            data.names.forEach(name => {
                const span = document.createElement('span');
                span.textContent = name;
                namesContainer.appendChild(span);
            });

            // Update CTA dataset attributes
            const ctaBtn = document.getElementById('displayVentureCta');
            if (ctaBtn) {
                ctaBtn.setAttribute('data-target-val', data.serviceVal);
                ctaBtn.setAttribute('data-target-title', data.title);
            }

            plannerDisplayCard.style.opacity = '1';
            plannerDisplayCard.style.transform = 'translateY(0)';
        }, 200);
    };

    if (selectorBtns.length > 0) {
        selectorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                selectorBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const ventureKey = btn.getAttribute('data-venture');
                updatePlannerDisplay(ventureKey);
            });
        });
        
        // Load initial state
        updatePlannerDisplay('ai');
    }

    // Pre-fill helper
    window.selectServiceInForm = (serviceValue, customMessage) => {
        const serviceSelect = document.getElementById('formService');
        const messageTextarea = document.getElementById('formMessage');
        const contactSection = document.getElementById('contact');
        
        if (serviceSelect) {
            serviceSelect.value = serviceValue;
        }
        
        if (messageTextarea) {
            if (customMessage) {
                messageTextarea.value = customMessage;
            } else {
                messageTextarea.value = `I am interested in setting up or purchasing your services for: ${serviceValue}. Please contact me with more information.`;
            }
        }

        // Scroll cleanly to the contact section
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Blueprint prefill handler
    window.requestStartupPlan = () => {
        const ctaBtn = document.getElementById('displayVentureCta');
        if (!ctaBtn) return;
        const serviceVal = ctaBtn.getAttribute('data-target-val') || 'other';
        const ventureTitle = ctaBtn.getAttribute('data-target-title') || 'Tech Venture';
        
        const customMessage = `Hello Indal Kumar Jaiswal, I am interested in launching a new startup under the model: "${ventureTitle}". Please share pricing, setup steps, and technical support details for this venture.`;
        
        selectServiceInForm(serviceVal, customMessage);
    };


    // ==========================================
    // 5C. EMPLOYEE PORTAL CONTROLLER
    // ==========================================
    const navPortalLink = document.getElementById('navPortalLink');
    const portalModal = document.getElementById('portalModal');
    const closePortalBtn = document.getElementById('closePortalBtn');
    const portalPasswordToggle = document.getElementById('portalPasswordToggle');
    const portalPasswordInput = document.getElementById('portalPassword');
    const portalPasswordEye = document.getElementById('portalPasswordEye');
    const portalLoginForm = document.getElementById('portalLoginForm');
    const portalLoginPanel = document.getElementById('portalLoginPanel');
    const portalDashboardPanel = document.getElementById('portalDashboardPanel');
    const portalLogoutBtn = document.getElementById('portalLogoutBtn');
    const portalErrorMsg = document.getElementById('portalErrorMsg');

    // Open Portal Modal
    if (navPortalLink && portalModal) {
        navPortalLink.addEventListener('click', (e) => {
            e.preventDefault();
            portalModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Portal Modal
    const closePortalModal = () => {
        if (portalModal) {
            portalModal.classList.remove('show');
            document.body.style.overflow = '';
            if (portalErrorMsg) portalErrorMsg.textContent = '';
        }
    };

    if (closePortalBtn) {
        closePortalBtn.addEventListener('click', closePortalModal);
    }

    if (portalModal) {
        portalModal.addEventListener('click', (e) => {
            if (e.target === portalModal) {
                closePortalModal();
            }
        });
    }

    // Password Visibility Toggle
    if (portalPasswordToggle && portalPasswordInput && portalPasswordEye) {
        portalPasswordToggle.addEventListener('click', () => {
            const isPassword = portalPasswordInput.getAttribute('type') === 'password';
            portalPasswordInput.setAttribute('type', isPassword ? 'text' : 'password');
            portalPasswordEye.className = isPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        });
    }

    // Portal Simulated Authentication
    if (portalLoginForm && portalLoginPanel && portalDashboardPanel) {
        portalLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameVal = document.getElementById('portalUsername').value.trim();
            const passwordVal = portalPasswordInput.value;

            if (usernameVal === 'admin' && passwordVal === 'password123') {
                // Correct credentials - simulate loading spinner
                const submitBtn = document.getElementById('portalLoginSubmitBtn');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
                
                setTimeout(() => {
                    // Success switch panels
                    portalLoginPanel.style.display = 'none';
                    portalDashboardPanel.style.display = 'block';
                    
                    // Reset spinner
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }, 800);
            } else {
                // Incorrect credentials
                if (portalErrorMsg) {
                    portalErrorMsg.textContent = '❌ Access Denied: Invalid operator credentials.';
                }
            }
        });
    }

    // Portal Logout
    if (portalLogoutBtn && portalLoginPanel && portalDashboardPanel) {
        portalLogoutBtn.addEventListener('click', () => {
            portalDashboardPanel.style.display = 'none';
            portalLoginPanel.style.display = 'block';
            if (portalLoginForm) portalLoginForm.reset();
            if (portalErrorMsg) portalErrorMsg.textContent = '';
            if (portalPasswordInput) {
                portalPasswordInput.setAttribute('type', 'password');
                if (portalPasswordEye) portalPasswordEye.className = 'fa-solid fa-eye';
            }
        });
    }

    // Global Resolver Action for Technical Queue
    window.resolveTicket = (rowId) => {
        const ticketRow = document.getElementById(rowId);
        const activeTicketsEl = document.getElementById('dashActiveTickets');
        const completedTasksEl = document.getElementById('dashCompletedTasks');

        if (ticketRow) {
            // Apply sleek fade transition before deletion
            ticketRow.style.opacity = '0.3';
            ticketRow.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                ticketRow.remove();
                
                // Decrement active counter
                if (activeTicketsEl) {
                    let currentActive = parseInt(activeTicketsEl.textContent, 10);
                    if (currentActive > 0) activeTicketsEl.textContent = currentActive - 1;
                }
                
                // Increment completed counter
                if (completedTasksEl) {
                    let currentCompleted = parseInt(completedTasksEl.textContent, 10);
                    completedTasksEl.textContent = currentCompleted + 1;
                }
            }, 500);
        }
    };


    // ==========================================
    // 6. SCROLL TO TOP UTILITY
    // ==========================================
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
