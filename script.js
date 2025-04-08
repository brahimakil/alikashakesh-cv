document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.replace('light-mode', 'dark-mode');
    }
    
    // Check for saved language preference or use French as default
    const savedLanguage = localStorage.getItem('language') || 'fr';
    setLanguage(savedLanguage);
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Language toggle functionality
    const languageToggle = document.querySelector('.language-toggle');
    
    languageToggle.addEventListener('click', () => {
        const currentLanguage = document.body.getAttribute('data-language');
        const newLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    });
    
    // Function to set language
    function setLanguage(language) {
        document.body.setAttribute('data-language', language);
        
        // Hide all language elements
        document.querySelectorAll('.lang-en, .lang-fr').forEach(el => {
            el.style.display = 'none';
        });
        
        // Show only the selected language elements
        document.querySelectorAll(`.lang-${language}`).forEach(el => {
            el.style.display = 'inline';
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = language;
    }
    
    // Print/PDF export functionality
    const printButton = document.querySelector('.print-button');
    
    printButton.addEventListener('click', () => {
        // Temporarily add a class for print styling
        document.body.classList.add('printing');
        
        // Use browser print functionality
        window.print();
        
        // Remove the print class after a delay
        setTimeout(() => {
            document.body.classList.remove('printing');
        }, 1000);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to skill bars
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Trigger animation when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});