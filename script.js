document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('.card');
    const envelope = document.querySelector('.envelope');
    const fireworksContainer = document.querySelector('.fireworks-container');
    const stars = document.querySelector('.stars');

    // Função para criar estrelas cintilantes
    function createStars() {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            star.style.animationDelay = Math.random() * 3 + 's';
            stars.appendChild(star);
        }
    }

    // Função para criar fogos de artifício
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Posição aleatória
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Cor aleatória
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff9a9e', '#ff8585'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.backgroundColor = color;
        
        // Adiciona partículas ao fogos
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            firework.appendChild(particle);
        }
        
        fireworksContainer.appendChild(firework);
        
        // Remove o fogos após a animação
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }

    // Cria fogos de artifício periodicamente
    function startFireworks() {
        setInterval(() => {
            if (Math.random() > 0.5) { // 50% de chance de criar um fogos
                createFirework();
            }
        }, 300);
    }

    // Mostra a imagem de preview no fundo
    const previewImage = document.querySelector('.preview-image');
    previewImage.classList.add('show');
    
    // Atualiza a fonte da imagem
    const previewImg = previewImage.querySelector('img');
    previewImg.src = 'https://i.ibb.co/YXVp43T/preview.jpg';

    // Adiciona evento de clique ao envelope
    envelope.addEventListener('click', function(e) {
        e.stopPropagation();
        card.classList.add('opened');
        // Adiciona confetes quando a carta é aberta
        createConfetti();
        // Inicia os fogos de artifício
        startFireworks();
        // Adiciona música de fundo
        playBackgroundMusic();
    });

    // Adiciona evento de clique ao cartão inteiro como backup
    card.addEventListener('click', function() {
        if (!card.classList.contains('opened')) {
            card.classList.add('opened');
            createConfetti();
            startFireworks();
            playBackgroundMusic();
        }
    });

    // Adiciona efeito de clique nos balões
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            balloon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                balloon.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Adiciona efeito de soprar a vela
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    let candleBlown = false;

    candle.addEventListener('click', function() {
        if (!candleBlown) {
            candleBlown = true;
            
            // Cria efeito de vento
            createWindEffect();
            
            // Adiciona classe para apagar a vela
            flame.classList.add('blown-out');
            
            // Adiciona fumaça
            createSmoke();
            
            // Adiciona mais fogos de artifício
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createFirework();
                }, i * 200);
            }
            
            // Adiciona mais confetes
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createConfetti();
                }, i * 100);
            }
            
            // Toca som de sopro
            playBlowSound();
        }
    });

    // Função para criar efeito de vento
    function createWindEffect() {
        const windContainer = document.createElement('div');
        windContainer.className = 'wind-container';
        
        // Cria várias linhas de vento
        for (let i = 0; i < 15; i++) {
            const windLine = document.createElement('div');
            windLine.className = 'wind-line';
            windLine.style.top = `${Math.random() * 100}%`;
            windLine.style.left = `${Math.random() * 100}%`;
            windLine.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
            windLine.style.animationDelay = `${Math.random() * 0.3}s`;
            windContainer.appendChild(windLine);
        }
        
        document.body.appendChild(windContainer);
        
        // Remove o efeito de vento após a animação
        setTimeout(() => {
            windContainer.remove();
        }, 1000);
    }

    // Função para criar fumaça
    function createSmoke() {
        const smokeContainer = document.createElement('div');
        smokeContainer.className = 'smoke-container';
        
        // Cria várias partículas de fumaça
        for (let i = 0; i < 10; i++) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.left = `${Math.random() * 20 - 10}px`;
            smoke.style.animationDuration = `${Math.random() * 2 + 2}s`;
            smoke.style.animationDelay = `${Math.random() * 0.5}s`;
            smokeContainer.appendChild(smoke);
        }
        
        flame.appendChild(smokeContainer);
    }

    // Função para tocar som de sopro
    function playBlowSound() {
        const audio = new Audio('https://www.soundjay.com/human/sounds/blow-1.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Sound play prevented:', e));
    }

    // Função para tocar música de fundo
    function playBackgroundMusic() {
        const audio = new Audio('https://www.soundjay.com/misc/sounds/happy-birthday-song-01.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Autoplay prevented:', e));
    }

    // Inicializa as estrelas
    createStars();
});

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Cores aleatórias para os confetes
        const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff9a9e'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(confetti);
        
        // Remove o confete após a animação
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Adiciona estilos CSS dinâmicos para os confetes e partículas
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        width: 10px;
        height: 10px;
        animation: fall linear forwards, confettiSpin 3s linear infinite;
        z-index: 1000;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }

    @keyframes confettiSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .star {
        position: fixed;
        width: 2px;
        height: 2px;
        background-color: white;
        border-radius: 50%;
        animation: twinkle 2s infinite;
        z-index: 1;
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background-color: inherit;
        border-radius: 50%;
        animation: particleFall 1s linear forwards;
    }

    @keyframes particleFall {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(50px) scale(0); opacity: 0; }
    }

    /* Estilos para o efeito de vento */
    .wind-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    }

    .wind-line {
        position: absolute;
        width: 100px;
        height: 2px;
        background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
        animation: wind linear forwards;
    }

    @keyframes wind {
        0% { transform: translateX(0) scaleX(0.5); opacity: 0; }
        20% { transform: translateX(100px) scaleX(1); opacity: 0.8; }
        100% { transform: translateX(300px) scaleX(0.5); opacity: 0; }
    }

    /* Estilos para a fumaça */
    .smoke-container {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
    }

    .smoke {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: rgba(200, 200, 200, 0.8);
        border-radius: 50%;
        animation: smokeRise linear forwards;
    }

    @keyframes smokeRise {
        0% { transform: translateY(0) scale(1); opacity: 0.8; }
        100% { transform: translateY(-50px) scale(2); opacity: 0; }
    }

    /* Estilo para a vela apagada */
    .flame.blown-out {
        background: linear-gradient(to bottom, #888, #ccc);
        box-shadow: none;
        animation: none;
        height: 5px;
        border-radius: 50%;
    }
`;
document.head.appendChild(style); 