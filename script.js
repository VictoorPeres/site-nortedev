document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const navLinks = document.querySelectorAll('.nav-link, .footer-nav a, .hero-buttons .btn');
    const header = document.querySelector('.header');

    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form submission - WhatsApp
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Redirecionando...';
            button.disabled = true;

            // Número de WhatsApp (apenas números, com DDI
            const whatsappNumber = '559292984357215';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            const serviceOptions = {
                'site': 'Sites Institucionais',
                'corporativo': 'Sistemas Corporativos',
                'flutter': 'Apps com Flutter',
                'automacao-ia': 'Automação com IA'
            };
            const serviceText = serviceOptions[service] || 'Não selecionado';

            let whatsappMessage = `*Novo contato do site*\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            whatsappMessage += `*E-mail:* ${email}\n`;
            if (phone) {
                whatsappMessage += `*Telefone:* ${phone}\n`;
            }
            whatsappMessage += `*Serviço desejado:* ${serviceText}\n`;
            whatsappMessage += `*Mensagem:* ${message}`;

            const whatsappMessageEncoded = encodeURIComponent(whatsappMessage);

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessageEncoded}`;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 500);
        });
    }

    // Header scroll behavior
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        lastScrollY = window.scrollY;
    });
});
