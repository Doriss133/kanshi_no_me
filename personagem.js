// Dados dos personagens
const personagens = [
    {
        id: 0,
        nome: "SORA",
        elementoId: "personagem-sora",
        descricao: "Sora é um adolescente híbrido — meio humano, meio ciborgue — vivendo em uma cidade controlada pela IA central ECHO. Desde pequeno ele carrega implantes que o conectam à rede, o que permite que a IA tente se comunicar diretamente com ele, como se quisesse arrastá-lo para dentro do próprio sistema. Para suportar esse peso, ele anda sempre com fones de ouvido, abafando a voz em sua mente e tentando preservar o que ainda é 'seu'.",
        atributos: {
            natureza: "Híbrido Humano-Ciborgue",
            conexao: "Ligado à IA ECHO", 
            defesa: "Fones de Ouvido",
            missao: "Desligar os Terminais"
        }
    },
    {
        id: 1,
        nome: "DAIZEN",
        elementoId: "personagem-daizen",
        descricao: "Antigo colega do pai de Sora, abandonou o projeto antes que tudo saísse do controle. Carrega arrependimento e observa Sora de longe, temendo que o passado esteja prestes a se repetir.",
        atributos: {
            natureza: "Ex-Cientista do Projeto",
            conexao: "Conhece a Verdade", 
            defesa: "Experiência e Cautela",
            missao: "Observar e Proteger"
        }
    },
    {
        id: 2, 
        nome: "KAITO",
        elementoId: "personagem-kaito",
        descricao: "Antigo amigo de Sora antes do caos. Agora faz parte de pequenos grupos insurgentes. Se afastou por motivos que Sora nunca entendeu, mas nunca deixou de acompanhar seus passos.",
        atributos: {
            natureza: "Insurgente Tecnológico",
            conexao: "Amigo do Passado", 
            defesa: "Táticas de Guerrilha",
            missao: "Lutar contra o Sistema"
        }
    },
    {
        id: 3,
        nome: "AIRI",
        elementoId: "personagem-airi", 
        descricao: "Trabalhou e morou perto de Sora quando ele era criança. Notou mudanças estranhas no comportamento do pai dele e saiu antes que piorasse. Hoje cuida dele à distância, sem revelar que sabe mais do que demonstra.",
        atributos: {
            natureza: "Protetora Silenciosa",
            conexao: "Vizinha do Passado", 
            defesa: "Discrição e Observação",
            missao: "Proteger Sora às Escondidas"
        }
    },
    {
        id: 4,
        nome: "KAEL",
        elementoId: "personagem-kael",
        descricao: "Homem simples que trabalha no posto no centro da cidade. Não conhece a verdade, mas enxerga em Sora algo quebrado e solitário. Representa o último traço de 'vida normal' no cotidiano dele.",
        atributos: {
            natureza: "Trabalhador Comum", 
            conexao: "Conexão Humana",
            defesa: "Simplicidade e Honestidade",
            missao: "Oferecer Refúgio Humano"
        }
    }
];

// Elementos DOM
const personagemNome = document.getElementById('personagem-nome');
const personagemDescricao = document.getElementById('personagem-descricao');
const atributoNatureza = document.getElementById('atributo-natureza');
const atributoConexao = document.getElementById('atributo-conexao');
const atributoDefesa = document.getElementById('atributo-defesa');
const atributoMissao = document.getElementById('atributo-missao');

const botoesPersonagens = document.querySelectorAll('.btn-personagem');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

let personagemAtual = 0;

// Função para atualizar o personagem em destaque
function atualizarPersonagemDestaque(index) {
    const personagem = personagens[index];
    
    // Esconder todas as imagens primeiro
    document.querySelectorAll('.personagem-gif').forEach(img => {
        img.style.display = 'none';
    });
    
    // Mostrar apenas a imagem do personagem atual
    const imagemAtual = document.getElementById(personagem.elementoId);
    imagemAtual.style.display = 'block';
    
    // Atualizar textos
    personagemNome.textContent = personagem.nome;
    personagemDescricao.textContent = personagem.descricao;
    
    // Atualizar atributos
    atributoNatureza.textContent = personagem.atributos.natureza;
    atributoConexao.textContent = personagem.atributos.conexao;
    atributoDefesa.textContent = personagem.atributos.defesa;
    atributoMissao.textContent = personagem.atributos.missao;
    
    // Atualizar botões ativos
    botoesPersonagens.forEach((btn, i) => {
        btn.classList.toggle('ativo', i === index);
    });
    
    // Atualizar controles de navegação
    btnAnterior.disabled = index === 0;
    btnProximo.disabled = index === personagens.length - 1;
    
    // Efeito visual de transição
    aplicarEfeitoTransicao();
}

// Efeito de transição glitch
function aplicarEfeitoTransicao() {
    const elementos = document.querySelectorAll('.personagem-gif, #personagem-nome, #personagem-descricao');
    
    elementos.forEach(elemento => {
        elemento.style.animation = 'glitch-1 0.3s ease';
        setTimeout(() => {
            elemento.style.animation = '';
        }, 300);
    });
}

// Event Listeners para botões dos personagens
botoesPersonagens.forEach((botao, index) => {
    botao.addEventListener('click', () => {
        personagemAtual = index;
        atualizarPersonagemDestaque(personagemAtual);
    });
});

// Event Listeners para navegação
btnAnterior.addEventListener('click', () => {
    if (personagemAtual > 0) {
        personagemAtual--;
        atualizarPersonagemDestaque(personagemAtual);
    }
});

btnProximo.addEventListener('click', () => {
    if (personagemAtual < personagens.length - 1) {
        personagemAtual++;
        atualizarPersonagemDestaque(personagemAtual);
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        btnAnterior.click();
    } else if (e.key === 'ArrowRight') {
        btnProximo.click();
    }
});

// Efeitos cyberpunk adicionais
document.addEventListener('DOMContentLoaded', function() {
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

    // Efeitos de hover nas imagens
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px var(--neon-cyan)) brightness(1.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 10px var(--neon-cyan))';
        });
    });

    // Inicializar efeitos
    addScanline();
    atualizarPersonagemDestaque(personagemAtual);

    console.log('🎮 Catálogo de personagens carregado! Personagens disponíveis:', personagens.length);
});

// CSS adicional para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes scanline {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    .personagem-transicao {
        animation: glitch-1 0.3s ease;
    }
`;
document.head.appendChild(style);

document.head.appendChild(style);

