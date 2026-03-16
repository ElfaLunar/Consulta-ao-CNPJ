// Objeto para armazenar os dados da empresa atual
let currentCompanyData = null;
let empresasEncontradas = [];

// Configuração da API - Usando API alternativa que funciona
const API_BASE_URL = 'https://receitaws.com.br/v1/cnpj';

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

// Função para mostrar loading
function mostrarLoading(mensagem) {
    document.getElementById('companyInfo').innerHTML = `
        <div class="loading" style="grid-column: 1/-1; text-align: center; padding: 60px;">
            ${mensagem}
        </div>
    `;
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    document.getElementById('companyInfo').innerHTML = `
        <div class="error-message" style="grid-column: 1/-1;">
            ❌ ${mensagem}
        </div>
    `;
}

// Função para mostrar aviso
function mostrarAviso(mensagem) {
    const aviso = document.createElement('div');
    aviso.className = 'error-message';
    aviso.style.background = '#fff3cd';
    aviso.style.color = '#856404';
    aviso.style.border = '1px solid #ffeeba';
    aviso.style.marginTop = '10px';
    aviso.innerHTML = `⚠️ ${mensagem}`;
    
    const resultSection = document.getElementById('resultSection');
    resultSection.insertBefore(aviso, document.getElementById('companyInfo'));
    
    setTimeout(() => {
        aviso.remove();
    }, 5000);
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

// Função para formatar CNPJ
function formatarCNPJ(cnpj) {
    if (!cnpj) return '';
    cnpj = cnpj.replace(/\D/g, '');
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

// Função para formatar telefone
function formatarTelefone(telefone) {
    if (!telefone) return 'Não informado';
    telefone = telefone.replace(/\D/g, '');
    if (telefone.length === 10) {
        return telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else if (telefone.length === 11) {
        return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return telefone;
}

// Função para formatar CEP
function formatarCEP(cep) {
    if (!cep) return 'Não informado';
    cep = cep.replace(/\D/g, '');
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
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
        // Consulta à API real da ReceitaWS (gratuita)
        const response = await fetch(`${API_BASE_URL}/${cnpj}`);
        
        if (!response.ok) {
            throw new Error('CNPJ não encontrado ou API indisponível');
        }
        
        const data = await response.json();
        
        // Verificar se a API retornou erro
        if (data.status === 'ERROR') {
            throw new Error(data.message || 'Erro na consulta');
        }
        
        currentCompanyData = data;
        exibirResultado(data, searchType);
        
    } catch (error) {
        console.error('Erro na consulta:', error);
        mostrarErro(`Erro ao consultar CNPJ: ${error.message}`);
    }
}

// Função para exibir o resultado
function exibirResultado(data, searchType) {
    const companyInfo = document.getElementById('companyInfo');
    
    // Extrair informações da API
    const cnpj = formatarCNPJ(data.cnpj);
    const razaoSocial = data.nome || data.razao_social || 'Não informado';
    const nomeFantasia = data.fantasia || 'Não informado';
    const dataAbertura = data.abertura || data.data_abertura || 'Não informado';
    const situacao = data.situacao || 'Não informado';
    const capitalSocial = data.capital_social || data.capital || '0,00';
    const atividadePrincipal = data.atividade_principal || 
                              (data.atividade_principal && data.atividade_principal[0] ? 
                               data.atividade_principal[0].text : 'Não informado');
    
    // Endereço
    const logradouro = data.logradouro || data.endereco?.logradouro || '';
    const numero = data.numero || data.endereco?.numero || 'S/N';
    const complemento = data.complemento || data.endereco?.complemento || '';
    const bairro = data.bairro || data.endereco?.bairro || '';
    const cidade = data.municipio || data.endereco?.cidade || '';
    const estado = data.uf || data.endereco?.estado || '';
    const cep = formatarCEP(data.cep || data.endereco?.cep);
    
    // Contato
    const telefone = data.telefone || data.contato?.telefone || '';
    const email = data.email || data.contato?.email || '';
    
    // Informações adicionais
    const porte = data.porte || data.porte_empresa || 'Não informado';
    const naturezaJuridica = data.natureza_juridica || 'Não informado';
    const cnae = data.cnae || data.cnae_fiscal || 'Não informado';
    
    let html = '';

    if (searchType === 'resumida') {
        html = `
            <div class="info-card">
                <h3>📋 Informações Básicas</h3>
                <div class="info-item">
                    <strong>CNPJ:</strong>
                    <p>${cnpj}</p>
                </div>
                <div class="info-item">
                    <strong>Razão Social:</strong>
                    <p>${razaoSocial}</p>
                </div>
                <div class="info-item">
                    <strong>Nome Fantasia:</strong>
                    <p>${nomeFantasia}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Abertura:</strong>
                    <p>${dataAbertura}</p>
                </div>
                <div class="info-item">
                    <strong>Situação Cadastral:</strong>
                    <p>${situacao}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>💰 Informações Financeiras</h3>
                <div class="info-item">
                    <strong>Capital Social:</strong>
                    <p>R$ ${capitalSocial}</p>
                </div>
                <div class="info-item">
                    <strong>Atividade Principal:</strong>
                    <p>${atividadePrincipal}</p>
                </div>
                <div class="info-item">
                    <strong>Porte da Empresa:</strong>
                    <p>${porte}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📍 Endereço</h3>
                <div class="info-item">
                    <strong>Logradouro:</strong>
                    <p>${logradouro}, ${numero} ${complemento}</p>
                </div>
                <div class="info-item">
                    <strong>Bairro:</strong>
                    <p>${bairro}</p>
                </div>
                <div class="info-item">
                    <strong>Cidade/UF:</strong>
                    <p>${cidade} - ${estado}</p>
                </div>
                <div class="info-item">
                    <strong>CEP:</strong>
                    <p>${cep}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📞 Contato</h3>
                <div class="info-item">
                    <strong>Telefone:</strong>
                    <p>${formatarTelefone(telefone)}</p>
                </div>
                <div class="info-item">
                    <strong>E-mail:</strong>
                    <p>${email || 'Não informado'}</p>
                </div>
            </div>
        `;
    } else {
        // Busca completa com mais informações
        const atividadesSecundarias = data.atividade_secundaria || data.atividades_secundarias || [];
        let atividadesHtml = '';
        if (atividadesSecundarias.length > 0) {
            atividadesSecundarias.forEach(atv => {
                const texto = atv.text || atv;
                atividadesHtml += `<p>• ${texto}</p>`;
            });
        } else {
            atividadesHtml = '<p>Não informado</p>';
        }
        
        const qsa = data.qsa || data.quadro_societario || [];
        let sociosHtml = '';
        if (qsa.length > 0) {
            qsa.forEach(socio => {
                const nome = socio.nome || socio.nome_socio || 'Não informado';
                const qualificacao = socio.qualificacao || socio.cargo || 'Sócio';
                sociosHtml += `
                    <div class="info-item">
                        <strong>${nome}</strong>
                        <p>${qualificacao}</p>
                    </div>
                `;
            });
        } else {
            sociosHtml = '<p>Não informado</p>';
        }
        
        html = `
            <div class="info-card">
                <h3>📋 Dados Cadastrais Completos</h3>
                <div class="info-item">
                    <strong>CNPJ:</strong>
                    <p>${cnpj}</p>
                </div>
                <div class="info-item">
                    <strong>Razão Social:</strong>
                    <p>${razaoSocial}</p>
                </div>
                <div class="info-item">
                    <strong>Nome Fantasia:</strong>
                    <p>${nomeFantasia}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Abertura:</strong>
                    <p>${dataAbertura}</p>
                </div>
                <div class="info-item">
                    <strong>Situação Cadastral:</strong>
                    <p>${situacao}</p>
                </div>
                <div class="info-item">
                    <strong>Data da Situação:</strong>
                    <p>${data.data_situacao || data.data_situacao_cadastral || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Natureza Jurídica:</strong>
                    <p>${naturezaJuridica}</p>
                </div>
                <div class="info-item">
                    <strong>Porte:</strong>
                    <p>${porte}</p>
                </div>
                <div class="info-item">
                    <strong>CNAE Principal:</strong>
                    <p>${cnae}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>💰 Informações Econômicas</h3>
                <div class="info-item">
                    <strong>Capital Social:</strong>
                    <p>R$ ${capitalSocial}</p>
                </div>
                <div class="info-item">
                    <strong>Atividade Principal:</strong>
                    <p>${atividadePrincipal}</p>
                </div>
                <div class="info-item">
                    <strong>Atividades Secundárias:</strong>
                    <div style="margin-left: 10px; margin-top: 5px;">
                        ${atividadesHtml}
                    </div>
                </div>
                <div class="info-item">
                    <strong>Simples Nacional:</strong>
                    <p>${data.simples?.optante === 'S' ? 'Sim' : (data.simples ? 'Não' : 'Não informado')}</p>
                </div>
                <div class="info-item">
                    <strong>MEI:</strong>
                    <p>${data.mei?.optante === 'S' ? 'Sim' : (data.mei ? 'Não' : 'Não informado')}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📍 Endereço</h3>
                <div class="info-item">
                    <strong>Logradouro:</strong>
                    <p>${logradouro}, ${numero} ${complemento}</p>
                </div>
                <div class="info-item">
                    <strong>Bairro:</strong>
                    <p>${bairro}</p>
                </div>
                <div class="info-item">
                    <strong>Cidade/UF:</strong>
                    <p>${cidade} - ${estado}</p>
                </div>
                <div class="info-item">
                    <strong>CEP:</strong>
                    <p>${cep}</p>
                </div>
                <div class="info-item">
                    <strong>Código Município:</strong>
                    <p>${data.codigo_municipio || data.codigo_municipio_ibge || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Código UF:</strong>
                    <p>${data.codigo_uf || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📞 Contato</h3>
                <div class="info-item">
                    <strong>Telefone:</strong>
                    <p>${formatarTelefone(telefone)}</p>
                </div>
                <div class="info-item">
                    <strong>Telefone 2:</strong>
                    <p>${data.telefone2 ? formatarTelefone(data.telefone2) : 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>E-mail:</strong>
                    <p>${email || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>E-mail 2:</strong>
                    <p>${data.email2 || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📝 Informações Adicionais</h3>
                <div class="info-item">
                    <strong>Matriz/Filial:</strong>
                    <p>${data.tipo || data.matriz_filial || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Inscrições Estaduais:</strong>
                    <p>${data.inscricoes_estaduais ? data.inscricoes_estaduais.join(', ') : 
                       (data.inscricao_estadual || 'Não informado')}</p>
                </div>
                <div class="info-item">
                    <strong>Inscrição Municipal:</strong>
                    <p>${data.inscricao_municipal || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Última Atualização:</strong>
                    <p>${data.ultima_atualizacao || data.data_atualizacao || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card" style="grid-column: 1/-1;">
                <h3>👥 Quadro Societário</h3>
                ${sociosHtml}
            </div>
        `;
    }

    companyInfo.innerHTML = html;
}

// Função para gerar PDF
async function gerarPDF() {
    if (!currentCompanyData) {
        alert('Nenhum dado disponível para gerar PDF. Faça uma consulta primeiro.');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Configurações do PDF
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let yPos = 20;

        // Título
        doc.setFontSize(22);
        doc.setTextColor(102, 126, 234);
        doc.text('RELATÓRIO DE CONSULTA CNPJ', margin, yPos, { align: 'left' });
        
        yPos += 10;
        doc.setDrawColor(102, 126, 234);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        
        yPos += 15;

        // Data e hora da consulta
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const dataConsulta = new Date().toLocaleString('pt-BR');
        doc.text(`Data da consulta: ${dataConsulta}`, margin, yPos);
        
        yPos += 15;

        // Informações da empresa
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text('DADOS DA EMPRESA', margin, yPos);
        doc.setFont(undefined, 'normal');
        
        yPos += 10;

        // Extrair informações
        const cnpj = formatarCNPJ(currentCompanyData.cnpj);
        const razaoSocial = currentCompanyData.nome || currentCompanyData.razao_social || 'Não informado';
        const nomeFantasia = currentCompanyData.fantasia || 'Não informado';
        const dataAbertura = currentCompanyData.abertura || currentCompanyData.data_abertura || 'Não informado';
        const situacao = currentCompanyData.situacao || 'Não informado';
        const capitalSocial = currentCompanyData.capital_social || currentCompanyData.capital || '0,00';
        const atividadePrincipal = currentCompanyData.atividade_principal || 
                                  (currentCompanyData.atividade_principal && currentCompanyData.atividade_principal[0] ? 
                                   currentCompanyData.atividade_principal[0].text : 'Não informado');

        // Lista de informações
        const informacoes = [
            { label: 'CNPJ', value: cnpj },
            { label: 'Razão Social', value: razaoSocial },
            { label: 'Nome Fantasia', value: nomeFantasia },
            { label: 'Data de Abertura', value: dataAbertura },
            { label: 'Situação Cadastral', value: situacao },
            { label: 'Capital Social', value: `R$ ${capitalSocial}` },
            { label: 'Atividade Principal', value: atividadePrincipal }
        ];

        informacoes.forEach(info => {
            if (yPos > 280) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text(`${info.label}:`, margin, yPos);
            
            doc.setFont(undefined, 'normal');
            doc.text(info.value, margin + 40, yPos);
            
            yPos += 7;
        });

        yPos += 5;

        // Endereço
        const logradouro = currentCompanyData.logradouro || '';
        const numero = currentCompanyData.numero || 'S/N';
        const complemento = currentCompanyData.complemento || '';
        const bairro = currentCompanyData.bairro || '';
        const cidade = currentCompanyData.municipio || '';
        const estado = currentCompanyData.uf || '';
        const cep = formatarCEP(currentCompanyData.cep);

        doc.setFont(undefined, 'bold');
        doc.text('ENDEREÇO:', margin, yPos);
        doc.setFont(undefined, 'normal');
        yPos += 7;
        
        const endereco = `${logradouro}, ${numero} ${complemento}`;
        doc.text(endereco, margin + 5, yPos);
        yPos += 7;
        doc.text(`${bairro}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`${cidade} - ${estado}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`CEP: ${cep}`, margin + 5, yPos);
        
        yPos += 10;

        // Contato
        const telefone = currentCompanyData.telefone || '';
        const email = currentCompanyData.email || '';

        doc.setFont(undefined, 'bold');
        doc.text('CONTATO:', margin, yPos);
        doc.setFont(undefined, 'normal');
        yPos += 7;
        doc.text(`Telefone: ${formatarTelefone(telefone)}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`E-mail: ${email || 'Não informado'}`, margin + 5, yPos);

        // Rodapé
        yPos = 280;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Documento gerado eletronicamente pelo Sistema de Consulta CNPJ', margin, yPos);
        doc.text('Fonte: ReceitaWS - Dados públicos da Receita Federal', margin, yPos + 4);

        // Salvar o PDF
        doc.save(`consulta_cnpj_${currentCompanyData.cnpj.replace(/[^\d]/g, '')}.pdf`);
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Tente novamente.');
    }
}

// Função para exportar JSON
function exportarJSON() {
    if (!currentCompanyData) {
        alert('Nenhum dado disponível para exportar. Faça uma consulta primeiro.');
        return;
    }

    const dataStr = JSON.stringify(currentCompanyData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `cnpj_${currentCompanyData.cnpj.replace(/[^\d]/g, '')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Formatação do CNPJ enquanto digita
document.getElementById('cnpjInput').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
        if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        }
        if (value.length > 6) {
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (value.length > 10) {
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        }
        if (value.length > 15) {
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        }
        e.target.value = value;
    }
});

// Permite consultar com Enter
document.getElementById('cnpjInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        consultarCNPJ();
    }
});

// Funções de filtro (simuladas)
async function aplicarFiltroCidade() {
    const cidade = document.getElementById('cidadeInput').value;
    const estado = document.getElementById('estadoSelect').value;
    
    if (!cidade || !estado) {
        alert('Por favor, preencha a cidade e selecione o estado');
        return;
    }
    
    mostrarLoading(`Buscando empresas em ${cidade}/${estado}...`);
    
    setTimeout(() => {
        mostrarErro('Busca por cidade disponível apenas na versão premium da API');
    }, 1500);
}

async function aplicarFiltroEstado() {
    const estado = document.getElementById('estadoFiltroSelect').value;
    
    if (!estado) {
        alert('Por favor, selecione um estado');
        return;
    }
    
    mostrarLoading(`Buscando empresas no estado ${estado}...`);
    
    setTimeout(() => {
        mostrarErro('Busca por estado disponível apenas na versão premium da API');
    }, 1500);
}

async function aplicarFiltroAtividade() {
    const atividade = document.getElementById('atividadeInput').value;
    
    if (!atividade) {
        alert('Por favor, digite uma atividade');
        return;
    }
    
    mostrarLoading(`Buscando empresas com atividade: ${atividade}...`);
    
    setTimeout(() => {
        mostrarErro('Busca por atividade disponível apenas na versão premium da API');
    }, 1500);
}

async function aplicarFiltroNome() {
    const nome = document.getElementById('nomeInput').value;
    
    if (!nome) {
        alert('Por favor, digite um nome');
        return;
    }
    
    mostrarLoading(`Buscando empresas com nome: ${nome}...`);
    
    setTimeout(() => {
        mostrarErro('Busca por nome disponível apenas na versão premium da API');
    }, 1500);
}
