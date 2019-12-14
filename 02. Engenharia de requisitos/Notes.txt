# Engenharia de requisitos

- RF (requisitos funcionais) -> o que deve ser implementado
    Exemplo: gerar relatório de clientes
- RNF (requisitos não-funcionais) - como o RF deve ser implementado (restricoes de qualidade, confiabilidade, seguranca, etc)
    Exemplo: relatório deve ser emitido em até 5 segundos
- Regras de negócio: restrições que dependem de um negócio em particular
    Exemplo: não alugar imóvel para clientes com score abaixo de 600.


- Desafios na criação e manutenção de produtos de software:
    i) compreensão do domínio do problema
    ii) comunicação efetiva com reais usuários do produto
    iii) evolução contínua dos requisitos

## Desenvolvimento de Requisitos: cria e interpreta os requisitos
    1. Elicitação: identificação de forma proativa dos requisitos
        - Entrevistas
        - Questionários
        - Prototipação: técnica FAST (Facilitated Application Specification Techniques)
            - JAD (técnica desenvolvida pela IBM)
            - The Method (criada pela Performance Resources Inc.)
        - Brainstorming
    2. Análise: exame dos requisitos coletados e negociação com os envolvidos, caso haja requisitos conflitantes
        - Análise Estruturada: modelos que representam o fluxo e o conteúdo da informação (dados e controle)
            - Diagramas de fluxo de dados (DFDs)
            - Diagrama de Transição de Estado (DTE)
            - Dicionário de Dados
        - Análise Orientada a Objetos: modelar os conceitos (objetos) do domínio do produto, seus relacionamentos e comportamentos
            - Modelo de Casos de Uso e Cenários
            - Modelo de Classes
            - Diagramas de Sequência e de Atividade
            - Diagramas de Estados
    3. Especificação e modelagem de requisitos: documentação e criação de modelos dos requisitos com o propósito de obter uma melhor compreensão do problema a ser solucionado
        - RF e RNF de cada componente do produto são elaborados nos termos técnicos necessários para o desenvolvimento do produto e dos componentes do produto
        - RF podem ser descritos de muitas formas como, por exemplo: 
            - funções; 
            - opções do sistema;
            - ou ainda como serviços ou métodos Orientados a Objetos (OO)

    4. Validação: exame da especificação para garantir que inconsistências, omissões e ambiguidades tenham sido detectadas e corrigidas

P.S.: O processo Desenvolvimento de Requisitos propõe atividades para minimizar os riscos associados aos desafios (i) e (ii)


## Gerência de Requisitos: organiza, relaciona os requisitos entre si e com outros produtos de trabalho e mantém os registros destes requisitos.
    - gerencia todos os requisitos recebidos ou gerados pelo projeto (incluindo requisitos funcionais, não-funcionais e requisitos impostos ao projeto pela organização)
    - documentar as mudanças nos requisitos e suas justificativas
    - manter a rastreabilidade bidirecional entre os requisitos e produtos de trabalho em geral
    - estabelecer e manter um acordo entre o cliente e a equipe de projeto sobre os requisitos

 ### Rastreabilidade: grau em que o relacionamento pode ser estabelecido entre dois ou mais produtos de desenvolvimento de software, especialmente produtos que tenham uma relação de predecessor sucessor ou de mestre subordinado com outro;
    - rastreabilidade bidirecional: 
        - auxilia a determinar se todos os requisitos fonte foram completamente tratados e se todos os requisitos de mais baixo nível podem ser rastreados para uma fonte válida
    - rastreabilidade horizontal
        - estabelece a dependência entre os requisitos ou produtos de trabalho em um mesmo nível
            > Exemplo: rastreabilidade dos requisitos entre si ou rastreabilidade entre códigos de unidades dependentes
    - rastreabilidade vertical
        - estabelece uma rastreabilidade bidirecional desde um requisito fonte, passando pelos seus requisitos de mais baixo nível, até o nível de decomposição mais baixo do produto
            > Exemplo: códigos de unidade ou módulos do software
        - essencial para a realização da análise de impacto de mudanças de requisitos
            > Exemplo: identificar de que forma uma mudança de requisito impacta nos planos do projeto (estimativa, custo, tarefas, módulos do sistema, código, etc)
    - matriz de rastreabilidade: mapeia requisitos e módulos do sistema, podendo ir mais longe, até arquivos de código fontes

    P.S.: O responsável pela gerência do projeto é capaz de negociar com o cliente alterações nos planos do projeto para atender às solicitações de mudanças de requisitos e, ao mesmo tempo, minimizar os riscos do projeto (desvio de cronograma e custos)

 ### Aceite: após a avaliação dos requisitos, um registro de aceite dos requisitos deve ser obtido pelos fornecedores de requisitos.
 
 ### Avaliação: avaliação dos requisitos deve envolver, além do cliente, também, a equipe técnica da organização
    - comprometimento formal da equipe técnica com os requisitos deve ser obtido e registrado,
    - aconselhável que os requisitos sejam avaliados pela equipe técnica antes de serem submetidos para aprovação pelo cliente
        - evitar retrabalho ou a apresentação de um documento sem qualidade técnica adequada para o cliente
    - requisitos identificados podem ser avaliados com base em um conjunto de critérios objetivos:
        - possuir identificação única
        - estar claro e apropriadamente declarado
        - não ser ambíguo
        - ser relevante
        - ser completo
        - estar consistente com os demais requisitos
        - ser implementável
        - testável
        - rastreável

 ### Gestão de mudanças
    - mudanças devem ser registradas e um histórico das decisões acerca dos requisitos deve estar disponível
    - realização de análises de impacto da mudança
        - influência em outros requisitos
        - expectativa dos interessados
        - esforço
        - cronograma
        - riscos
        - custos
    - rastreabilidade bidirecional é um importante mecanismo para facilitar a análise de impacto

 ### Gerência de riscos
    - identificar, analisar, tratar, monitorar e reduzir continuamente os riscos 
        - nível organizacional
        - nível de projeto
    - gerência de riscos deve ser conduzida durante todo o período vigente das atividades ou projetos
    - fatores de risco
        - probabilidade de que o risco ocorra
        - perda ou impacto gerado pela consequência
        - grau que se pode mudar o resultado do risco
    - quantificação do risco (exposição ao risco): probabilidade x impacto
        - tratamento de risco
            - evitar (mitigando a probabilidade de ocorrer)
                - plano de mitigação (reduzir a probabilidade do risco ocorrer)
                - plano de contingência (o que fazer quando o risco se torna um fato)
            - assumir
            - transferir
    

P.S.: A combinação dos processos Gerência de Requisitos e Desenvolvimento de Requisitos objetiva minimizar os riscos causados pelo desafio (iii).