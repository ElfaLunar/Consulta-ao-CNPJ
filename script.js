// Objeto para armazenar os dados da empresa atual
let currentCompanyData = null;

// Função para preencher o input com CNPJ de exemplo
function preencherCNPJ(cnpj) {
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
    
    // Mostrar loading
    document.getElementById('companyInfo').innerHTML = `
        <div class="loading" style="grid-column: 1/-1;">
            Consultando informações do CNPJ ${formatarCNPJ(cnpj)}...
        </div>
    `;

    try {
        // Simulação de consulta à API (substituir pela API real em produção)
        // Exemplo de API gratuita: https://brasilapi.com.br/api/cnpj/v1/{cnpj}
        // const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        // const data = await response.json();
        
        // Dados simulados para demonstração
        const data = await simularConsultaCNPJ(cnpj, searchType);
        currentCompanyData = data;
        
        exibirResultado(data, searchType);
    } catch (error) {
        document.getElementById('companyInfo').innerHTML = `
            <div class="error-message" style="grid-column: 1/-1;">
                ❌ Erro ao consultar CNPJ. Verifique o número e tente novamente.
            </div>
        `;
        console.error('Erro na consulta:', error);
    }
}

// Função para simular dados (substituir pela API real)
async function simularConsultaCNPJ(cnpj, searchType) {
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const empresas = {
        '06990590000123': {
            cnpj: '06.990.590/0001-23',
            razao_social: 'MAGAZINE LUIZA S.A.',
            nome_fantasia: 'Magazine Luiza',
            data_abertura: '16/04/2004',
            situacao_cadastral: 'Ativa',
            data_situacao_cadastral: '16/04/2004',
            capital_social: '5.847.829.483,41',
            natureza_juridica: 'Sociedade Anônima Aberta',
            porte: 'DEMAIS',
            atividade_principal: 'Comércio varejista de móveis, artigos de iluminação e outros artigos para residência',
            atividades_secundarias: ['Comércio varejista de eletrodomésticos', 'Comércio varejista de equipamentos de informática'],
            endereco: {
                logradouro: 'Av. Brigadeiro Faria Lima',
                numero: '3477',
                complemento: '18º Andar',
                bairro: 'Itaim Bibi',
                cidade: 'São Paulo',
                estado: 'SP',
                cep: '04538-133'
            },
            contato: {
                telefone: '(11) 3504-3504',
                email: 'relacionamento@magazineluiza.com.br'
            },
            simples_nacional: {
                optante: true,
                data_opcao: '01/07/2007',
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Federica Aparecida Trajano', qualificacao: 'Sócio-Administrador' },
                { nome: 'Luiza Helena Trajano', qualificacao: 'Presidente do Conselho' }
            ],
            cnae: '4754-7/01',
            cnae_fiscal: '4754-7/01',
            inscricoes_estaduais: ['112.223.445.556'],
            inscricao_municipal: '12345678',
            email: 'relacionamento@magazineluiza.com.br',
            telefone1: '(11) 3504-3504',
            telefone2: '(11) 3504-3505',
            site: 'www.magazineluiza.com.br',
            rede_social: '@magazineluiza',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 35,2 bilhões',
            numero_funcionarios: '45.000',
            matriz_filial: 'Matriz',
            codigo_municipio: '7107',
            codigo_uf: '35'
        },
        '33000167000101': {
            cnpj: '33.000.167/0001-01',
            razao_social: 'BANCO DO BRASIL S.A.',
            nome_fantasia: 'Banco do Brasil',
            data_abertura: '12/10/1808',
            situacao_cadastral: 'Ativa',
            capital_social: '90.000.000.000,00',
            atividade_principal: 'Banco Múltiplo',
            endereco: {
                logradouro: 'SBS Quadra 01 Bloco A',
                numero: 'S/N',
                complemento: 'Edifício Sede III',
                bairro: 'Asa Sul',
                cidade: 'Brasília',
                estado: 'DF',
                cep: '70073-901'
            },
            contato: {
                telefone: '(61) 3493-3000',
                email: 'faleconosco@bb.com.br'
            }
        },
        '60872504000123': {
            cnpj: '60.872.504/0001-23',
            razao_social: 'PETROLEO BRASILEIRO S A PETROBRAS',
            nome_fantasia: 'Petrobras',
            data_abertura: '03/10/1953',
            situacao_cadastral: 'Ativa',
            capital_social: '205.419.716.717,75',
            atividade_principal: 'Exploração, refino e comercialização de petróleo e derivados',
            endereco: {
                logradouro: 'Av. República do Chile',
                numero: '65',
                complemento: '',
                bairro: 'Centro',
                cidade: 'Rio de Janeiro',
                estado: 'RJ',
                cep: '20031-912'
            },
            contato: {
                telefone: '(21) 3224-1000',
                email: 'faleconosco@petrobras.com.br'
            }
        },
        '02164723000107': {
            cnpj: '02.164.723/0001-07',
            razao_social: 'GOOGLE BRASIL INTERNET LTDA.',
            nome_fantasia: 'Google Brasil',
            data_abertura: '15/12/2005',
            situacao_cadastral: 'Ativa',
            capital_social: '1.520.000,00',
            atividade_principal: 'Portais, provedores de conteúdo e outros serviços de informação na internet',
            endereco: {
                logradouro: 'Av. Brigadeiro Faria Lima',
                numero: '3900',
                complemento: '5º andar',
                bairro: 'Itaim Bibi',
                cidade: 'São Paulo',
                estado: 'SP',
                cep: '04538-132'
            },
            contato: {
                telefone: '(11) 2395-8400',
                email: 'suporte@google.com'
            }
        }
    };

    // Se o CNPJ existir na base simulada, retorna os dados
    if (empresas[cnpj]) {
        return empresas[cnpj];
    }

    // Se não existir, retorna dados genéricos baseados no CNPJ
    return {
        cnpj: formatarCNPJ(cnpj),
        razao_social: `EMPRESA EXEMPLO LTDA (CNPJ ${cnpj})`,
        nome_fantasia: 'Empresa Exemplo',
        data_abertura: '01/01/2020',
        situacao_cadastral: 'Ativa',
        capital_social: '100.000,00',
        atividade_principal: 'Atividade principal não especificada',
        endereco: {
            logradouro: 'Av. Paulista',
            numero: '1000',
            complemento: 'Sala 101',
            bairro: 'Bela Vista',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01310-100'
        },
        contato: {
            telefone: '(11) 1234-5678',
            email: 'contato@exemplo.com.br'
        }
    };
}

// Função para formatar CNPJ
function formatarCNPJ(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
}

// Função para exibir o resultado
function exibirResultado(data, searchType) {
    const companyInfo = document.getElementById('companyInfo');
    
    let html = '';

    if (searchType === 'basic') {
        html = `
            <div class="info-card">
                <h3>📋 Informações Básicas</h3>
                <div class="info-item">
                    <strong>CNPJ:</strong>
                    <p>${data.cnpj}</p>
                </div>
                <div class="info-item">
                    <strong>Razão Social:</strong>
                    <p>${data.razao_social}</p>
                </div>
                <div class="info-item">
                    <strong>Nome Fantasia:</strong>
                    <p>${data.nome_fantasia || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Abertura:</strong>
                    <p>${data.data_abertura || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Situação Cadastral:</strong>
                    <p>${data.situacao_cadastral || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>💰 Informações Financeiras</h3>
                <div class="info-item">
                    <strong>Capital Social:</strong>
                    <p>R$ ${data.capital_social}</p>
                </div>
                <div class="info-item">
                    <strong>Atividade Principal:</strong>
                    <p>${data.atividade_principal}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📍 Endereço</h3>
                <div class="info-item">
                    <strong>Logradouro:</strong>
                    <p>${data.endereco.logradouro}, ${data.endereco.numero} ${data.endereco.complemento}</p>
                </div>
                <div class="info-item">
                    <strong>Bairro:</strong>
                    <p>${data.endereco.bairro}</p>
                </div>
                <div class="info-item">
                    <strong>Cidade/UF:</strong>
                    <p>${data.endereco.cidade} - ${data.endereco.estado}</p>
                </div>
                <div class="info-item">
                    <strong>CEP:</strong>
                    <p>${data.endereco.cep}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📞 Contato</h3>
                <div class="info-item">
                    <strong>Telefone:</strong>
                    <p>${data.contato.telefone}</p>
                </div>
                <div class="info-item">
                    <strong>E-mail:</strong>
                    <p>${data.contato.email}</p>
                </div>
            </div>
        `;
    } else {
        // Busca completa com mais informações
        html = `
            <div class="info-card">
                <h3>📋 Dados Cadastrais Completos</h3>
                <div class="info-item">
                    <strong>CNPJ:</strong>
                    <p>${data.cnpj}</p>
                </div>
                <div class="info-item">
                    <strong>Razão Social:</strong>
                    <p>${data.razao_social}</p>
                </div>
                <div class="info-item">
                    <strong>Nome Fantasia:</strong>
                    <p>${data.nome_fantasia || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Abertura:</strong>
                    <p>${data.data_abertura || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Situação Cadastral:</strong>
                    <p>${data.situacao_cadastral || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Data da Situação:</strong>
                    <p>${data.data_situacao_cadastral || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Natureza Jurídica:</strong>
                    <p>${data.natureza_juridica || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Porte:</strong>
                    <p>${data.porte || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>💰 Informações Econômicas</h3>
                <div class="info-item">
                    <strong>Capital Social:</strong>
                    <p>R$ ${data.capital_social}</p>
                </div>
                <div class="info-item">
                    <strong>Atividade Principal (CNAE):</strong>
                    <p>${data.atividade_principal} (${data.cnae || 'Não informado'})</p>
                </div>
                <div class="info-item">
                    <strong>Atividades Secundárias:</strong>
                    <p>${data.atividades_secundarias ? data.atividades_secundarias.join('<br>') : 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>CNAE Fiscal:</strong>
                    <p>${data.cnae_fiscal || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Regime Tributário:</strong>
                    <p>${data.regime_tributario || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Faturamento Anual:</strong>
                    <p>${data.faturamento_anual || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Número de Funcionários:</strong>
                    <p>${data.numero_funcionarios || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📍 Endereço</h3>
                <div class="info-item">
                    <strong>Logradouro:</strong>
                    <p>${data.endereco.logradouro}, ${data.endereco.numero} ${data.endereco.complemento}</p>
                </div>
                <div class="info-item">
                    <strong>Bairro:</strong>
                    <p>${data.endereco.bairro}</p>
                </div>
                <div class="info-item">
                    <strong>Cidade/UF:</strong>
                    <p>${data.endereco.cidade} - ${data.endereco.estado}</p>
                </div>
                <div class="info-item">
                    <strong>CEP:</strong>
                    <p>${data.endereco.cep}</p>
                </div>
                <div class="info-item">
                    <strong>Código Município:</strong>
                    <p>${data.codigo_municipio || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Código UF:</strong>
                    <p>${data.codigo_uf || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📞 Contato e Redes</h3>
                <div class="info-item">
                    <strong>Telefone 1:</strong>
                    <p>${data.telefone1 || data.contato.telefone}</p>
                </div>
                <div class="info-item">
                    <strong>Telefone 2:</strong>
                    <p>${data.telefone2 || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>E-mail:</strong>
                    <p>${data.email || data.contato.email}</p>
                </div>
                <div class="info-item">
                    <strong>Site:</strong>
                    <p>${data.site || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Rede Social:</strong>
                    <p>${data.rede_social || 'Não informado'}</p>
                </div>
            </div>
            <div class="info-card">
                <h3>📝 Informações Adicionais</h3>
                <div class="info-item">
                    <strong>Matriz/Filial:</strong>
                    <p>${data.matriz_filial || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Inscrições Estaduais:</strong>
                    <p>${data.inscricoes_estaduais ? data.inscricoes_estaduais.join(', ') : 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Inscrição Municipal:</strong>
                    <p>${data.inscricao_municipal || 'Não informado'}</p>
                </div>
            </div>
        `;
    }

    // Adiciona informações do Simples Nacional se disponíveis
    if (data.simples_nacional && searchType === 'simples') {
        html += `
            <div class="info-card" style="grid-column: 1/-1;">
                <h3>🌟 Simples Nacional</h3>
                <div class="info-item">
                    <strong>Optante:</strong>
                    <p>${data.simples_nacional.optante ? 'Sim' : 'Não'}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Opção:</strong>
                    <p>${data.simples_nacional.data_opcao || 'Não informado'}</p>
                </div>
                <div class="info-item">
                    <strong>Data de Exclusão:</strong>
                    <p>${data.simples_nacional.data_exclusao || 'Não informado'}</p>
                </div>
            </div>
        `;
    }

    // Adiciona quadro societário se disponível
    if (data.quadros_societarios && data.quadros_societarios.length > 0) {
        let sociosHtml = '';
        data.quadros_societarios.forEach(socio => {
            sociosHtml += `
                <div class="info-item">
                    <strong>${socio.nome}</strong>
                    <p>${socio.qualificacao}</p>
                </div>
            `;
        });
        
        html += `
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

        // Lista de informações
        const informacoes = [
            { label: 'CNPJ', value: currentCompanyData.cnpj },
            { label: 'Razão Social', value: currentCompanyData.razao_social },
            { label: 'Nome Fantasia', value: currentCompanyData.nome_fantasia || 'Não informado' },
            { label: 'Data de Abertura', value: currentCompanyData.data_abertura || 'Não informado' },
            { label: 'Situação Cadastral', value: currentCompanyData.situacao_cadastral || 'Não informado' },
            { label: 'Capital Social', value: `R$ ${currentCompanyData.capital_social}` },
            { label: 'Atividade Principal', value: currentCompanyData.atividade_principal }
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
            const textWidth = doc.getTextWidth(`${info.label}: `);
            doc.text(info.value, margin + textWidth + 2, yPos);
            
            yPos += 7;
        });

        yPos += 5;

        // Endereço
        doc.setFont(undefined, 'bold');
        doc.text('ENDEREÇO:', margin, yPos);
        doc.setFont(undefined, 'normal');
        yPos += 7;
        
        const endereco = `${currentCompanyData.endereco.logradouro}, ${currentCompanyData.endereco.numero} ${currentCompanyData.endereco.complemento}`;
        doc.text(endereco, margin + 5, yPos);
        yPos += 7;
        doc.text(`${currentCompanyData.endereco.bairro}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`${currentCompanyData.endereco.cidade} - ${currentCompanyData.endereco.estado}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`CEP: ${currentCompanyData.endereco.cep}`, margin + 5, yPos);
        
        yPos += 10;

        // Contato
        doc.setFont(undefined, 'bold');
        doc.text('CONTATO:', margin, yPos);
        doc.setFont(undefined, 'normal');
        yPos += 7;
        doc.text(`Telefone: ${currentCompanyData.contato.telefone}`, margin + 5, yPos);
        yPos += 7;
        doc.text(`E-mail: ${currentCompanyData.contato.email}`, margin + 5, yPos);

        // Rodapé
        yPos = 280;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Documento gerado eletronicamente pelo Sistema de Consulta CNPJ', margin, yPos);
        doc.text('Fonte: Dados públicos da Receita Federal', margin, yPos + 4);

        // Salvar o PDF
        doc.save(`consulta_cnpj_${currentCompanyData.cnpj.replace(/[^\d]/g, '')}.pdf`);
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Erro ao gerar PDF. Tente novamente.');
    }
}

// Formatação do CNPJ enquanto digita
document.getElementById('cnpjInput').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value;
    }
});

// Permite consultar com Enter
document.getElementById('cnpjInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        consultarCNPJ();
    }
});
