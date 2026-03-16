// Objeto para armazenar os dados da empresa atual
let currentCompanyData = null;
let empresasEncontradas = [];

// Configuração da API
const API_BASE_URL = 'https://brasilapi.com.br/api';

// Função para preencher o input com CNPJ de exemplo
function preencherCNPJ(cnpj) {
    document.getElementById('cnpjInput').value = cnpj;
    consultarCNPJ();
}

// Função para limpar a busca
function limparBusca() {
    document.getElementById('cnpjInput').value = '';
    document.getElementById('companyInfo').innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">
            Digite um CNPJ ou use os filtros para buscar empresas
        </div>
    `;
    currentCompanyData = null;
    empresasEncontradas = [];
    esconderTodosFiltros();
}

// Função para esconder todos os filtros
function esconderTodosFiltros() {
    document.getElementById('filtroCidade').style.display = 'none';
    document.getElementById('filtroEstado').style.display = 'none';
    document.getElementById('filtroAtividade').style.display = 'none';
    document.getElementById('filtroNome').style.display = 'none';
}

// Funções para mostrar filtros específicos
function buscarPorCidade() {
    esconderTodosFiltros();
    document.getElementById('filtroCidade').style.display = 'flex';
}

function buscarPorEstado() {
    esconderTodosFiltros();
    document.getElementById('filtroEstado').style.display = 'flex';
}

function buscarPorAtividade() {
    esconderTodosFiltros();
    document.getElementById('filtroAtividade').style.display = 'flex';
}

function buscarPorNome() {
    esconderTodosFiltros();
    document.getElementById('filtroNome').style.display = 'flex';
}

// Função para aplicar filtro por cidade
async function aplicarFiltroCidade() {
    const cidade = document.getElementById('cidadeInput').value;
    const estado = document.getElementById('estadoSelect').value;
    
    if (!cidade || !estado) {
        alert('Por favor, preencha a cidade e selecione o estado');
        return;
    }
    
    mostrarLoading('Buscando empresas na cidade...');
    
    try {
        // Simulação de busca por cidade (API real não tem esse endpoint específico)
        // Na prática, você precisaria de uma API especializada para isso
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Dados simulados para demonstração
        const empresas = gerarEmpresasPorCidade(cidade, estado);
        empresasEncontradas = empresas;
        exibirListaEmpresas(empresas, `Empresas encontradas em ${cidade}/${estado}`);
        
    } catch (error) {
        mostrarErro('Erro ao buscar empresas por cidade');
    }
}

// Função para aplicar filtro por estado
async function aplicarFiltroEstado() {
    const estado = document.getElementById('estadoFiltroSelect').value;
    
    if (!estado) {
        alert('Por favor, selecione um estado');
        return;
    }
    
    mostrarLoading(`Buscando empresas no ${estado}...`);
    
    try {
        // Simulação de busca por estado
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const empresas = gerarEmpresasPorEstado(estado);
        empresasEncontradas = empresas;
        exibirListaEmpresas(empresas, `Empresas encontradas no estado ${estado}`);
        
    } catch (error) {
        mostrarErro('Erro ao buscar empresas por estado');
    }
}

// Função para aplicar filtro por atividade
async function aplicarFiltroAtividade() {
    const atividade = document.getElementById('atividadeInput').value;
    
    if (!atividade) {
        alert('Por favor, digite uma atividade');
        return;
    }
    
    mostrarLoading(`Buscando empresas com atividade: ${atividade}...`);
    
    try {
        // Simulação de busca por atividade
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const empresas = gerarEmpresasPorAtividade(atividade);
        empresasEncontradas = empresas;
        exibirListaEmpresas(empresas, `Empresas com atividade: ${atividade}`);
        
    } catch (error) {
        mostrarErro('Erro ao buscar empresas por atividade');
    }
}

// Função para aplicar filtro por nome
async function aplicarFiltroNome() {
    const nome = document.getElementById('nomeInput').value;
    
    if (!nome) {
        alert('Por favor, digite um nome');
        return;
    }
    
    mostrarLoading(`Buscando empresas com nome: ${nome}...`);
    
    try {
        // Simulação de busca por nome
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const empresas = gerarEmpresasPorNome(nome);
        empresasEncontradas = empresas;
        exibirListaEmpresas(empresas, `Empresas com nome: ${nome}`);
        
    } catch (error) {
        mostrarErro('Erro ao buscar empresas por nome');
    }
}

// Função para gerar empresas simuladas por cidade
function gerarEmpresasPorCidade(cidade, estado) {
    const empresas = [];
    const quantidades = [5, 8, 10, 12, 15];
    const quantidade = quantidades[Math.floor(Math.random() * quantidades.length)];
    
    const nomes = [
        'Comércio', 'Indústria', 'Serviços', 'Consultoria', 'Tecnologia',
        'Construção', 'Alimentação', 'Transportes', 'Saúde', 'Educação'
    ];
    
    const atividades = [
        'Comércio varejista', 'Prestação de serviços', 'Indústria de transformação',
        'Consultoria empresarial', 'Desenvolvimento de software', 'Construção civil',
        'Restaurante', 'Transporte rodoviário', 'Clínica médica', 'Ensino fundamental'
    ];
    
    for (let i = 0; i < quantidade; i++) {
        const nomeIndex = Math.floor(Math.random() * nomes.length);
        const atividadeIndex = Math.floor(Math.random() * atividades.length);
        const cnpjBase = String(Math.floor(Math.random() * 10000000000000)).padStart(14, '0');
        
        empresas.push({
            cnpj: formatarCNPJ(cnpjBase),
            razao_social: `${nomes[nomeIndex]} ${cidade} LTDA`,
            nome_fantasia: `${nomes[nomeIndex]} ${cidade}`,
            atividade_principal: atividades[atividadeIndex],
            endereco: {
                cidade: cidade,
                estado: estado
            }
        });
    }
    
    return empresas;
}

// Função para gerar empresas simuladas por estado
function gerarEmpresasPorEstado(estado) {
    const empresas = [];
    const cidadesPorEstado = {
        'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'São José dos Campos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Campos', 'Nova Iguaçu'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Novo Hamburgo'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Itabuna'],
        'PR': ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel'],
        'PE': ['Recife', 'Olinda', 'Jaboatão', 'Caruaru', 'Petrolina'],
        'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Sobral', 'Crato'],
        'DF': ['Brasília', 'Taguatinga', 'Ceilândia', 'Planaltina', 'Gama'],
        'AM': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari']
    };
    
    const cidades = cidadesPorEstado[estado] || ['Capital', 'Interior'];
    const quantidade = Math.floor(Math.random() * 20) + 10;
    
    for (let i = 0; i < quantidade; i++) {
        const cidade = cidades[Math.floor(Math.random() * cidades.length)];
        const cnpjBase = String(Math.floor(Math.random() * 10000000000000)).padStart(14, '0');
        
        empresas.push({
            cnpj: formatarCNPJ(cnpjBase),
            razao_social: `Empresa ${String(i + 1).padStart(3, '0')} ${cidade} LTDA`,
            nome_fantasia: `Empresa ${String(i + 1).padStart(3, '0')}`,
            atividade_principal: 'Atividade comercial',
            endereco: {
                cidade: cidade,
                estado: estado
            }
        });
    }
    
    return empresas;
}

// Função para gerar empresas por atividade
function gerarEmpresasPorAtividade(atividade) {
    const empresas = [];
    const quantidade = Math.floor(Math.random() * 15) + 5;
    
    for (let i = 0; i < quantidade; i++) {
        const cnpjBase = String(Math.floor(Math.random() * 10000000000000)).padStart(14, '0');
        
        empresas.push({
            cnpj: formatarCNPJ(cnpjBase),
            razao_social: `${atividade.toUpperCase()} ${String(i + 1).padStart(3, '0')} LTDA`,
            nome_fantasia: `${atividade} ${String(i + 1).padStart(3, '0')}`,
            atividade_principal: atividade,
            endereco: {
                cidade: 'Cidade Exemplo',
                estado: 'SP'
            }
        });
    }
    
    return empresas;
}

// Função para gerar empresas por nome
function gerarEmpresasPorNome(nome) {
    const empresas = [];
    const quantidade = Math.floor(Math.random() * 10) + 3;
    
    for (let i = 0; i < quantidade; i++) {
        const cnpjBase = String(Math.floor(Math.random() * 10000000000000)).padStart(14, '0');
        
        empresas.push({
            cnpj: formatarCNPJ(cnpjBase),
            razao_social: `${nome.toUpperCase()} ${String(i + 1).padStart(3, '0')} LTDA`,
            nome_fantasia: nome,
            atividade_principal: 'Atividade não especificada',
            endereco: {
                cidade: 'Cidade Exemplo',
                estado: 'SP'
            }
        });
    }
    
    return empresas;
}

// Função para exibir lista de empresas
function exibirListaEmpresas(empresas, titulo) {
    const companyInfo = document.getElementById('companyInfo');
    
    let empresasHtml = `
        <div style="grid-column: 1/-1;">
            <h3>${titulo} (${empresas.length} encontradas)</h3>
            <div class="company-list">
    `;
    
    empresas.forEach(empresa => {
        empresasHtml += `
            <div class="company-card" onclick="buscarCNPJEspecifico('${empresa.cnpj.replace(/[^\d]/g, '')}')">
                <h4>${empresa.nome_fantasia || empresa.razao_social}</h4>
                <p><strong>CNPJ:</strong> <span class="cnpj-small">${empresa.cnpj}</span></p>
                <p><strong>Razão Social:</strong> ${empresa.razao_social}</p>
                <p><strong>Atividade:</strong> ${empresa.atividade_principal}</p>
                <p><strong>Localização:</strong> ${empresa.endereco.cidade}/${empresa.endereco.estado}</p>
                <p style="color: #667eea; margin-top: 10px;">🔍 Clique para ver detalhes</p>
            </div>
        `;
    });
    
    empresasHtml += `
            </div>
        </div>
    `;
    
    companyInfo.innerHTML = empresasHtml;
}

// Função para buscar CNPJ específico quando clicar em um card
function buscarCNPJEspecifico(cnpj) {
    document.getElementById('cnpjInput').value = cnpj;
    consultarCNPJ();
}

// Função principal de consulta
async function consultarCNPJ() {
    let cnpj = document.getElementById('cnpjInput').value.replace(/[^\d]/g, '');
    
    if (!cnpj) {
        alert('Por favor, digite um CNPJ');
        return;
    }

    // Validação básica do CNPJ
    if (cnpj.length !== 14) {
        alert('CNPJ deve ter 14 dígitos');
        return;
    }

    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    
    mostrarLoading(`Consultando CNPJ ${formatarCNPJ(cnpj)}...`);

    try {
        // Consulta à API real da BrasilAPI
        const response = await fetch(`${API_BASE_URL}/cnpj/v1/${cnpj}`);
        
        if (!response.ok) {
            throw new Error('CNPJ não encontrado');
        }
        
        const data = await response.json();
        currentCompanyData = data;
        
        exibirResultado(data, searchType);
        
    } catch (error) {
        console.error('Erro na consulta:', error);
        
        // Fallback para dados simulados em caso de erro
        const dataSimulada = await simularConsultaCNPJ(cnpj, searchType);
        currentCompanyData = dataSimulada;
        exibirResultado(dataSimulada, searchType);
        
        mostrarAviso('Usando dados simulados - API temporariamente indisponível');
    }
}

// Função para simular dados (fallback)
async function simularConsultaCNPJ(cnpj, searchType) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Lista de estados e cidades para variar os resultados
    const estadosBrasil = {
        'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
        'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
        'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
        'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
        'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
        'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
        'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
    };
    
    const cidadesPorEstado = {
        'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'São José dos Campos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Petrópolis', 'Campos', 'Nova Iguaçu'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Novo Hamburgo'],
        'BA': ['Salvador', 'Feira de Santana', '
