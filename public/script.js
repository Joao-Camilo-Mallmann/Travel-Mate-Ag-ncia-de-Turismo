// --- CONFIGURAÇÃO DA API ---
const API_BASE_URL = '/api/v1';
// Número de WhatsApp para contato (somente dígitos, com DDI/DDD se desejar abrir direto no app)
const WHATSAPP_NUMBER = '5599999999999'; // ajuste aqui para o número correto

// --- VARIÁVEIS GLOBAIS PARA ARMAZENAR OS DADOS ---
let destinations = [];
let packages = [];

// --- FUNÇÕES PARA CONSUMIR A API ---
async function fetchDestinations() {
    try {
        const response = await fetch(`${API_BASE_URL}/destinos`);
        const data = await response.json();
        
        if (data.success) {
            destinations = data.data;
            console.log('Destinos carregados:', destinations);
            return destinations;
        } else {
            console.error('Erro ao carregar destinos:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Erro de rede ao carregar destinos:', error);
        return [];
    }
}

async function fetchPackages() {
    try {
        const response = await fetch(`${API_BASE_URL}/pacotes`);
        const data = await response.json();
        
        if (data.success) {
            packages = data.data;
            console.log('Pacotes carregados:', packages);
            return packages;
        } else {
            console.error('Erro ao carregar pacotes:', data.message);
            return [];
        }
    } catch (error) {
        console.error('Erro de rede ao carregar pacotes:', error);
        return [];
    }
}

async function fetchDestinationById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/destinos/${id}`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        } else {
            console.error('Erro ao carregar destino:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Erro de rede ao carregar destino:', error);
        return null;
    }
}

// --- FUNÇÕES DE RENDERIZAÇÃO ---
async function renderDestinations() {
    const container = document.getElementById('popular-destinations-container');
    if (!container) return;
    
    // Mostrar skeleton loading mais bonito
    container.innerHTML = `
        ${Array(3).fill(0).map(() => `
            <article class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div class="skeleton h-64 w-full"></div>
                <div class="p-6 space-y-4">
                    <div class="skeleton h-6 w-3/4"></div>
                    <div class="skeleton h-4 w-1/2"></div>
                    <div class="skeleton h-16 w-full"></div>
                    <div class="flex gap-2">
                        <div class="skeleton h-6 w-16"></div>
                        <div class="skeleton h-6 w-20"></div>
                        <div class="skeleton h-6 w-18"></div>
                    </div>
                    <div class="skeleton h-10 w-full"></div>
                </div>
            </article>
        `).join('')}
    `;
    
    // Buscar dados da API
    const destinationData = await fetchDestinations();
    
    if (destinationData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="max-w-md mx-auto">
                    <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-16-4c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252"/>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Ops! Erro ao carregar destinos</h3>
                    <p class="text-gray-600 mb-4">Não conseguimos carregar os destinos no momento.</p>
                    <button onclick="renderDestinations()" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Tentar novamente
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    let content = '';
    destinationData.forEach((dest, index) => {
        const tagsHtml = dest.tags.map(tag => `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-3 py-1 rounded-full">${tag}</span>`).join('');
        content += `
        <article class="bg-white rounded-xl shadow-sm overflow-hidden card-hover group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                 onclick="showDestinationModal(${dest.id})"
                 onkeydown="if(event.key==='Enter'||event.key===' ') showDestinationModal(${dest.id})"
                 tabindex="0"
                 role="button"
                 aria-label="Ver detalhes de ${dest.name}">
            <div class="relative h-64 overflow-hidden">
                <img src="${dest.image}" 
                     alt="Imagem de ${dest.name}" 
                     class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                     loading="${index > 2 ? 'lazy' : 'eager'}">
                <div class="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 rating-star" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span class="text-sm font-medium text-gray-800">${dest.rating}</span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">${dest.name}</h3>
                <p class="text-sm text-gray-500 flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2 text-gray-400" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${dest.location}
                </p>
                <p class="text-gray-600 mb-4 leading-relaxed line-clamp-3">${dest.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">${tagsHtml}</div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Clique para explorar</span>
                    <svg class="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
        </article>`;
    });
    container.innerHTML = content;
}

async function renderPackages() {
    const container = document.getElementById('package-list-container');
    if (!container) return;

    // Mostrar skeleton loading mais bonito
    container.innerHTML = `
        ${Array(3).fill(0).map(() => `
            <article class="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div class="skeleton h-48 w-full"></div>
                <div class="p-6 space-y-4">
                    <div class="skeleton h-6 w-3/4"></div>
                    <div class="space-y-2">
                        <div class="skeleton h-4 w-full"></div>
                        <div class="skeleton h-4 w-full"></div>
                        <div class="skeleton h-4 w-2/3"></div>
                    </div>
                    <div class="flex gap-2">
                        <div class="skeleton h-6 w-16"></div>
                        <div class="skeleton h-6 w-20"></div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="skeleton h-8 w-24"></div>
                        <div class="skeleton h-10 w-20"></div>
                    </div>
                </div>
            </article>
        `).join('')}
    `;
    
    // Buscar dados da API
    const packageData = await fetchPackages();
    
    if (packageData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16">
                <div class="max-w-md mx-auto">
                    <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8-4-8 4m16 0v18l-8 4-8-4V7m16 0L12 11m0 0L4 7m8 4v13m0-13L20 7"/>
                    </svg>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Ops! Erro ao carregar pacotes</h3>
                    <p class="text-gray-600 mb-4">Não conseguimos carregar os pacotes no momento.</p>
                    <button onclick="renderPackages()" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Tentar novamente
                    </button>
                </div>
            </div>
        `;
        return;
    }

    let content = '';
    packageData.forEach((pkg, index) => {
        const includesHtml = pkg.includes.map(item => `<span class="inline-block bg-gray-100 text-gray-600 text-xs font-medium mr-2 px-3 py-1 rounded-md">${item}</span>`).join('');
        const highlightClass = pkg.highlight ? 'ring-2 ring-blue-500 ring-offset-2' : '';
        content += `
        <article class="bg-white rounded-xl shadow-sm overflow-hidden card-hover ${highlightClass} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" tabindex="0">
            <div class="relative h-48">
                <img src="${pkg.image}" 
                     alt="Imagem do pacote ${pkg.title}" 
                     class="w-full h-full object-cover"
                     loading="${index > 2 ? 'lazy' : 'eager'}">
                ${pkg.highlight ? '<div class="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">Mais Popular</div>' : ''}
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-4 text-gray-900">${pkg.title}</h3>
                <div class="space-y-3 mb-4 text-gray-600 text-sm">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-3 text-blue-500" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span><strong>Duração:</strong> ${pkg.duration}</span>
                    </div>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-3 text-green-500" aria-hidden="true">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span><strong>Pessoas:</strong> ${pkg.people}</span>
                    </div>
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-3 text-purple-500" aria-hidden="true">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                        </svg>
                        <span><strong>Disponível:</strong> ${pkg.date}</span>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 mb-6" aria-label="Itens inclusos no pacote">
                    ${includesHtml}
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-500">A partir de</p>
                    <p class="text-3xl font-bold text-blue-600">R$ ${pkg.price.toLocaleString('pt-BR')}</p>
                </div>
            </div>
        </article>`;
    });
    container.innerHTML = content;
}
  
// --- CONTROLE DAS ABAS ---
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;

        // Atualiza botões
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('text-gray-600');
        });
        button.classList.add('active');
        button.classList.remove('text-gray-600');
        
        // Atualiza conteúdo
        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// --- INICIALIZAÇÃO ---
// Chama as funções para renderizar o conteúdo inicial da página
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Página carregada, iniciando carregamento de dados...');
    
    // Carregar dados iniciais
    await renderDestinations();
    await renderPackages();
    
    // Configurar event listener para o formulário de pacote personalizado
    const customPackageForm = document.querySelector('#custom-package-form form');
    if (customPackageForm) {
        customPackageForm.addEventListener('submit', handleCustomPackageSubmit);
    }
    
    console.log('Dados carregados com sucesso!');
});

// --- FUNÇÃO PARA MOSTRAR MODAL DO DESTINO ---
async function showDestinationModal(destId) {
    const modal = document.getElementById('destination-modal');
    const modalContent = document.getElementById('modal-content');
    
    if (!modal || !modalContent) {
        console.error('Modal não encontrado');
        return;
    }
    
    // Mostrar loading no modal
    modalContent.innerHTML = '<div class="text-center py-8">Carregando...</div>';
    modal.classList.remove('hidden');
    
    // Buscar dados específicos do destino
    const dest = await fetchDestinationById(destId);
    
    if (!dest) {
        modalContent.innerHTML = '<div class="text-center py-8 text-red-500">Erro ao carregar destino.</div>';
        return;
    }

    const tagsHtml = dest.tags.map(tag =>
        `<span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">${tag}</span>`
    ).join('');

    modalContent.innerHTML = `
        <img src="${dest.image}" alt="${dest.name}" class="w-full h-64 object-cover rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-2">${dest.name}</h2>
        <p class="text-sm text-gray-500 mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            ${dest.location}
        </p>
        <p class="mb-4 text-gray-700">${dest.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">${tagsHtml}</div>
        <p class="text-yellow-500 font-semibold">Avaliação: ${dest.rating} ★</p>
    `;
}

// Event listeners para o modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('destination-modal');
    const closeModal = document.getElementById('close-modal');

    // Fecha o modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Fecha modal clicando fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

// --- FUNÇÃO PARA PROCESSAR PACOTE PERSONALIZADO ---
function handleCustomPackageSubmit(event) {
    event.preventDefault();
    
    // Obter valores do formulário
    const destino = document.getElementById('dest-select').value;
    const data = document.getElementById('date-input').value;
    const duracao = document.getElementById('duration-select').value;
    const pessoas = document.getElementById('people-select').value;
    const acomodacao = document.querySelector('input[name="accommodation"]:checked')?.value;
    const orcamento = document.getElementById('budget-select').value;
    
    // Validar se todos os campos obrigatórios foram preenchidos
    if (!destino || destino === 'Selecione o destino' || 
        !data || 
        !duracao || duracao === 'Selecione a duração' || 
        !pessoas || pessoas === 'Número de pessoas' || 
        !acomodacao || 
        !orcamento || orcamento === 'Selecione o orçamento') {
        
        showCustomPackageAlert('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }
    
    // Simular processamento
    showCustomPackageAlert('Processando sua solicitação...', 'loading');
    
    // Simular delay de processamento
    setTimeout(() => {
        // Mostrar mensagem de sucesso
        showCustomPackageAlert(`
            <div class="text-center">
                <div class="mb-4">
                    <svg class="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Proposta Criada com Sucesso!</h3>
                <p class="text-gray-600 mb-4">Seu pacote personalizado foi criado. Nossa equipe entrará em contato em breve!</p>
                <div class="bg-gray-50 p-4 rounded-lg text-left">
                    <h4 class="font-semibold mb-2">Resumo do Pacote:</h4>
                    <ul class="text-sm text-gray-600 space-y-1">
                        <li><strong>Destino:</strong> ${getDestinationName(destino)}</li>
                        <li><strong>Data:</strong> ${formatDate(data)}</li>
                        <li><strong>Duração:</strong> ${duracao} dias</li>
                        <li><strong>Pessoas:</strong> ${pessoas}</li>
                        <li><strong>Acomodação:</strong> ${capitalizeFirst(acomodacao)}</li>
                        <li><strong>Orçamento:</strong> ${getOrcamentoText(orcamento)}</li>
                    </ul>
                </div>
            </div>
        `, 'success');
        
        // Limpar formulário após 5 segundos
        setTimeout(() => {
            document.querySelector('#custom-package-form form').reset();
            hideCustomPackageAlert();
        }, 5000);
        
    }, 2000);
}

// --- VALIDAÇÃO DO FORMULÁRIO PERSONALIZADO ---
function validateCustomPackageForm() {
    const form = document.getElementById('custom-package-form');
    const formData = new FormData(form);
    const errors = {};
    
    // Validações
    const destination = formData.get('destination');
    const startDate = formData.get('start-date');
    const endDate = formData.get('end-date');
    const people = formData.get('people');
    const budget = formData.get('budget');
    const phone = formData.get('phone');
    
    if (!destination || destination.trim().length < 3) {
        errors.destination = 'Destino deve ter pelo menos 3 caracteres';
    }
    
    if (!startDate) {
        errors.startDate = 'Data de início é obrigatória';
    } else {
        const start = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (start < today) {
            errors.startDate = 'Data de início deve ser hoje ou futura';
        }
    }
    
    if (!endDate) {
        errors.endDate = 'Data de fim é obrigatória';
    } else if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end <= start) {
            errors.endDate = 'Data de fim deve ser posterior à data de início';
        }
    }
    
    if (!people || people < 1 || people > 20) {
        errors.people = 'Número de pessoas deve ser entre 1 e 20';
    }
    
    if (!budget || budget < 100) {
        errors.budget = 'Orçamento mínimo é R$ 100';
    }
    
    // Validação simples de telefone/WhatsApp (somente números, 10 a 13 dígitos)
    if (!phone || !/^[0-9]{10,13}$/.test(String(phone).replace(/\D/g, ''))) {
        errors.phone = 'Informe um WhatsApp válido com DDD (somente números)';
    }
    
    // Aplicar feedback visual
    Object.keys(errors).forEach(field => {
        const input = form.querySelector(`[name="${field === 'startDate' ? 'start-date' : field === 'endDate' ? 'end-date' : field}"]`);
        const errorElement = form.querySelector(`#${field}-error`);
        
        if (input) {
            input.classList.add('border-red-500', 'focus:ring-red-500');
            input.classList.remove('border-gray-300', 'focus:ring-blue-500');
            input.setAttribute('aria-invalid', 'true');
        }
        
        if (errorElement) {
            errorElement.textContent = errors[field];
            errorElement.classList.remove('hidden');
        }
    });
    
    // Limpar erros dos campos válidos
    const allFields = ['destination', 'start-date', 'end-date', 'people', 'budget', 'phone'];
    allFields.forEach(field => {
        const fieldKey = field.replace('-', '');
        if (!errors[fieldKey] && !errors[field]) {
            const input = form.querySelector(`[name="${field}"]`);
            const errorElement = form.querySelector(`#${fieldKey}-error`);
            
            if (input) {
                input.classList.remove('border-red-500', 'focus:ring-red-500');
                input.classList.add('border-gray-300', 'focus:ring-blue-500');
                input.setAttribute('aria-invalid', 'false');
            }
            
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        }
    });
    
    return Object.keys(errors).length === 0;
}

// --- SUBMISSÃO DO FORMULÁRIO COM ANIMAÇÃO E FEEDBACK ---
function submitCustomPackage(event) {
    event.preventDefault();
    
    if (!validateCustomPackageForm()) {
        // Focar no primeiro campo com erro
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Estado de loading
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processando...
    `;
    
    // Simular envio (aqui você integraria com o backend)
    setTimeout(() => {
        // Resetar botão
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Mostrar sucesso
        showSuccessAlert();
        
        // Resetar formulário
        form.reset();
        
        // Focar no primeiro campo
        form.querySelector('input').focus();
    }, 1500);
}

// --- ALERTA DE SUCESSO APRIMORADO ---
function showSuccessAlert() {
    const alertContainer = document.getElementById('success-alert');
    
    alertContainer.innerHTML = `
        <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg shadow-lg transform transition-all duration-300">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    <h3 class="text-lg font-semibold text-green-800 mb-2">
                        ✅ Pacote Personalizado Criado!
                    </h3>
                    <div class="text-green-700 space-y-2">
                        <p class="font-medium">Parabéns! Seu pacote foi criado com sucesso.</p>
                        <p class="text-sm">Nossa equipe entrará em contato em até 24h com uma proposta personalizada para sua viagem dos sonhos!</p>
                        <div class="mt-3 p-3 bg-white rounded-md border border-green-200">
                            <p class="text-sm text-green-700"><strong>Atenção:</strong> Para agilizar o atendimento, você pode nos chamar no WhatsApp agora mesmo.</p>
                            <div class="mt-2">
                                <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer"
                                   class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2"><path d="M20.52 3.48A11.91 11.91 0 0012.06 0 12 12 0 000 12a11.91 11.91 0 003.48 8.46L2 24l3.66-1.44A12 12 0 1012.06 0a11.91 11.91 0 008.46 3.48zM12 22a10 10 0 01-5.09-1.39l-.36-.21-2.17.86.83-2.12-.24-.37A10 10 0 1112 22zm5.61-7.42c-.31-.15-1.82-.9-2.1-1s-.49-.15-.7.15-.8 1-.98 1.21-.36.23-.67.08a8.1 8.1 0 01-2.38-1.47 8.9 8.9 0 01-1.65-2.05c-.17-.31 0-.48.13-.63s.31-.36.46-.54a2.1 2.1 0 00.31-.52.57.57 0 000-.54c0-.16-.67-1.61-.92-2.21s-.49-.51-.67-.52h-.57a1.1 1.1 0 00-.8.37 3.35 3.35 0 00-1 2.5 5.79 5.79 0 001.22 3.07 13.22 13.22 0 004.51 4.63 15.37 15.37 0 003.23 1.34 3.82 3.82 0 001.76.11 2.88 2.88 0 001.9-1.35 2.35 2.35 0 00.16-1.35c-.06-.13-.28-.21-.59-.36z"/></svg>
                                    Falar no WhatsApp
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4 mt-4 text-sm">
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                Resposta em 24h
                            </span>
                            <span class="flex items-center">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                Contato direto
                            </span>
                        </div>
                    </div>
                </div>
                <button onclick="hideSuccessAlert()" 
                        class="flex-shrink-0 ml-4 text-green-400 hover:text-green-600 transition-colors"
                        aria-label="Fechar alerta">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    alertContainer.classList.remove('hidden');
    alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide após 10 segundos
    setTimeout(() => {
        hideSuccessAlert();
    }, 10000);
}

function hideSuccessAlert() {
    const alertContainer = document.getElementById('success-alert');
    alertContainer.classList.add('hidden');
}