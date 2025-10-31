// Efeitos interativos para a página de créditos
document.addEventListener('DOMContentLoaded', function() {
    // === FUNÇÃO UNIVERSAL DE SOM ===
    function playClickSound() {
        try {
            const clickSound = document.getElementById('click-sound');
            if (clickSound && clickSound.src) {
                clickSound.currentTime = 0;
                clickSound.play().catch(e => console.log('Audio não pode ser reproduzido:', e));
            } else {
                criarSomClickFallback();
            }
        } catch (error) {
            console.log('Erro no áudio:', error);
            criarSomClickFallback();
        }
    }

    function criarSomClickFallback() {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.3, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
            
            oscillator.start(context.currentTime);
            oscillator.stop(context.currentTime + 0.1);
        } catch (e) {
            console.log('Áudio não suportado no navegador');
        }
    }

    // Aplicar som nos links de navegação
    document.querySelectorAll('.pasta-icon a').forEach(link => {
        link.addEventListener('click', playClickSound);
    });

   

    // Efeito de glitch nos títulos
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

    // Efeito de scanline
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
            animation: scanline 3s linear infinite;
            pointer-events: none;
            z-index: 100;
        `;
        container.style.position = 'relative';
        container.appendChild(scanline);
    }

    // Efeito especial nos membros da equipe
    const membros = document.querySelectorAll('.membro');
    
    membros.forEach(membro => {
        membro.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.boxShadow = '0 0 20px var(--neon-green)';
        });
        
        membro.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Inicializar efeitos
    addScanline();

    console.log('🎮 Página de créditos carregada! Desenvolvido com 💚 pela equipe Kanshi no Me.');
});

// CSS adicional para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(style);