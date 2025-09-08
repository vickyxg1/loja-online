# Desafio Técnico Frontend Júnior - Loja de Ofertas

Este projeto foi desenvolvido para um desafio técnico de Frontend Júnior, implementando uma loja online com vitrine de produtos e sistema de ofertas.

## 🚀 Tecnologias Utilizadas

- **Next.js 13+** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **shadcn/ui** - Componentes de interface
- **Sonner** - Sistema de notificações (toasts)
- **Lucide React** - Ícones modernos
- **Context API + useReducer** - Gerenciamento de estado do carrinho
- **Jest + React Testing Library** - Testes unitários
- **FakeStore API** - API externa para dados de produtos

## 📋 Funcionalidades

### ✅ Requisitos Principais
- [x] Página `/ofertas` com vitrine de produtos
- [x] Banner no topo com imagem estática
- [x] Título "Ofertas da Semana" com tag `<h1>`
- [x] Vitrine com mínimo 6 produtos exibindo:
  - [x] Imagem com alt descritivo
  - [x] Nome do produto em `<h2>`
  - [x] Preço formatado em BRL
  - [x] Botão "Comprar" acessível
- [x] Consumo da API https://fakestoreapi.com/products
- [x] Layout responsivo
- [x] Componentes funcionais com React Hooks
- [x] Estrutura de código organizada

### ✅ SEO e Acessibilidade
- [x] Metatags otimizadas (title, description, og:image)
- [x] HTML semântico (header, main, section, footer)
- [x] Sitemap e robots.txt
- [x] Imagens com alt text
- [x] Botões acessíveis com aria-label
- [x] Contraste adequado de cores
- [x] Next/Image para otimização

### ✅ Testes
- [x] Configuração Jest + React Testing Library
- [x] Testes unitários para componentes
- [x] Testes para serviços de API
- [x] Mocks de fetch/API
- [x] Cobertura de casos básicos

### ✅ Extras Implementados
- [x] Filtros por categoria
- [x] Sistema de busca por texto
- [x] Sistema de ordenação (preço, avaliação, desconto, nome)
- [x] Responsividade aprimorada
- [x] Animações e micro-interações
- [x] Sistema de notificações (toast)
- [x] Loading states e skeleton screens
- [x] Error handling robusto
- [x] Carrinho de compras funcional
- [x] Context API para gerenciamento de estado global
- [x] Simulação de promoções e descontos
- [x] Badges de categoria e desconto
- [x] Contador de itens no carrinho
- [x] Modal de confirmação de compra
- [x] Persistência visual do estado do carrinho
- [x] Cálculo automático de totais e quantidades

## 🏗️ Estrutura do Projeto

```
├── app/                    # Next.js App Router
│   ├── ofertas/           # Página principal de ofertas
│   ├── carrinho/          # Página do carrinho de compras
│   ├── layout.tsx         # Layout raiz com SEO
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes shadcn/ui
│   ├── Banner.tsx        # Banner do topo
│   ├── Header.tsx        # Cabeçalho com navegação
│   ├── CartIcon.tsx      # Ícone do carrinho com contador
│   ├── ProductCard.tsx   # Card de produto
│   ├── ProductGrid.tsx   # Grid de produtos
│   └── ProductFilters.tsx # Filtros de produtos
├── contexts/             # Contextos React
│   └── CartContext.tsx   # Context para gerenciamento do carrinho
├── models/               # Tipos e interfaces TypeScript
│   └── Product.ts        # Modelo de produto
├── services/            # Serviços de API
│   └── productService.ts # Service para FakeStore API
├── utils/              # Funções utilitárias
│   └── formatters.ts   # Formatadores de dados
├── __tests__/          # Testes unitários
├── public/            # Arquivos estáticos
│   ├── robots.txt     # Configuração para crawlers
│   └── site.webmanifest # PWA manifest
└── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Executar em modo de desenvolvimento
npm run dev

# 3. Executar testes
npm test

# 4. Executar testes com coverage
npm run test:coverage

# 5. Build para produção
npm run build
```

O projeto estará disponível em `http://localhost:3000`

## 🧪 Testes

O projeto inclui uma suíte completa de testes:

- **Testes de Componentes**: Verificam renderização e interação
- **Testes de Serviços**: Validam chamadas de API
- **Testes de Utilitários**: Checam formatadores e helpers
- **Cobertura**: Meta de 70% de cobertura de código

```bash
npm test                 # Executar todos os testes
npm run test:watch      # Executar em modo watch
npm run test:coverage   # Executar com relatório de cobertura
```

## 📱 Responsividade

O design é totalmente responsivo com breakpoints:

- **Mobile**: < 768px (1 coluna)
- **Tablet**: 768px - 1024px (2 colunas)
- **Desktop**: 1024px+ (3-4 colunas)
- **Large Desktop**: 1536px+ (até 5 colunas)

## 🛒 Funcionalidades do Carrinho

- **Adição de Produtos**: Clique em "Comprar" para adicionar produtos ao carrinho
- **Gerenciamento de Quantidade**: Aumente/diminua quantidades diretamente no carrinho
- **Remoção de Itens**: Remova produtos individuais ou limpe todo o carrinho
- **Cálculo Automático**: Totais e subtotais calculados automaticamente
- **Persistência Visual**: Estado do carrinho mantido durante a navegação
- **Feedback Visual**: Notificações toast para ações do usuário
- **Simulação de Compra**: Modal de confirmação ao finalizar pedido

## 🎨 Design System

- **Cores**: Sistema de cores consistente com tons de azul, verde e neutros
- **Tipografia**: Inter font com hierarquia clara
- **Espaçamento**: Sistema baseado em 8px
- **Componentes**: shadcn/ui para consistência
- **Animações**: Micro-interações sutis, estados de hover e transições suaves
- **Estados**: Loading skeletons, empty states e feedback visual
- **Badges**: Sistema de badges para categorias e promoções
- **Toasts**: Notificações não-intrusivas com Sonner

## 🔍 SEO e Performance

- **Next.js Image**: Otimização automática de imagens
- **Metadata API**: SEO dinâmico por página
- **Sitemap**: Gerado automaticamente
- **Robots.txt**: Configurado para crawlers
- **Core Web Vitals**: Otimizado para performance

## 🚀 Deploy

O projeto está configurado para deploy na Vercel:

1. Configuração `output: 'export'` para build estático
2. Compatível com Vercel, Netlify e outros provedores
3. Build otimizado para produção com `npm run build`
4. Deploy automático via Git integration

## 📊 Lighthouse Score

O projeto foi otimizado para alcançar altas pontuações:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

## 🤝 Contribuição

Este é um projeto de desafio técnico, mas sugestões são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de avaliação técnica.