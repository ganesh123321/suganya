document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Header Scroll Effect & Glassmorphism
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Tabs with Animation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCategories = document.querySelectorAll('.product-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Handle transition
            productCategories.forEach(cat => {
                cat.style.opacity = '0';
                cat.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    cat.classList.remove('active');
                }, 300);
            });
            
            // Show target category
            const targetId = btn.getAttribute('data-target');
            const targetCat = document.getElementById(targetId);
            
            setTimeout(() => {
                targetCat.classList.add('active');
                // Trigger reflow
                void targetCat.offsetWidth;
                targetCat.style.opacity = '1';
                targetCat.style.transform = 'translateY(0)';
            }, 300);
        });
    });

    // Service Detailed Data & Modal Logic
    const serviceDetails = {
        fancy: {
            title: "Fancy Store Details",
            icon: "fa-gifts",
            desc: "Our fancy store offers a spectacular variety of cosmetics, perfumes, toys, and premium gift items. We take pride in stocking high-quality household goods for your everyday needs. <br><br><strong>What We Offer:</strong> Top cosmetics brands, trending toys, elegant gifting accessories, and more. <br><br><strong>Why Choose Us?</strong> Best retail prices, guaranteed authentic products, and a massive collection ensuring you always find exactly what you're looking for."
        },
        wholesale: {
            title: "Wholesale Supply Details",
            icon: "fa-boxes",
            desc: "We are the leading bulk supplier of toys and imported China goods in the Dharmapuri region. Our B2B model is meticulously designed to support local shops and retailers with high-margin products. <br><br><strong>Our Categories:</strong> Soft toys, educational toys, electronic gadgets, seasonal festive items, and imported plastics. <br><br><strong>The Wholesale Benefit:</strong> Highly competitive pricing, reliable stock availability, and dedicated support for growing retail businesses."
        },
        pipes: {
            title: "Narmada Pipes Dealership Details",
            icon: "fa-tools",
            desc: "As the authorized premier dealer for Narmada Pipes in Krishnagiri and Dharmapuri, we provide top-tier plumbing and agricultural piping solutions. <br><br><strong>Products Available:</strong><br><ul style=\"margin-left: 20px; margin-top: 10px;\"><li>UPVC Pressure Pipes</li><li>UPVC Casing Pipes</li><li>PP-R Pipes</li><li>PE-X Pipes & Fittings</li><li>HDPE Pipes</li><li>Drip Irrigation Systems</li><li>Sprinkler Irrigation System</li></ul><br><strong>Ideal For:</strong> Builders, contractors, plumbers, and farmers seeking durable, leak-proof, and weather-resistant solutions manufactured to industry-leading standards."
        }
    };

    const serviceCards = document.querySelectorAll('.service-card');
    const modalOverlay = document.getElementById('serviceModal');
    const modalClose = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalDesc = document.getElementById('modalDescription');

    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-service');
            const data = serviceDetails[key];
            if(!data) return;
            
            // Populate data
            modalTitle.textContent = data.title;
            modalIcon.className = `fas ${data.icon}`;
            modalDesc.innerHTML = data.desc;
            
            // Open Modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if(modalClose) modalClose.addEventListener('click', closeModal);
    if(modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) closeModal();
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.service-card, .product-card, .about-content, .about-image, .dealership-content, .dealership-image, .contact-wrapper, .section-title');
    
    // Add initial classes
    revealElements.forEach(el => {
        el.classList.add('reveal-hidden');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Contact Form Submission with EmailJS
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            if(name && phone && message) {
                // Button animation
                const btn = inquiryForm.querySelector('button');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Prepare template params
                const templateParams = {
                    from_name: name,
                    phone_number: phone,
                    message: message,
                    to_name: "Suganya Groups"
                };

                // Send email via EmailJS
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                        btn.style.backgroundColor = '#10b981'; // Success Green
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = '';
                            inquiryForm.reset();
                        }, 3000);
                    }, function(error) {
                        console.log('FAILED...', error);
                        btn.innerHTML = '<i class="fas fa-times"></i> Failed';
                        btn.style.backgroundColor = '#ef4444'; // Error Red
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.backgroundColor = '';
                        }, 3000);
                    });
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
