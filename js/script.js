// Artimus 2k26 - Arcane/Neuraverse Theme JavaScript

// --- Event Data (Rules & Character details) ---
const eventData = {
    'think-tank': {
        title: 'Prompt Arena (Ask GPT)',
        host: 'Heimerdinger',
        image: 'images/Heimerdinger.jpg',
        rules: [
            'Team size: 2–3 members.',
            'Participants receive tasks like tech trivia, logic problems, or creative prompt challenges.',
            'AI tools can be used, but prompt creativity and accuracy determine points.',
            'Time limit per round: 3–5 minutes.',
            'Final round: fastest correct solution wins.'
        ]
    },
    'cipher-hunt': {
        title: 'Cipher Run (Treasure hunt)',
        host: 'Jayce',
        image: 'images/Jayce.jpg',
        rules: [
            'Team size: up to 3 members.',
            'First clue is provided at the starting point. Each clue contains a riddle, cipher, hidden code, or puzzle.',
            'Solving the clue reveals the next campus location where teams collect the next clue.',
            'No running or damaging property.',
            'First team to reach the final hextech artifact wins.'
        ]
    },
    'code-breakers': {
        title: 'Glitch hunt (Bug Bounty)',
        host: 'Jinx',
        image: 'images/Jinx.jpg',
        rules: [
            'Team size: 1–2 members.',
            'Participants receive a demo website/app with intentional bugs.',
            'They must identify and report bugs with explanation.',
            'Scoring: Minor bug (10 points), Functional bug (20 points), Security bug (40 points).',
            'Exploiting systems outside the event environment leads to disqualification.'
        ]
    },
    'innovation-forge': {
        title: 'Code Forge (Mini hackathon)',
        host: 'Viktor',
        image: 'images/Viktor.jpg',
        rules: [
            'Team size: 2–4 members. Time duration: 3–4 hours.',
            'Theme/problem statement announced at the start. Build Web apps, AI tools, Automation tools, or Utilities.',
            'Judging criteria: Innovation (30%), Functionality (30%), UI/UX (20%), Presentation (20%).',
            'Each team presents a 3–5 minute demo to judges.',
            'Best solution wins.'
        ]
    },
    'power-auction': {
        title: 'PowerPlay Draft (IPL Auction)',
        host: 'Silco',
        image: 'images/Renata.jpg',
        rules: [
            'Power comes to those who will do anything to achieve it.',
            'Manage your virtual budget and bid on players to build the ultimate team.',
            'Teams of up to 3 members.',
            'Bidding increments are fixed. No exact tie-breakers.',
            'The highest rated team wins the turf.'
        ]
    },
    'zaun-carnival': {
        title: 'Chaos Carnival (Fun Fiesta)',
        host: 'Ekko',
        image: 'images/Ekko.jpg',
        rules: [
            'Welcome to the Fun Fiesta!',
            'Participate in various mini-games and carnival activities.',
            'Collect points at each station to redeem for prizes.',
            'Keep it clean – no fighting with the enforcers!'
        ]
    },
    'battle-nexus': {
        title: 'Jinx Playground (E-Sports)',
        host: 'Vi',
        image: 'images/Vi.jpg',
        rules: [
            'Step into the ring. Standard Esports tournament brackets.',
            'Titles include Valorant and BGMI.',
            'Bring your own peripherals (optional but recommended).',
            'Toxic behavior will lead to disqualification. Respect the ring.',
        ]
    },
    'piltover-gala': {
        title: 'SoundStorm (Sound Party)',
        host: 'Caitlyn',
        image: 'images/Caitlyn.jpg',
        rules: [
            'A classy Gowned Party event.',
            'Dress code is strictly formal / gala attire.',
            'Enjoy music, networking, and high-society Piltover elegance.',
            'Weapons are to be checked at the door.'
        ]
    }
};

// --- COUNTDOWN TIMER ---
// Set date for the symposium
const eventDate = new Date('2026-03-25T09:00:00');

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate.getTime() - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add leading zero
    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- EVENT FILTERING ---
const filterBtns = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.neura-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        eventCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'flex';
                // Trigger reflow for animation
                setTimeout(() => card.style.opacity = '1', 10);
            } else if (card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300); // Wait for fade out
            }
        });
    });
});

// --- MODAL LOGIC ---
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalHost = document.getElementById('modal-host');
const modalImage = document.getElementById('modal-char-img');
const modalRules = document.getElementById('modal-rules');

function openModal(eventId) {
    const data = eventData[eventId];
    if (!data) return;

    // Populate data
    modalTitle.textContent = data.title;
    modalHost.textContent = `Host: ${data.host}`;
    modalImage.src = data.image;

    // Populate Rules
    modalRules.innerHTML = '';
    const ul = document.createElement('ul');
    data.rules.forEach(rule => {
        const li = document.createElement('li');
        li.textContent = rule;
        ul.appendChild(li);
    });
    modalRules.appendChild(ul);

    // Show modal
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modalContainer.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal on outside click
modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
        closeModal();
    }
});

// --- SCROLL ANIMATIONS ---
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    // Neuraverse shrinks paddings slightly on scroll
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 17, 32, 0.95)';
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(11, 17, 32, 0.85)';
        navbar.style.padding = '0 0';
        navbar.style.boxShadow = 'none';
    }
});

// Interaction Observers for Element reveals
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.10 });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Loader 
window.addEventListener('load', () => {
    const loader = document.getElementById('welcome-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500); // 1.5s
    }
});

// --- SPIDER WEB (PARTICLES) BACKGROUND ---
const canvas = document.getElementById('spider-web');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.size = (Math.random() * 2) + 0.5;
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Slow, drifting movement
            this.dx = (Math.random() - 0.5) * 0.8;
            this.dy = (Math.random() - 0.5) * 0.8;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 242, 255, 0.4)'; // Cyber cyan
            ctx.fill();
        }

        update() {
            // Bounce off edges
            if (this.x > width || this.x < 0) this.dx = -this.dx;
            if (this.y > height || this.y < 0) this.dy = -this.dy;

            this.x += this.dx;
            this.y += this.dy;

            // Connect to mouse interactions (repel slightly)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const dirX = forceDirectionX * force * 1.5;
                    const dirY = forceDirectionY * force * 1.5;
                    this.x -= dirX;
                    this.y -= dirY;
                }
            }
            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        // Density based on screen size
        let numberOfParticles = Math.floor((width * height) / 10000);
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        // Draw connections (Spider web effect)
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
            // Draw lines from nodes to the mouse if nearby
            if (mouse.x !== null && mouse.y !== null) {
                let dxMouse = mouse.x - particles[a].x;
                let dyMouse = mouse.y - particles[a].y;
                let distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                if (distanceMouse < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 255, ${0.3 * (1 - distanceMouse / mouse.radius)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Initialize Canvas
    window.addEventListener('load', () => {
        resize();
        animateParticles();
    });
}

// --- BACKGROUND SLIDER LOGIC ---
const bgImages = [
    'images/textless_bg_1.jpg',
    'images/textless_bg_2.jpg',
    'images/textless_bg_3.jpg',
    'images/textless_bg_4.jpg',
    'images/textless_bg_5.jpg',
    'images/textless_bg_6.jpg',
    'images/textless_bg_7.jpg',
    'images/textless_bg_8.jpg'
];

const bgSlider = document.getElementById('bg-slider');

if (bgSlider) {
    // 1. Create img tags for each bgImage
    bgImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('bg-slide');
        if (index === 0) img.classList.add('active'); // First image is active
        bgSlider.insertBefore(img, bgSlider.querySelector('.bg-overlay'));
    });

    const slides = document.querySelectorAll('.bg-slide');
    let currentSlide = 0;

    // 2. Rotate images every 6 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 6000);
}
