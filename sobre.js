// Efeitos interativos para a página sobre
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

    // Controle de vídeo com efeito glitch
    const video = document.querySelector('.video-cidade');
    if (video) {
        video.addEventListener('play', function() {
            const borda = this.closest('.borda-trailer').querySelector('img');
            borda.style.animation = 'glitch-1 0.5s infinite linear alternate-reverse';
        });
        
        video.addEventListener('pause', function() {
            const borda = this.closest('.borda-trailer').querySelector('img');
            borda.style.animation = 'none';
        });
    }

    // Efeito de digitação para textos longos (opcional)
    const longTexts = document.querySelectorAll('.historia p, .sinopse p');
    
    longTexts.forEach(text => {
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

    console.log('🎮 Efeitos cyberpunk carregados! Bem-vindo ao mundo de Kanshi no Me.');
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
    
    .video-glitch {
        filter: contrast(1.5) brightness(1.2) saturate(1.5);
    }
`;
document.head.appendChild(style);