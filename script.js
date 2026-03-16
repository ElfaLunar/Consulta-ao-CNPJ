// Função para simular dados (substituir pela API real)
async function simularConsultaCNPJ(cnpj, searchType) {
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const empresas = {
        // SP - Capital
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
        
        // DF - Brasília
        '33000167000101': {
            cnpj: '33.000.167/0001-01',
            razao_social: 'BANCO DO BRASIL S.A.',
            nome_fantasia: 'Banco do Brasil',
            data_abertura: '12/10/1808',
            situacao_cadastral: 'Ativa',
            capital_social: '90.000.000.000,00',
            natureza_juridica: 'Sociedade de Economia Mista',
            porte: 'DEMAIS',
            atividade_principal: 'Banco Múltiplo',
            atividades_secundarias: ['Administração de consórcios', 'Corretora de títulos e valores mobiliários'],
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
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'União Federal', qualificacao: 'Acionista Majoritário' },
                { nome: 'Tarciana Medeiros', qualificacao: 'Presidente' }
            ],
            cnae: '6422-1/00',
            cnae_fiscal: '6422-1/00',
            inscricoes_estaduais: ['073.865.499.001'],
            inscricao_municipal: '12345678',
            telefone1: '(61) 3493-3000',
            telefone2: '(61) 3493-3001',
            site: 'www.bb.com.br',
            rede_social: '@bancodobrasil',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 320 bilhões',
            numero_funcionarios: '85.000',
            matriz_filial: 'Matriz',
            codigo_municipio: '9701',
            codigo_uf: '53'
        },
        
        // RJ - Rio de Janeiro
        '60872504000123': {
            cnpj: '60.872.504/0001-23',
            razao_social: 'PETROLEO BRASILEIRO S A PETROBRAS',
            nome_fantasia: 'Petrobras',
            data_abertura: '03/10/1953',
            situacao_cadastral: 'Ativa',
            capital_social: '205.419.716.717,75',
            natureza_juridica: 'Sociedade de Economia Mista',
            porte: 'DEMAIS',
            atividade_principal: 'Exploração, refino e comercialização de petróleo e derivados',
            atividades_secundarias: ['Geração de energia elétrica', 'Transporte de gás natural'],
            endereco: {
                logradouro: 'Av. República do Chile',
                numero: '65',
                complemento: 'Centro Empresarial',
                bairro: 'Centro',
                cidade: 'Rio de Janeiro',
                estado: 'RJ',
                cep: '20031-912'
            },
            contato: {
                telefone: '(21) 3224-1000',
                email: 'faleconosco@petrobras.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'União Federal', qualificacao: 'Acionista Majoritário' },
                { nome: 'Jean Paul Prates', qualificacao: 'Presidente' }
            ],
            cnae: '1921-7/00',
            cnae_fiscal: '1921-7/00',
            inscricoes_estaduais: ['876.543.21.00'],
            inscricao_municipal: '12345678',
            telefone1: '(21) 3224-1000',
            telefone2: '(21) 3224-1001',
            site: 'www.petrobras.com.br',
            rede_social: '@petrobras',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 650 bilhões',
            numero_funcionarios: '45.000',
            matriz_filial: 'Matriz',
            codigo_municipio: '6001',
            codigo_uf: '33'
        },
        
        // SP - Capital (Google)
        '02164723000107': {
            cnpj: '02.164.723/0001-07',
            razao_social: 'GOOGLE BRASIL INTERNET LTDA.',
            nome_fantasia: 'Google Brasil',
            data_abertura: '15/12/2005',
            situacao_cadastral: 'Ativa',
            capital_social: '1.520.000,00',
            natureza_juridica: 'Sociedade Empresária Limitada',
            porte: 'DEMAIS',
            atividade_principal: 'Portais, provedores de conteúdo e outros serviços de informação na internet',
            atividades_secundarias: ['Desenvolvimento de programas de computador', 'Consultoria em tecnologia da informação'],
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
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Google International LLC', qualificacao: 'Sócio Estrangeiro' },
                { nome: 'Fábio Coelho', qualificacao: 'Diretor Presidente' }
            ],
            cnae: '6319-4/00',
            cnae_fiscal: '6319-4/00',
            inscricoes_estaduais: ['145.678.901.234'],
            inscricao_municipal: '87654321',
            telefone1: '(11) 2395-8400',
            telefone2: '(11) 2395-8401',
            site: 'www.google.com.br',
            rede_social: '@googlebrasil',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 15 bilhões',
            numero_funcionarios: '3.500',
            matriz_filial: 'Matriz',
            codigo_municipio: '7107',
            codigo_uf: '35'
        },
        
        // AM - Manaus (Zona Franca)
        '04328765000180': {
            cnpj: '04.328.765/0001-80',
            razao_social: 'SUNDOWN INDÚSTRIA E COMÉRCIO LTDA',
            nome_fantasia: 'Sundown',
            data_abertura: '10/05/1995',
            situacao_cadastral: 'Ativa',
            capital_social: '45.000.000,00',
            natureza_juridica: 'Sociedade Empresária Limitada',
            porte: 'DEMAIS',
            atividade_principal: 'Fabricação de produtos de perfumaria e cosméticos',
            atividades_secundarias: ['Comércio atacadista de cosméticos', 'Fabricação de preparações para higiene pessoal'],
            endereco: {
                logradouro: 'Av. Torquato Tapajós',
                numero: '7890',
                complemento: 'Distrito Industrial',
                bairro: 'Flores',
                cidade: 'Manaus',
                estado: 'AM',
                cep: '69058-830'
            },
            contato: {
                telefone: '(92) 3612-4000',
                email: 'contato@sundown.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'João Carlos Paes Mendonça', qualificacao: 'Sócio-Administrador' }
            ],
            cnae: '2063-1/00',
            cnae_fiscal: '2063-1/00',
            inscricoes_estaduais: ['04.123.456-7'],
            inscricao_municipal: '12345678',
            telefone1: '(92) 3612-4000',
            telefone2: '(92) 3612-4001',
            site: 'www.sundown.com.br',
            rede_social: '@sundownoficial',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 850 milhões',
            numero_funcionarios: '1.200',
            matriz_filial: 'Matriz',
            codigo_municipio: '1302',
            codigo_uf: '13'
        },
        
        // CE - Fortaleza
        '07987654000198': {
            cnpj: '07.987.654/0001-98',
            razao_social: 'GRUPO EDSCONSTRUÇÕES LTDA',
            nome_fantasia: 'Edson Queiroz',
            data_abertura: '20/03/1980',
            situacao_cadastral: 'Ativa',
            capital_social: '250.000.000,00',
            natureza_juridica: 'Sociedade Empresária Limitada',
            porte: 'DEMAIS',
            atividade_principal: 'Incorporação de empreendimentos imobiliários',
            atividades_secundarias: ['Construção de edifícios', 'Comércio varejista de materiais de construção'],
            endereco: {
                logradouro: 'Av. Barão de Studart',
                numero: '2360',
                complemento: 'Edifício Gran Marquise',
                bairro: 'Aldeota',
                cidade: 'Fortaleza',
                estado: 'CE',
                cep: '60120-002'
            },
            contato: {
                telefone: '(85) 3456-7890',
                email: 'contato@grupoeq.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Yolanda Queiroz', qualificacao: 'Sócia-Administradora' }
            ],
            cnae: '4110-7/00',
            cnae_fiscal: '4110-7/00',
            inscricoes_estaduais: ['06.789.012-3'],
            inscricao_municipal: '12345678',
            telefone1: '(85) 3456-7890',
            telefone2: '(85) 3456-7891',
            site: 'www.grupoedsonqueiroz.com.br',
            rede_social: '@grupоеq',
            regime_tributario: 'Lucro Presumido',
            faturamento_anual: 'R$ 1,2 bilhão',
            numero_funcionarios: '3.500',
            matriz_filial: 'Matriz',
            codigo_municipio: '2304',
            codigo_uf: '23'
        },
        
        // MG - Belo Horizonte
        '17123456000190': {
            cnpj: '17.123.456/0001-90',
            razao_social: 'USIMINAS S.A.',
            nome_fantasia: 'Usiminas',
            data_abertura: '25/04/1956',
            situacao_cadastral: 'Ativa',
            capital_social: '12.500.000.000,00',
            natureza_juridica: 'Sociedade Anônima Aberta',
            porte: 'DEMAIS',
            atividade_principal: 'Produção de laminados planos de aço',
            atividades_secundarias: ['Geração de energia elétrica', 'Logística e transporte'],
            endereco: {
                logradouro: 'Av. do Contorno',
                numero: '6594',
                complemento: 'Funcionários',
                bairro: 'Savassi',
                cidade: 'Belo Horizonte',
                estado: 'MG',
                cep: '30110-044'
            },
            contato: {
                telefone: '(31) 3499-8000',
                email: 'faleconosco@usiminas.com'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Alberto Ono', qualificacao: 'Diretor Presidente' }
            ],
            cnae: '2412-1/00',
            cnae_fiscal: '2412-1/00',
            inscricoes_estaduais: ['062.123.456.78-91'],
            inscricao_municipal: '12345678',
            telefone1: '(31) 3499-8000',
            telefone2: '(31) 3499-8001',
            site: 'www.usiminas.com',
            rede_social: '@usiminas',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 28 bilhões',
            numero_funcionarios: '15.000',
            matriz_filial: 'Matriz',
            codigo_municipio: '3106',
            codigo_uf: '31'
        },
        
        // BA - Salvador
        '15123456000199': {
            cnpj: '15.123.456/0001-99',
            razao_social: 'GRUPO OEIRAS',
            nome_fantasia: 'Oeiras',
            data_abertura: '12/07/1965',
            situacao_cadastral: 'Ativa',
            capital_social: '180.000.000,00',
            natureza_juridica: 'Sociedade Empresária Limitada',
            porte: 'DEMAIS',
            atividade_principal: 'Comércio varejista de materiais de construção',
            atividades_secundarias: ['Comércio atacadista', 'Indústria de cerâmica'],
            endereco: {
                logradouro: 'Av. Antonio Carlos Magalhães',
                numero: '3245',
                complemento: 'Edifício Empresarial',
                bairro: 'Itaigara',
                cidade: 'Salvador',
                estado: 'BA',
                cep: '41820-000'
            },
            contato: {
                telefone: '(71) 3345-6000',
                email: 'contato@grupooeiras.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Antonio Oeiras', qualificacao: 'Sócio-Administrador' }
            ],
            cnae: '4744-0/05',
            cnae_fiscal: '4744-0/05',
            inscricoes_estaduais: ['078.543.210-6'],
            inscricao_municipal: '12345678',
            telefone1: '(71) 3345-6000',
            telefone2: '(71) 3345-6001',
            site: 'www.grupooeiras.com.br',
            rede_social: '@grupooeiras',
            regime_tributario: 'Lucro Presumido',
            faturamento_anual: 'R$ 950 milhões',
            numero_funcionarios: '2.800',
            matriz_filial: 'Matriz',
            codigo_municipio: '2927',
            codigo_uf: '29'
        },
        
        // RS - Porto Alegre
        '92123456000156': {
            cnpj: '92.123.456/0001-56',
            razao_social: 'GRUPO RBS',
            nome_fantasia: 'RBS',
            data_abertura: '29/08/1957',
            situacao_cadastral: 'Ativa',
            capital_social: '350.000.000,00',
            natureza_juridica: 'Sociedade Anônima Fechada',
            porte: 'DEMAIS',
            atividade_principal: 'Atividades de televisão aberta',
            atividades_secundarias: ['Jornais', 'Rádio', 'Portais de internet'],
            endereco: {
                logradouro: 'Av. Ipiranga',
                numero: '1075',
                complemento: 'Edifício RBS TV',
                bairro: 'Azenha',
                cidade: 'Porto Alegre',
                estado: 'RS',
                cep: '90160-093'
            },
            contato: {
                telefone: '(51) 3218-4747',
                email: 'contato@rbs.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'Eduardo Sirotsky Melzer', qualificacao: 'Diretor Presidente' }
            ],
            cnae: '6022-5/01',
            cnae_fiscal: '6022-5/01',
            inscricoes_estaduais: ['087/1234567'],
            inscricao_municipal: '12345678',
            telefone1: '(51) 3218-4747',
            telefone2: '(51) 3218-4748',
            site: 'www.gruporbs.com.br',
            rede_social: '@gruporbs',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 1,5 bilhão',
            numero_funcionarios: '4.500',
            matriz_filial: 'Matriz',
            codigo_municipio: '4314',
            codigo_uf: '43'
        },
        
        // PE - Recife
        '10123456000188': {
            cnpj: '10.123.456/0001-88',
            razao_social: 'GRUPO JCPM',
            nome_fantasia: 'JCPM',
            data_abertura: '15/11/1946',
            situacao_cadastral: 'Ativa',
            capital_social: '420.000.000,00',
            natureza_juridica: 'Sociedade Empresária Limitada',
            porte: 'DEMAIS',
            atividade_principal: 'Participações societárias',
            atividades_secundarias: ['Shopping centers', 'Hotéis', 'Agronegócio'],
            endereco: {
                logradouro: 'Av. Engenheiro Antônio de Goes',
                numero: '60',
                complemento: 'Edifício JCPM',
                bairro: 'Pina',
                cidade: 'Recife',
                estado: 'PE',
                cep: '51111-110'
            },
            contato: {
                telefone: '(81) 3412-8000',
                email: 'contato@jcpm.com.br'
            },
            simples_nacional: {
                optante: false,
                data_opcao: null,
                data_exclusao: null
            },
            quadros_societarios: [
                { nome: 'João Carlos Paes Mendonça', qualificacao: 'Sócio-Administrador' }
            ],
            cnae: '6423-8/00',
            cnae_fiscal: '6423-8/00',
            inscricoes_estaduais: ['1234567-89'],
            inscricao_municipal: '12345678',
            telefone1: '(81) 3412-8000',
            telefone2: '(81) 3412-8001',
            site: 'www.jcpm.com.br',
            rede_social: '@jcpm',
            regime_tributario: 'Lucro Real',
            faturamento_anual: 'R$ 3,2 bilhões',
            numero_funcionarios: '8.000',
            matriz_filial: 'Matriz',
            codigo_municipio: '2611',
            codigo_uf: '26'
        }
    };

    // Se o CNPJ existir na base simulada, retorna os dados
    if (empresas[cnpj]) {
        return empresas[cnpj];
    }

    // Se não existir, retorna dados genéricos baseados no CNPJ com estados variados
    const estados = ['SP', 'RJ', 'MG', 'RS', 'BA', 'PE', 'CE', 'AM', 'DF', 'PR'];
    const cidades = {
        'SP': 'São Paulo',
        'RJ': 'Rio de Janeiro', 
        'MG': 'Belo Horizonte',
        'RS': 'Porto Alegre',
        'BA': 'Salvador',
        'PE': 'Recife',
        'CE': 'Fortaleza',
        'AM': 'Manaus',
        'DF': 'Brasília',
        'PR': 'Curitiba'
    };
    
    const estado = estados[Math.floor(Math.random() * estados.length)];
    
    return {
        cnpj: formatarCNPJ(cnpj),
        razao_social: `EMPRESA EXEMPLO ${estado} LTDA`,
        nome_fantasia: `Empresa ${estado}`,
        data_abertura: '01/01/2020',
        situacao_cadastral: 'Ativa',
        capital_social: '100.000,00',
        atividade_principal: 'Atividade principal não especificada',
        endereco: {
            logradouro: 'Av. Principal',
            numero: '1000',
            complemento: 'Sala 101',
            bairro: 'Centro',
            cidade: cidades[estado],
            estado: estado,
            cep: '00000-000'
        },
        contato: {
            telefone: `(${Math.floor(Math.random() * 10 + 10)}) 1234-5678`,
            email: `contato@empresa${estado}.com.br`
        }
    };
}
document.getElementById('cnpjInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        consultarCNPJ();
    }
});
