// Enhanced Feel-Good Apology Card
class HeartfeltApology {
    constructor() {
        this.sweetMessages = [
            
        ];

        this.inspirationalQuotes = [
            
        ];

        this.memoryEmojis = ["📸", "🎈", "🌈", "🦋", "🌸", "⭐", "🍀", "🌺", "💫", "🎪"];
        this.compliments = [
            
        ];

        this.isHugActive = false;
        this.forgiveClicked = false;
        this.hasBeenOpened = false;
        
        this.init();
    }

    init() {
        this.createFloatingHearts();
        // this.createMemoryPhotos();
        this.createFloatingCompliments();
        this.setupEventListeners();
        this.createSparkles();
        this.initializeTypingEffect();
        this.startInspirationQuotes();
        this.setupSweetMessageTriggers();
    }

    initializeTypingEffect() {
        // Don't hide content initially - let CSS handle it
        // Just prepare for typing effect
    }

    createFloatingHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        
        setInterval(() => {
            if (document.querySelectorAll('.heart').length < 8) {
                this.createHeart(heartsContainer);
            }
        }, 3000);
    }

    createHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.color = `hsl(${Math.random() * 60 + 320}, 70%, 60%)`;
        
        container.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 10000);
    }

    createMemoryPhotos() {
        const memoryContainer = document.querySelector('.memory-photos');
        
        setInterval(() => {
            if (document.querySelectorAll('.memory-photo').length < 3) {
                this.createMemoryPhoto(memoryContainer);
            }
        }, 8000);
    }

    createMemoryPhoto(container) {
        const photo = document.createElement('div');
        photo.classList.add('memory-photo');
        photo.innerHTML = this.memoryEmojis[Math.floor(Math.random() * this.memoryEmojis.length)];
        photo.style.top = Math.random() * 80 + 10 + '%';
        photo.style.animationDelay = Math.random() * 2 + 's';
        
        photo.addEventListener('click', () => {
            this.showSweetMessage();
            photo.style.transform += ' scale(1.3)';
            setTimeout(() => {
                photo.style.transform = photo.style.transform.replace(' scale(1.3)', '');
            }, 300);
        });
        
        container.appendChild(photo);
        
        setTimeout(() => {
            if (photo.parentNode) {
                photo.parentNode.removeChild(photo);
            }
        }, 20000);
    }

    createFloatingCompliments() {
        const complimentsContainer = document.querySelector('.floating-compliments');
        
        setInterval(() => {
            if (document.querySelectorAll('.compliment').length < 2) {
                this.createCompliment(complimentsContainer);
            }
        }, 6000);
    }

    createCompliment(container) {
        const compliment = document.createElement('div');
        compliment.classList.add('compliment');
        compliment.textContent = this.compliments[Math.floor(Math.random() * this.compliments.length)];
        compliment.style.left = Math.random() * 70 + 15 + '%';
        compliment.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(compliment);
        
        setTimeout(() => {
            if (compliment.parentNode) {
                compliment.parentNode.removeChild(compliment);
            }
        }, 8000);
    }

    createSparkles() {
        const sparklesContainer = document.querySelector('.sparkles');
        
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            sparklesContainer.appendChild(sparkle);
        }
    }

    setupEventListeners() {
        // Forgive button
        const forgiveBtn = document.getElementById('forgiveBtn');
        forgiveBtn.addEventListener('click', () => {
            this.handleForgiveness();
        });

        // Card interactions
        const card = document.getElementById('mainCard');
        
        // Keep hover effect for desktop
        card.addEventListener('mouseenter', () => {
            const clickIndicator = document.getElementById('clickIndicator');
            
            // Hide click indicator on hover (desktop users)
            if (clickIndicator && !this.hasBeenOpened) {
                clickIndicator.style.opacity = '0';
                clickIndicator.style.transform = 'scale(0.5)';
                this.hasBeenOpened = true;
            }
            
            this.onCardHover();
            // Start typing effect on hover for desktop
            if (!card.classList.contains('open')) {
                setTimeout(() => {
                    this.startTypingEffect();
                }, 300);
            }
        });

        // Reset on mouse leave for desktop
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('open')) {
                this.resetTypingEffect();
            }
        });

        // Click to toggle card open/close for mobile
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            this.toggleCard();
        });

        // Click outside to close card
        document.addEventListener('click', (e) => {
            const cardContainer = document.querySelector('.card-container');
            if (!cardContainer.contains(e.target)) {
                this.closeCard();
            }
            
            if (Math.random() < 0.3) { // 30% chance for sweet message
                this.showSweetMessage();
            }
        });
    }

    handleForgiveness() {
        if (this.forgiveClicked) return;
        
        this.forgiveClicked = true;
        const btn = document.getElementById('forgiveBtn');
        
        // Change button text
        btn.querySelector('.btn-text').textContent = 'Thank you! You\'re amazing! 💖';
        btn.style.background = 'linear-gradient(45deg, #4CAF50, #81C784)';
        
        // Create heart explosion
        this.createHeartExplosion(btn);
        
        // Show virtual hug
        setTimeout(() => {
            this.showVirtualHug();
        }, 1000);
        
        // Show special thank you message
        setTimeout(() => {
            this.showSpecialThankYou();
        }, 3000);
        
        // Continuous heart rain
        this.startHeartRain();
    }

    createHeartExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.color = '#FF6B9D';
            heart.style.fontSize = '18px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            const angle = (i / 20) * Math.PI * 2;
            const velocity = 150;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            heart.style.animation = `heartExplosion 2s ease-out forwards`;
            heart.style.setProperty('--vx', vx + 'px');
            heart.style.setProperty('--vy', vy + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }
    }

    showVirtualHug() {
        if (this.isHugActive) return;
        
        this.isHugActive = true;
        const virtualHug = document.getElementById('virtualHug');
        virtualHug.classList.add('active');
        
        setTimeout(() => {
            virtualHug.classList.remove('active');
            this.isHugActive = false;
        }, 3000);
    }

    showSweetMessage() {
        const messages = document.querySelectorAll('.sweet-message');
        const hiddenMessages = Array.from(messages).filter(msg => !msg.classList.contains('show'));
        
        if (hiddenMessages.length > 0) {
            const randomMessage = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
            randomMessage.classList.add('show');
            
            // Position randomly
            randomMessage.style.left = Math.random() * 60 + 20 + '%';
            randomMessage.style.top = Math.random() * 60 + 20 + '%';
            
            setTimeout(() => {
                randomMessage.classList.remove('show');
            }, 4000);
        }
    }

    startInspirationQuotes() {
        const quoteBubble = document.querySelector('.quote-bubble');
        let currentQuoteIndex = 0;
        
        const showNextQuote = () => {
            quoteBubble.classList.add('show');
            document.getElementById('inspirationText').textContent = 
                this.inspirationalQuotes[currentQuoteIndex];
            
            setTimeout(() => {
                quoteBubble.classList.remove('show');
            }, 4000);
            
            currentQuoteIndex = (currentQuoteIndex + 1) % this.inspirationalQuotes.length;
        };
        
        // Show first quote after 2 seconds
        setTimeout(showNextQuote, 2000);
        
        // Then show every 8 seconds
        setInterval(showNextQuote, 8000);
    }

    setupSweetMessageTriggers() {
        // Show sweet messages when hovering over different parts
        const triggers = document.querySelectorAll('.message-line, .title-main, .subtitle, .beating-heart');
        
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                if (Math.random() < 0.4) { // 40% chance
                    this.showSweetMessage();
                }
            });
        });
    }

    onCardHover() {
        this.createTemporarySparkles();
        
        // Create gentle hearts around card
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createGentleHeart();
            }, i * 200);
        }
    }

    toggleCard() {
        const card = document.getElementById('mainCard');
        const isOpen = card.classList.contains('open');
        
        if (isOpen) {
            this.closeCard();
        } else {
            this.openCard();
        }
    }

    openCard() {
        const card = document.getElementById('mainCard');
        const clickIndicator = document.getElementById('clickIndicator');
        
        card.classList.add('open');
        
        // Hide the click indicator after first interaction
        if (clickIndicator && !this.hasBeenOpened) {
            clickIndicator.style.opacity = '0';
            clickIndicator.style.transform = 'scale(0.5)';
            this.hasBeenOpened = true;
        }
        
        // Trigger hover effects for mobile
        this.onCardHover();
        
        // Start typing effect after card opens
        setTimeout(() => {
            this.startTypingEffect();
        }, 500);
    }

    closeCard() {
        const card = document.getElementById('mainCard');
        card.classList.remove('open');
        
        // Reset typing effect when closing
        this.resetTypingEffect();
    }

    startTypingEffect() {
        const messageLines = document.querySelectorAll('.message-line');
        const signatureText = document.getElementById('signatureText');
        const heartSignature = document.querySelector('.heart-signature');
        
        // Clear all content first
        messageLines.forEach(line => {
            line.innerHTML = '';
            line.style.opacity = '1';
        });
        signatureText.innerHTML = '';
        signatureText.style.opacity = '1';
        heartSignature.innerHTML = '';
        heartSignature.style.opacity = '1';
        
        // Original texts
        const originalTexts = [
            "I know I messed up, and I feel terrible",
            "about it. I can't stop thinking about how",
            "much I hurt you.",
            "I wish I could take it all back, but I can't.",
            "All I can do now is say sorry and hope",
            "you'll forgive me.",
            "You mean so much to me, and I don't want",
            "to hurt you. Please forgive me."
        ];
        
        // Type each line with delays
        let currentLine = 0;
        
        const typeNextLine = () => {
            if (currentLine < messageLines.length) {
                this.typeTextSimple(messageLines[currentLine], originalTexts[currentLine], () => {
                    currentLine++;
                    setTimeout(typeNextLine, 300);
                });
            } else {
                // Type signature
                this.typeTextSimple(signatureText, "I'm truly sorry,", () => {
                    setTimeout(() => {
                        heartSignature.innerHTML = '<span class="beating-heart">♥</span>';
                    }, 500);
                });
            }
        };
        
        typeNextLine();
    }

    typeTextSimple(element, text, callback) {
        const words = text.split(' ');
        let wordIndex = 0;
        
        const addNextWord = () => {
            if (wordIndex >= words.length) {
                if (callback) callback();
                return;
            }
            
            const word = words[wordIndex];
            const space = wordIndex > 0 ? ' ' : '';
            element.innerHTML += space + word;
            
            wordIndex++;
            setTimeout(addNextWord, 150 + Math.random() * 100);
        };
        
        addNextWord();
    }

    resetTypingEffect() {
        // Simply restore original content without hiding
        const messageLines = document.querySelectorAll('.message-line');
        const signatureText = document.getElementById('signatureText');
        const heartSignature = document.querySelector('.heart-signature');
        
        const originalTexts = [
            "I know I messed up, and I feel terrible",
            "about it. I can't stop thinking about how",
            "much I hurt you.",
            "I wish I could take it all back, but I can't.",
            "All I can do now is say sorry and hope",
            "you'll forgive me.",
            "You mean so much to me, and I don't want",
            "to hurt you. Please forgive me."
        ];
        
        messageLines.forEach((line, index) => {
            line.innerHTML = originalTexts[index] || '';
        });
        
        signatureText.innerHTML = "I'm truly sorry,";
        heartSignature.innerHTML = '<span class="beating-heart">♥</span>';
    }

    createGentleHeart() {
        const card = document.getElementById('mainCard');
        const rect = card.getBoundingClientRect();
        
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.position = 'fixed';
        heart.style.left = rect.left + Math.random() * rect.width + 'px';
        heart.style.top = rect.top + Math.random() * rect.height + 'px';
        heart.style.color = '#FFB6C1';
        heart.style.fontSize = '14px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'gentleFloat 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 3000);
    }

    createTemporarySparkles() {
        const card = document.getElementById('mainCard');
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle', 'temp-sparkle');
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.background = '#FFD700';
                sparkle.style.boxShadow = '0 0 8px #FFD700';
                sparkle.style.width = '6px';
                sparkle.style.height = '6px';
                card.appendChild(sparkle);
                
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 2500);
            }, i * 150);
        }
    }

    animateMessageLines() {
        const messageLines = document.querySelectorAll('.message-line');
        messageLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 150 + 800);
        });
    }

    showSpecialThankYou() {
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 220, 0.98));
                backdrop-filter: blur(20px);
                border: 3px solid rgba(255, 215, 0, 0.5);
                border-radius: 30px;
                padding: 30px;
                text-align: center;
                font-family: 'Dancing Script', cursive;
                font-size: 22px;
                font-weight: 700;
                color: #8B4513;
                box-shadow: 0 15px 50px rgba(0,0,0,0.2);
                z-index: 3000;
                animation: specialThankYou 4s ease-in-out forwards;
            ">
                <div style="font-size: 48px; margin-bottom: 10px;">🌟</div>
                <div>Thank you for your beautiful heart!</div>
                <div style="font-size: 18px; margin-top: 10px; color: #FF6B9D;">
                    You just made my day brighter! ✨
                </div>
            </div>
        `;
        
        document.body.appendChild(specialMessage);
        
        setTimeout(() => {
            if (specialMessage.parentNode) {
                specialMessage.parentNode.removeChild(specialMessage);
            }
        }, 4000);
    }

    startHeartRain() {
        let heartRainCount = 0;
        const maxHearts = 30;
        
        const heartRainInterval = setInterval(() => {
            if (heartRainCount >= maxHearts) {
                clearInterval(heartRainInterval);
                return;
            }
            
            this.createRainHeart();
            heartRainCount++;
        }, 200);
    }

    createRainHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '♥';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-20px';
        heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`;
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '2000';
        heart.style.animation = 'rainHeart 4s linear forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }
}

// Enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes heartExplosion {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0.3);
            opacity: 0;
        }
    }
    
    @keyframes gentleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(1.3);
        }
    }
    
    @keyframes specialThankYou {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
        }
        30% {
            transform: translate(-50%, -50%) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    @keyframes rainHeart {
        0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(enhancedStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeartfeltApology();
});

// Enhanced mouse movement effects
document.addEventListener('mousemove', (e) => {
    const hearts = document.querySelectorAll('.heart, .compliment');
    hearts.forEach(heart => {
        const rect = heart.getBoundingClientRect();
        const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
            Math.pow(e.clientY - (rect.top + rect.height/2), 2)
        );
        
        if (distance < 120) {
            heart.style.transform += ` scale(${1.3 - distance/150})`;
        }
    });
});

// Keyboard shortcuts for feel-good interactions
document.addEventListener('keydown', (e) => {
    const apology = window.apologyInstance;
    if (!apology) return;
    
    if (e.key === ' ') {
        e.preventDefault();
        apology.showVirtualHug();
    } else if (e.key === 'h' || e.key === 'H') {
        apology.showSweetMessage();
    } else if (e.key === 'f' || e.key === 'F') {
        document.getElementById('forgiveBtn').click();
    }
});

// Store instance globally for keyboard access
document.addEventListener('DOMContentLoaded', () => {
    window.apologyInstance = new HeartfeltApology();
});
