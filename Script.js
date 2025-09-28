// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeSwiper();
  initializeDarkMode();
  initializeScrollToTop();
  initializeSearchPopup();
  initializePreloader();
});

// Swiper Carousel Initialization
function initializeSwiper() {
  const featuredSwiper = new Swiper('.featured-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
}

// Dark Mode Functionality
function initializeDarkMode() {
  const themeToggle = document.querySelector('.theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation class
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300);
  });
}

// Scroll to Top Functionality
function initializeScrollToTop() {
  const scrollButton = document.getElementById('scrollToTop');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  scrollButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Search Popup Functionality
function initializeSearchPopup() {
  const searchButton = document.querySelector('.search-button');
  const searchPopup = document.querySelector('.search-popup');
  const searchClose = document.querySelector('.search-popup');
  
  searchButton.addEventListener('click', function(e) {
    e.preventDefault();
    searchPopup.classList.add('active');
    document.getElementById('search-form').focus();
  });
  
  searchPopup.addEventListener('click', function(e) {
    if (e.target === searchPopup) {
      searchPopup.classList.remove('active');
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      searchPopup.classList.remove('active');
    }
  });
}

// Preloader Functionality
function initializePreloader() {
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  });
}

// Smooth Scroll for Navigation Links
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

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    const submitBtn = this.querySelector('button');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for subscribing to Ummi Gorgeous Essentials!');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  });
}

// Add to Cart Functionality
document.querySelectorAll('.product-item .btn').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.closest('.product-item').querySelector('h5').textContent;
    const productPrice = this.closest('.product-item').querySelector('.price').textContent;
    
    // Add animation
    this.textContent = 'Added!';
    this.classList.add('btn-success');
    
    setTimeout(() => {
      this.textContent = 'Add to Cart';
      this.classList.remove('btn-success');
    }, 2000);
    
    // Show notification
    showNotification(`${productName} added to cart!`);
  });
});

// Notification System
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 5px;
    z-index: 1000;
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
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Image Lazy Loading
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}