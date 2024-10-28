export const navigations = [
  {
    name: "Dashboard",
    description: "Acesso ao painel de controle.",
    type: "dropDown",
    icon: "i-Bar-Chart", // Ícone para o menu principal "Dashboard"
    sub: [
      {
        icon: "i-Line-Chart",
        name: "Geral",
        path: "/dashboard/geral",
        type: "link",
      },
      // {
      //   icon: "i-Line-Chart",
      //   name: "Metricas",
      //   path: "/dashboard/metricas",
      //   type: "link",
      // },
      // { icon: "i-Bar-Chart-2", name: "Vendas", path: "/dashboard/vendas", type: "link" },
      // { icon: "i-Money-Bag", name: "Financeiro", path: "/dashboard/financeiro", type: "link" },
      // { icon: "i-Bar-Chart-3", name: "Produção", path: "/dashboard/producao", type: "link" },
      // { icon: "i-Shopping-Cart", name: "Compras", path: "/dashboard/compras", type: "link" },
      // { icon: "i-Receipt", name: "Fiscal", path: "/dashboard/fiscal", type: "link" },
      // { icon: "i-Calculator-2", name: "Contabilidade", path: "/dashboard/contabilidade", type: "link" }
    ],
  },
  {
    name: "Vendas",
    description: "Controle de vendas.",
    type: "dropDown",
    icon: "i-Shopping-Cart", // Ícone para o menu principal "Vendas"
    sub: [
      {
        icon: "i-Receipt-3",
        name: "Propostas",
        path: "/vendas/pedidos",
        type: "link",
      },
      /*  { icon: "i-Credit-Card", name: "Liberações E Análise De Crédito", path: "/vendas/creditos", type: "link" } */
    ],
  },
   {
    name: "Cadastros",
    description: "Gerenciamento de cadastros.",
    type: "dropDown",
    icon: "i-Business-Mens",  // Atualizado para icone "iconsmind"
    sub: [
      /*{ icon: "i-Business-Mens", name: "Empresas E Pessoas", path: "/cadastros/empresas-pessoas", type: "link" },*/
      { icon: "i-Box-Full", name: "Produtos E Serviços", path: "/cadastros/produtos-servicos", type: "link" },
      { icon: "i-Box-Full", name: "Categorias", path: "/cadastros/categorias", type: "link" },
        { icon: "i-Shopping-Cart", name: "Categorias Mercado livre", path: "/cadastros/categorias-meli", type: "link" },
      /*{ icon: "i-Newspaper", name: "Jornal", path: "/cadastros/jornal", type: "link" }*/
    ]
  }, 
  // {
  //   name: "Estoque",
  //   description: "Gestão de estoque.",
  //   type: "dropDown",
  //   icon: "i-Folder", // Ícone disponível na lista para o menu "Estoque"
  //   sub: [
  //     /*  { icon: "i-Folder", name: "Estoque", path: "/estoque/estoque", type: "link" },
  //     { icon: "i-Add-File", name: "Alocação E Armazenagem", path: "/estoque/alocacao", type: "link" },
  //     { icon: "i-Tag-2", name: "Garantias E Base Instalada", path: "/estoque/garantias", type: "link" }, */
  //     {
  //       icon: "i-Arrow-Right-in-Circle",
  //       name: "Picking",
  //       path: "/estoque/picking",
  //       type: "link",
  //     },
  //     // { icon: "i-Globe", name: "Supply Chain", path: "/estoque/supplychain", type: "link" },
  //     // { icon: "i-Align-Justify-All", name: "Ajustes Internos", path: "/estoque/ajustes", type: "link" },
  //     // { icon: "i-Box-Full", name: "Lote", path: "/estoque/lote", type: "link" }
  //   ],
  // },
  {
    name: "Expedição",
    description: "Expedição de pedidos.",
    type: "dropDown",
    icon: "i-Checkout", // Ícone disponível na lista para o menu "Estoque"
    sub: [
      /*  { icon: "i-Folder", name: "Estoque", path: "/estoque/estoque", type: "link" },
      { icon: "i-Add-File", name: "Alocação E Armazenagem", path: "/estoque/alocacao", type: "link" },
      { icon: "i-Tag-2", name: "Garantias E Base Instalada", path: "/estoque/garantias", type: "link" }, */
      // {
      //   icon: "i-Checkout-Bag",
      //   name: "Checkout",
      //   path: "/expedicao/expedicao",
      //   type: "link",
      // },
      {
        icon: "i-Receipt-3",
        name: "Pedidos",
        path: "/vendas/propostas",
        type: "link",
      },
      {
        icon: "i-Files",
        name: "Estamparia",
        path: "/expedicao/estamparia",
        type: "link",
      },
      {
        icon: "i-Folder",
        name: "Conferencia",
        path: "/expedicao/conferencia",
        type: "link",
      },
      {
        icon: "i-Files",
        name: "Despachados",
        path: "/expedicao/despacho",
        type: "link",
      },
      /*  { icon: "i-Files", name: "Inventário", path: "/estoque/inventario", type: "link" },
      { icon: "i-Globe", name: "Supply Chain", path: "/estoque/supplychain", type: "link" },
      { icon: "i-Align-Justify-All", name: "Ajustes Internos", path: "/estoque/ajustes", type: "link" },
      { icon: "i-Box-Full", name: "Lote", path: "/estoque/lote", type: "link" } */
    ],
  },
  /* {
  name: "Produção",
  description: "Gerenciamento da produção.",
  type: "dropDown",
  icon: "i-Box-Full",  // Ícone para o menu principal "Produção"
  sub: [
    { icon: "i-Cube-Molecule-2", name: "Industrialização", path: "/producao/industrializacao", type: "link" },
    { icon: "i-File-Clipboard-File--Text", name: "Ordens De Produção", path: "/producao/ordens", type: "link" },
    { icon: "i-Calendar-4", name: "Programação Da Produção", path: "/producao/programacao", type: "link" },
    { icon: "i-Files", name: "Apontamento De Produção", path: "/producao/apontamento", type: "link" },
    { icon: "i-Engineering", name: "Recursos E Manutenção", path: "/producao/recursos", type: "link" }
  ]
},
{
  name: "Qualidade",
  description: "Controle de qualidade.",
  type: "dropDown",
  icon: "i-Check",  // Ícone já definido para o menu principal "Qualidade"
  sub: [
    { icon: "i-Medal-2", name: "Instrumentos De Medição", path: "/qualidade/instrumentos", type: "link" },
    { icon: "i-Warning-Window", name: "Não Conformidade", path: "/qualidade/nao-conformidade", type: "link" },
    { icon: "i-Flag-2", name: "Quarentena", path: "/qualidade/quarentena", type: "link" }
  ]
},
  {
    name: "Compras",
    description: "Gestão de compras.",
    type: "dropDown",
    icon: "i-Shopping-Cart",  // Atualizado para icone "iconsmind"
    sub: [
      { icon: "i-File-Clipboard-File--Text", name: "Solicitações", path: "/compras/solicitacoes", type: "link" },
      { icon: "i-File-Horizontal-Text", name: "Pedidos", path: "/compras/pedidos", type: "link" },
      { icon: "i-Download", name: "Recebimento", path: "/compras/recebimento", type: "link" },
      { icon: "i-Bar-Chart", name: "Recebimento De NFe", path: "/compras/recebimentonfe", type: "link" },
      { icon: "i-Receipt-3", name: "Recebimento Físico", path: "/compras/recebimentofisico", type: "link" }
    ]
  },
  {
    name: "Fiscal",
    description: "Controle fiscal.",
    type: "dropDown",
    icon: "i-Receipt",  // Ícone para o menu principal "Fiscal"
    sub: [
      { icon: "i-Receipt", name: "Faturamento De Produtos", path: "/fiscal/faturamento", type: "link" },
      { icon: "i-File-Horizontal-Text", name: "Entradas", path: "/fiscal/entradas", type: "link" },
      { icon: "i-Arrow-Right-in-Circle", name: "Remessa E Retorno", path: "/fiscal/remessa", type: "link" },
      { icon: "i-Medal-2", name: "Serviços Tomados", path: "/fiscal/servicos", type: "link" },
      { icon: "i-Mail", name: "Gerenciador De NFe", path: "/fiscal/gerenciador", type: "link" },
      { icon: "i-Calculator-2", name: "Impostos", path: "/fiscal/impostos", type: "link" },
      { icon: "i-Globe", name: "FCI", path: "/fiscal/fci", type: "link" },
      { icon: "i-Building", name: "Ativos Imobilizados", path: "/fiscal/ativos", type: "link" },
      { icon: "i-Cloud", name: "SPED", path: "/fiscal/sped", type: "link" }
    ]
},
{
  name: "Operacional",
  description: "Gestão operacional.",
  type: "dropDown",
  icon: "i-Support",  // Ícone para o menu principal "Operacional"
  sub: [
    { icon: "i-Support", name: "Chamados", path: "/operacional/chamados", type: "link" }
  ]
},
{
  name: "Financeiro",
  description: "Gestão financeira.",
  type: "dropDown",
  icon: "i-Money-Bag",  // Ícone para o menu principal "Financeiro"
  sub: [
    { icon: "i-Receipt-3", name: "Receitas e Despesas", path: "/financeiro/receitas", type: "link" },
    { icon: "i-Coins", name: "Movimentações Bancárias", path: "/financeiro/movimentacoes", type: "link" },
    { icon: "i-Line-Chart", name: "Centros de Custo", path: "/financeiro/centros", type: "link" },
    { icon: "i-Line-Chart-2", name: "Fluxo de Caixa", path: "/financeiro/fluxo", type: "link" }
  ]
},
{
  name: "Contabilidade",
  description: "Gestão contábil.",
  type: "dropDown",
  icon: "i-Calculator-2",  // Ícone para o menu principal "Contabilidade"
  sub: [
    { icon: "i-Receipt-3", name: "Lançamentos Contábeis", path: "/contabilidade/lancamentos", type: "link" },
    { icon: "i-File-Horizontal-Text", name: "Razão Contábil", path: "/contabilidade/razao", type: "link" },
    { icon: "i-File-Clipboard-File--Text", name: "Balancete Contábil", path: "/contabilidade/balancete", type: "link" },
    { icon: "i-Line-Chart", name: "DRE Contábil", path: "/contabilidade/dre", type: "link" }
  ]
},
{
  name: "Relatórios",
  description: "Relatórios gerenciais e operacionais.",
  type: "dropDown",
  icon: "i-File-Chart",  // Ícone para o menu principal "Relatórios"
  sub: [
    { icon: "i-Line-Chart", name: "Relatórios de Produção", path: "/relatorios/producao", type: "link" },
    { icon: "i-Line-Chart-2", name: "Relatórios Financeiros", path: "/relatorios/financeiro", type: "link" },
    { icon: "i-File-Horizontal-Text", name: "Relatórios de Compras", path: "/relatorios/compras", type: "link" },
    { icon: "i-Receipt", name: "Relatórios Fiscais", path: "/relatorios/fiscal", type: "link" },
    { icon: "i-Bar-Chart-4", name: "Relatórios de Qualidade", path: "/relatorios/qualidade", type: "link" },
    { icon: "i-Billing", name: "Relatórios Operacionais", path: "/relatorios/operacional", type: "link" }
  ]
},*/
{
  name: "Adm. e Configuração",
  description: "Administração e configurações do sistema.",
  type: "dropDown",
  icon: "i-Gears",  // Ícone para o menu principal "Adm. e Configuração"
  sub: [
    { icon: "i-Business-Man", name: "Integrações de Usuário", path: "/administracao/integracoes", type: "link" },
    { icon: "i-Support", name: "Pedidos não processados", path: "/administracao/error", type: "link" },
    // { icon: "i-Business-Man", name: "Funcionários", path: "/administracao/funcionarios", type: "link" },
    // { icon: "i-File-Clipboard-File--Text", name: "Tarefas do Servidor", path: "/administracao/tarefas", type: "link" },
    // { icon: "i-Cube-Molecule-2", name: "Entidades e Propriedades", path: "/administracao/entidades", type: "link" },
    // { icon: "i-Mail", name: "Gerenciador de Emails", path: "/administracao/gerenciador", type: "link" },
    // { icon: "i-Line-Chart-2", name: "Metas", path: "/administracao/metas", type: "link" }
  ]
} 
];
