// Sistema da Galeria Cyberpunk
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const modal = document.getElementById('modal');
    const modalImagem = document.getElementById('modal-imagem');
    const closeBtn = document.querySelector('.close-btn');
    const itemsGaleria = document.querySelectorAll('.item-galeria');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const imageCounter = document.querySelector('.image-counter');
    
    let imagemAtual = 0;
    const totalImagens = itemsGaleria.length;

    // Abrir modal com imagem
    function abrirModal(index) {
        imagemAtual = index;
        const imagemSrc = itemsGaleria[index].querySelector('img').src;
        modalImagem.src = imagemSrc;
        atualizarContador();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Efeito visual de entrada
        modal.style.animation = 'fadeIn 0.3s ease';
    }

    // Fechar modal
    function fecharModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 250);
    }

    // Navegar para imagem anterior
    function imagemAnterior() {
        imagemAtual = (imagemAtual - 1 + totalImagens) % totalImagens;
        const imagemSrc = itemsGaleria[imagemAtual].querySelector('img').src;
        modalImagem.src = imagemSrc;
        atualizarContador();
        
        // Efeito de transição
        aplicarEfeitoTransicao();
    }

    // Navegar para próxima imagem
    function imagemProxima() {
        imagemAtual = (imagemAtual + 1) % totalImagens;
        const imagemSrc = itemsGaleria[imagemAtual].querySelector('img').src;
        modalImagem.src = imagemSrc;
        atualizarContador();
        
        // Efeito de transição
        aplicarEfeitoTransicao();
    }

    // Atualizar contador de imagens
    function atualizarContador() {
        imageCounter.textContent = `${imagemAtual + 1} / ${totalImagens}`;
    }

    // Efeito de transição glitch
    function aplicarEfeitoTransicao() {
        modalImagem.style.animation = 'glitch-1 0.3s ease';
        setTimeout(() => {
            modalImagem.style.animation = '';
        }, 300);
    }

    // Event Listeners para itens da galeria
    itemsGaleria.forEach((item, index) => {
        item.addEventListener('click', () => {
            abrirModal(index);
        });
        
        // Efeitos de hover cyberpunk
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Event Listeners do modal
    closeBtn.addEventListener('click', fecharModal);
    prevBtn.addEventListener('click', imagemAnterior);
    nextBtn.addEventListener('click', imagemProxima);

    // Fechar modal clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    fecharModal();
                    break;
                case 'ArrowLeft':
                    imagemAnterior();
                    break;
                case 'ArrowRight':
                    imagemProxima();
                    break;
            }
        }
    });

    // Efeitos cyberpunk adicionais
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

    // Inicializar efeitos
    addScanline();

    console.log('🖼️ Galeria cyberpunk carregada! Imagens disponíveis:', totalImagens);
});

// CSS adicional para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .modal-imagem-transicao {
        animation: glitch-1 0.3s ease;
    }
`;
document.head.appendChild(style);