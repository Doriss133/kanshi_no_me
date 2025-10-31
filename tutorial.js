// Efeitos interativos para a página tutorial
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação para títulos glitch
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch-1 0.3s infinite linear alternate-reverse';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Efeito de parallax para o fundo
    const cyberpunkBg = document.querySelector('.cyberpunk-bg');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        cyberpunkBg.style.transform = `translateY(${rate}px)`;
    });

    // Efeito de scanline no container principal
    const container = document.querySelector('.container');
    
    function addScanline() {
        const scanline = document.createElement('div');
        scanline.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
            animation: scanline 2s linear infinite;
            pointer-events: none;
            z-index: 100;
        `;
        container.style.position = 'relative';
        container.appendChild(scanline);
    }

    // Efeito de glitch aleatório nas imagens
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 10px var(--neon-cyan)) brightness(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 5px var(--neon-blue))';
        });
    });

    // Efeito de pulso para caixas neon
    const neonBoxes = document.querySelectorAll('.neon-box');
    
    neonBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        box.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Efeito de digitação para textos
    const tutorialTexts = document.querySelectorAll('.funcao-tecla p, .objetivo-npc p, .barra-corrupcao p');
    
    tutorialTexts.forEach(text => {
        text.style.opacity = '0.9';
        text.style.transition = 'opacity 0.3s ease';
        
        text.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.textShadow = '0 0 10px currentColor';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.opacity = '0.9';
            this.style.textShadow = 'none';
        });
    });

    // Inicializar efeitos
    addScanline();

    console.log('🎮 Tutorial carregado! Prepare-se para dominar Kanshi no Me.');
});

// CSS adicional para animações via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);


/*ISSO É UM TESTE DE SOM!*/
    const btnAudio = document.getElementById('btn-audio');
    const bgMusic = document.getElementById('bg-music');

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

      // Tentar iniciar música automaticamente (com interação do usuário)
        document.body.addEventListener('click', function initMusic() {
            if (!isMusicPlaying) {
                setTimeout(toggleMusic, 1000);
            }
            document.body.removeEventListener('click', initMusic);
        });
        