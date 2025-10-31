// Sistema da Página Inicial GLITCH
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const typingText = document.getElementById('typing-text');
    const btnIniciar = document.getElementById('btn-iniciar');
    const btnAudio = document.getElementById('btn-audio');
    const bgMusic = document.getElementById('bg-music');
    const clickSound = document.getElementById('click-sound');
    const glitchSound = document.getElementById('glitch-sound');
    
    // Textos para digitação
    const textos = [
        "Sistemas em colapso.",
        "Escolha: sobreviver ou ser apagado.",
        "Inicie o protocolo KANSHI...",
        "A IA está observando.",
        "Prepare-se para a desconexão."
    ];
    
    let textoIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    // Configuração de áudio
    let isMusicPlaying = false;
    
    // Funções de áudio
    function playClickSound() {
        try {
            if (clickSound && clickSound.src) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Audio click não pode ser reproduzido:', e));
            }
        } catch (error) {
            console.log('Erro no áudio click:', error);
        }
    }
    
    function playGlitchSound() {
        try {
            if (glitchSound && glitchSound.src) {
                glitchSound.currentTime = 0;
                glitchSound.play().catch(e => console.log('Audio glitch não pode ser reproduzido:', e));
            }
        } catch (error) {
            console.log('Erro no áudio glitch:', error);
        }
    }
    
    function toggleMusic() {
        try {
            if (!isMusicPlaying) {
                bgMusic.volume = 0.3;
                bgMusic.play().then(() => {
                    isMusicPlaying = true;
                    btnAudio.querySelector('.audio-icon').textContent = '🔊';
                    document.querySelector('.audio-tooltip').textContent = 'Música: ON';
                }).catch(e => {
                    console.log('Música não pode ser reproduzida:', e);
                    // Fallback: criar áudio sintético
                    criarAudioSintetico();
                });
            } else {
                bgMusic.pause();
                isMusicPlaying = false;
                btnAudio.querySelector('.audio-icon').textContent = '🔇';
                document.querySelector('.audio-tooltip').textContent = 'Música: OFF';
            }
        } catch (error) {
            console.log('Erro no controle de música:', error);
        }
    }
    
    // Fallback para áudio sintético
    function criarAudioSintetico() {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            const filter = context.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(110, context.currentTime);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, context.currentTime);
            
            gainNode.gain.setValueAtTime(0.1, context.currentTime);
            
            oscillator.start(context.currentTime);
            isMusicPlaying = true;
            
            // Parar após 30 segundos (apenas demonstração)
            setTimeout(() => {
                oscillator.stop();
                isMusicPlaying = false;
                btnAudio.querySelector('.audio-icon').textContent = '🔇';
                document.querySelector('.audio-tooltip').textContent = 'Música: OFF';
            }, 30000);
            
        } catch (e) {
            console.log('Áudio sintético não suportado');
        }
    }
    
    // Efeito de digitação
    function typeEffect() {
        if (isPaused) return;
        
        const currentText = textos[textoIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typingText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            
            // Efeito glitch aleatório
            if (Math.random() < 0.02) {
                playGlitchSound();
                typingText.style.animation = 'glitch-1 0.1s';
                setTimeout(() => {
                    typingText.style.animation = '';
                }, 100);
            }
            
            setTimeout(typeEffect, Math.random() * 50 + 50);
            
        } else if (isDeleting && charIndex >= 0) {
            typingText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(typeEffect, 30);
            
        } else {
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textoIndex = (textoIndex + 1) % textos.length;
            }
            
            setTimeout(typeEffect, 1500);
        }
    }
    
    // Efeitos glitch aleatórios na página
    function randomGlitchEffect() {
        const elements = document.querySelectorAll('.glitch-text-main, .terminal-box, .btn-iniciar');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        playGlitchSound();
        
        randomElement.style.animation = 'none';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 10);
        
        // Efeito de distorção visual
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 100);
        
        // Agendar próximo glitch
        setTimeout(randomGlitchEffect, Math.random() * 5000 + 2000);
    }
    
    // Event Listeners
    btnIniciar.addEventListener('click', function() {
        playClickSound();
        playGlitchSound();
        
        // Efeito visual intenso
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'btnGlitch 0.5s';
        }, 10);
        
        document.body.style.filter = 'brightness(2) hue-rotate(180deg)';
        
        setTimeout(() => {
            document.body.style.filter = 'none';
            // Redirecionar para a página sobre
            window.location.href = 'sobre.html';
        }, 500);
    });
    
    btnAudio.addEventListener('click', function() {
        playClickSound();
        toggleMusic();
    });
    
    // Efeitos de hover glitch
    btnIniciar.addEventListener('mouseenter', function() {
        playGlitchSound();
    });
    
    // Efeitos nas pastas de navegação
    document.querySelectorAll('.pasta-icon a').forEach(link => {
        link.addEventListener('click', playClickSound);
    });
    
    // Inicialização
    function init() {
        // Iniciar efeito de digitação
        setTimeout(() => {
            typeEffect();
        }, 2000);
        
        // Iniciar glitches aleatórios
        setTimeout(() => {
            randomGlitchEffect();
        }, 5000);
        
        // Tentar iniciar música automaticamente (com interação do usuário)
        document.body.addEventListener('click', function initMusic() {
            if (!isMusicPlaying) {
                setTimeout(toggleMusic, 1000);
            }
            document.body.removeEventListener('click', initMusic);
        });
        
        // Efeitos cyberpunk adicionais
        const glitchTexts = document.querySelectorAll('.glitch-text-main');
        
        glitchTexts.forEach(text => {
            text.addEventListener('mouseenter', function() {
                this.style.animation = 'glitchMain 0.5s infinite';
            });
            
            text.addEventListener('mouseleave', function() {
                this.style.animation = 'glitchMain 3s infinite';
            });
        });
        
        console.log('🎮 Sistema KANSHI NO ME inicializado! Glitches ativos.');
    }
    
    // Iniciar
    init();
});

// CSS adicional para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes glitch-1 {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
    
    @keyframes glitch-2 {
        0% { transform: translate(0); }
        20% { transform: translate(2px, -2px); }
        40% { transform: translate(2px, 2px); }
        60% { transform: translate(-2px, -2px); }
        80% { transform: translate(-2px, 2px); }
        100% { transform: translate(0); }
    }

    @keyframes glitchMain {
        0%, 100% { 
            transform: translate(0);
            text-shadow: 
                0.05em 0 0 var(--neon-red),
                -0.05em -0.025em 0 var(--neon-cyan),
                -0.025em 0.05em 0 var(--neon-purple);
        }
        14% { 
            transform: translate(-0.025em, 0.025em);
            text-shadow: 
                -0.05em -0.025em 0 var(--neon-red),
                0.025em 0.025em 0 var(--neon-cyan),
                -0.05em -0.05em 0 var(--neon-purple);
        }
        15% { 
            transform: translate(-0.025em, 0.025em);
            text-shadow: 
                -0.05em -0.025em 0 var(--neon-red),
                0.025em 0.025em 0 var(--neon-cyan),
                -0.05em -0.05em 0 var(--neon-purple);
        }
        49% { 
            transform: translate(-0.025em, 0.025em);
            text-shadow: 
                -0.05em -0.025em 0 var(--neon-red),
                0.025em 0.025em 0 var(--neon-cyan),
                -0.05em -0.05em 0 var(--neon-purple);
        }
        50% { 
            transform: translate(0.025em, -0.025em);
            text-shadow: 
                0.025em 0.05em 0 var(--neon-red),
                0.05em 0 0 var(--neon-cyan),
                0 -0.05em 0 var(--neon-purple);
        }
        99% { 
            transform: translate(0.025em, -0.025em);
            text-shadow: 
                0.025em 0.05em 0 var(--neon-red),
                0.05em 0 0 var(--neon-cyan),
                0 -0.05em 0 var(--neon-purple);
        }
    }

    @keyframes btnGlitch {
        0%, 100% { transform: scale(1); }
        95% { transform: scale(1); }
        96% { transform: scale(1.02) translateX(-2px); }
        97% { transform: scale(1.02) translateX(2px); }
        98% { transform: scale(1.02) translateX(-2px); }
        99% { transform: scale(1.02) translateX(2px); }
    }

    @keyframes terminalGlitch {
        0%, 100% { transform: translateX(0); }
        95% { transform: translateX(0); }
        96% { transform: translateX(-5px); }
        97% { transform: translateX(5px); }
        98% { transform: translateX(-5px); }
        99% { transform: translateX(5px); }
    }

    @keyframes glitchBars {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    @keyframes scanMove {
        0% { background-position: 0 0; }
        100% { background-position: 0 4px; }
    }

    @keyframes glitchOverlay {
        0% { transform: translate(0); }
        20% { transform: translate(-5px, 5px); }
        40% { transform: translate(-5px, -5px); }
        60% { transform: translate(5px, 5px); }
        80% { transform: translate(5px, -5px); }
        100% { transform: translate(0); }
    }

    @keyframes particlesFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-100px); }
    }

    @keyframes glitchScan {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);