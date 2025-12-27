# qa.vibuim-ai.typescript

Projeto de automação de testes end-to-end (E2E) desenvolvido em TypeScript utilizando o framework Vibium para automação de testes web.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Dependências](#dependências)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Validações e Qualidade de Código](#validações-e-qualidade-de-código)
- [Como Usar](#como-usar)

## 🎯 Visão Geral

Este projeto implementa uma arquitetura baseada em Custom Commands para testes automatizados, utilizando TypeScript para type safety e o framework Vibium para interação com o navegador. O projeto segue princípios de Clean Code e Separation of Concerns, organizando o código em camadas bem definidas com abstrações reutilizáveis sobre o framework de automação.

## 🏗️ Arquitetura do Projeto

### Padrão Arquitetural

O projeto segue uma arquitetura em camadas com os seguintes componentes principais:

1. **Camada de Testes** (`tests/`)
   - Contém os arquivos de teste usando Mocha
   - Organizados por funcionalidade/feature
   - Seguem o padrão **Triple A** (Arrange, Act, Assert)
   - Estrutura: `describe` com nome do produto, `context` com funcionalidade

2. **Camada de Dados** (`data/`)
   - Centraliza dados de teste organizados por funcionalidade/feature
   - Cada arquivo contém objetos com dados específicos de cada caso de teste
   - Nomenclatura: `ct[numero]` para identificar casos de teste (ex: `ct001`)

3. **Camada de Componentes** (`components/`)
   - Centraliza os seletores CSS organizados por funcionalidade/feature
   - Cada componente possui:
     - `*.elements.ts`: Definição dos seletores CSS em objetos JavaScript
     - `*.interactions.ts`: (Opcional) Classes com métodos de interação reutilizáveis

4. **Camada Core** (`core/`)
   - Custom Commands reutilizáveis
   - Abstrações sobre o framework Vibium
   - Comandos customizados:
     - `BaseCustomCommand`: Navegação e controle do navegador
     - `ClickCustomCommand`: Abstração para cliques
     - `GetTextCustomCommand`: Abstração para obter textos
     - `ExpectCustomCommand`: Abstração para asserções

5. **Camada de Constantes** (`constants.ts`)
   - Centraliza instâncias compartilhadas
   - Exporta instância do Vibium browser
   - Exporta instâncias dos Custom Commands

### Fluxo de Execução

```
Teste (Mocha) 
  → Custom Commands (Core)
    → Vibium (Framework)
      → Navegador (Browser)
```

## 📁 Estrutura de Diretórios

```
qa.vibuim-ai.typescript/
├── components/              # Seletores organizados por funcionalidade
│   ├── login/
│   │   └── login.elements.ts    # Seletores CSS do componente de login
│   └── menu/
│       ├── menu.elements.ts     # Seletores CSS do componente de menu
│       └── menu.interactions.ts # (Opcional) Métodos de interação reutilizáveis
├── core/                   # Custom Commands e abstrações
│   ├── base.customCommand.ts      # Comandos base (navegação, etc)
│   ├── click.customCommand.ts     # Comandos de clique
│   ├── expect.customCommand.ts   # Comandos de asserção
│   └── getText.customCommand.ts  # Comandos para obter texto
├── data/                   # Dados de teste organizados por funcionalidade
│   └── login/
│       └── login.data.ts         # Dados dos casos de teste de login
├── tests/                  # Testes automatizados
│   └── login/
│       └── login.test.ts         # Testes de login
├── constants.ts            # Constantes e instâncias compartilhadas
├── .husky/                 # Hooks Git (Husky)
│   ├── pre-commit         # Validações antes do commit
│   ├── commit-msg         # Validação de mensagens de commit
│   └── pre-push           # Validações antes do push
├── .eslintrc.json         # Configuração ESLint
├── .lintstagedrc.json     # Configuração lint-staged
├── commitlint.config.js   # Configuração commitlint
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
└── README.md              # Documentação do projeto
```

## 📦 Dependências

### Dependências de Produção

| Dependência | Versão | Descrição |
|------------|--------|-----------|
| **@dotenvx/dotenvx** | ^1.51.2 | Gerenciamento de variáveis de ambiente de forma segura |
| **chai** | ^6.2.2 | Biblioteca de asserções para testes (BDD/TDD style) |
| **mocha** | ^11.7.5 | Framework de testes JavaScript/TypeScript |
| **vibium** | ^0.1.2 | Framework de automação de testes web |
| **zod** | ^4.2.1 | Biblioteca de validação de schemas TypeScript-first |

### Dependências de Desenvolvimento

| Dependência | Versão | Descrição |
|------------|--------|-----------|
| **@commitlint/cli** | ^19.0.0 | Validador de mensagens de commit (Conventional Commits) |
| **@commitlint/config-conventional** | ^19.0.0 | Configuração padrão para commitlint |
| **@types/chai** | ^5.0.1 | Definições de tipos TypeScript para Chai |
| **@types/mocha** | ^10.0.10 | Definições de tipos TypeScript para Mocha |
| **@types/node** | ^22.10.5 | Definições de tipos TypeScript para Node.js |
| **@typescript-eslint/eslint-plugin** | ^8.0.0 | Plugin ESLint para TypeScript |
| **@typescript-eslint/parser** | ^8.0.0 | Parser ESLint para TypeScript |
| **eslint** | ^8.57.0 | Linter JavaScript/TypeScript |
| **husky** | ^9.0.0 | Git hooks para automatizar tarefas |
| **lint-staged** | ^15.0.0 | Executa linters apenas em arquivos staged |
| **ts-node** | ^10.9.2 | Executor TypeScript para Node.js (permite executar .ts diretamente) |
| **typescript** | ^5.7.2 | Compilador TypeScript |

### Detalhamento das Dependências Principais

#### Vibium (^0.1.2)
- **Função**: Framework principal de automação de testes web
- **Uso no projeto**: Utilizado para controlar o navegador, encontrar elementos, clicar, obter textos, etc.
- **Exemplo de uso**: `vibe.find(selector).click()`, `vibe.go(url)`
- **Requisito**: Requer Chrome/Chromium instalado no sistema (instalado automaticamente no CI/CD via `browser-actions/setup-chrome@v2`)

#### Mocha (^11.7.5)
- **Função**: Framework de testes que fornece estrutura para organizar e executar testes
- **Uso no projeto**: Estrutura de testes com `describe`, `context`, `it`, `before`, `after`
- **Características**: Suporta testes assíncronos, hooks, e relatórios detalhados

#### Chai (^6.2.2)
- **Função**: Biblioteca de asserções para validações em testes
- **Uso no projeto**: Utilizado no `ExpectCustomCommand` para fazer asserções
- **Estilo**: BDD style (`.to.contain()`, `.to.equal()`, etc.)

#### TypeScript (^5.7.2)
- **Função**: Superset do JavaScript com tipagem estática
- **Uso no projeto**: Todo o código é escrito em TypeScript para type safety
- **Configuração**: `tsconfig.json` com configurações strict mode

#### @dotenvx/dotenvx (^1.51.2)
- **Função**: Carrega variáveis de ambiente de arquivos `.env`
- **Uso no projeto**: Utilizado para carregar configurações como `BASE_URL` e `PRODUCT_NAME`
- **Segurança**: Suporta variáveis criptografadas

## ⚙️ Configuração

### Pré-requisitos

- **Node.js** (versão compatível com TypeScript 5.7.2)
- **npm** ou **yarn**
- **Chrome/Chromium** instalado no sistema (para execução local dos testes)

### Instalação

```bash
npm install
```

**Nota**: O script `prepare` será executado automaticamente após `npm install`, inicializando o Husky e configurando os hooks Git. Consulte `INSTALACAO.md` para mais detalhes.

### Instalação do Navegador (Desenvolvimento Local)

Para executar os testes localmente, é necessário ter o **Chrome** ou **Chromium** instalado:

#### macOS
```bash
# Usando Homebrew
brew install --cask google-chrome
# ou
brew install chromium
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install -y chromium chromium-chromedriver
```

#### Windows
- Baixe e instale o [Google Chrome](https://www.google.com/chrome/)
- Ou instale o [Chromium](https://www.chromium.org/getting-involved/download-chromium)

**Nota**: No CI/CD (GitHub Actions), o Chrome é instalado automaticamente pela action `browser-actions/setup-chrome@v2`.

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
BASE_URL=https://exemplo.com
PRODUCT_NAME=Nome do Produto
HEADLESS=true  # Opcional: true para modo headless, false para ver o navegador
```

## 🔄 CI/CD - GitHub Actions

O projeto utiliza **GitHub Actions** para automação de integração contínua (CI). A pipeline executa automaticamente validações e testes em cada push e pull request.

### Pipeline de CI

A pipeline de CI (`/.github/workflows/ci.yml`) executa:

1. **Lint e Verificação de Tipos**:
   - ✅ Validação de código com ESLint
   - ✅ Verificação de tipos TypeScript

2. **Testes**:
   - ✅ Instala Chrome automaticamente usando `browser-actions/setup-chrome@v2`
   - ✅ Execução de todos os testes automatizados
   - ✅ Testa em múltiplas versões do Node.js (20.x e 22.x)

### Configuração de Secrets

Para que os testes funcionem corretamente no GitHub Actions, configure os seguintes **Secrets** no repositório:

1. Acesse: **Settings** → **Secrets and variables** → **Actions**
2. Adicione os secrets:

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `BASE_URL` | URL base da aplicação a ser testada | `https://automationexercise.com` |
| `PRODUCT_NAME` | Nome do produto sendo testado | `Automation Exercise` |

**Nota**: Se os secrets não estiverem configurados, valores padrão serão usados.

### Quando a Pipeline Executa

- ✅ Push para branches: `main`, `master`, `develop`
- ✅ Pull Requests para essas branches
- ✅ Execução manual via GitHub Actions UI

Para mais detalhes, consulte [`.github/workflows/README.md`](.github/workflows/README.md).

## 🛡️ Validações e Qualidade de Código

O projeto utiliza **Husky** para garantir qualidade e consistência do código através de hooks Git automatizados. Todas as validações são executadas automaticamente antes de commits e pushes.

### Hooks Configurados

#### 🔍 pre-commit
Executado automaticamente antes de cada commit:
- ✅ Valida e corrige código com **ESLint** (apenas arquivos staged)
- ✅ Verifica tipos TypeScript (`type-check`)

#### 📝 commit-msg
Valida a mensagem de commit seguindo o padrão **Conventional Commits**:
- ✅ Formato obrigatório: `tipo(escopo opcional): descrição`
- ✅ Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`

**Exemplos de commits válidos:**
```bash
feat: adiciona novo teste de login
fix: corrige erro de validação no menu
test: adiciona testes para componente de login
docs: atualiza documentação do projeto
refactor: melhora estrutura de custom commands
chore: atualiza dependências
```

**Exemplos de commits inválidos:**
```bash
adiciona teste          # ❌ Falta tipo
fix bug                 # ❌ Falta dois pontos
teste                   # ❌ Formato incorreto
```

#### 🚀 pre-push
Executado automaticamente antes de cada push:
- ✅ Valida código com **ESLint** em todo o projeto
- ✅ Verifica tipos TypeScript (`type-check`)

### Como Funciona

1. **Ao fazer commit**: O código é validado automaticamente (lint-staged + type-check)
2. **Se houver erros**: O commit é bloqueado até que sejam corrigidos
3. **Ao fazer push**: O código é validado novamente (lint + type-check) antes do push

### Pular Validações (Não Recomendado)

Se precisar pular as validações (apenas em casos excepcionais):

```bash
# Pular pre-commit
git commit --no-verify -m "mensagem"

# Pular pre-push
git push --no-verify
```

⚠️ **Atenção**: Use apenas em casos excepcionais e com conhecimento do impacto.

### Ferramentas de Qualidade

- **ESLint**: Validação de código TypeScript/JavaScript
- **TypeScript**: Verificação de tipos em tempo de compilação
- **Commitlint**: Validação de mensagens de commit (Conventional Commits)
- **lint-staged**: Executa validações apenas em arquivos modificados (otimização de performance)

### Documentação Adicional

Para mais detalhes sobre configuração e troubleshooting, consulte:
- `.husky/README.md` - Documentação dos hooks Git
- `docs/HUSKY_SETUP.md` - Guia completo de configuração do Husky

## 🚀 Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **test** | `npm test` | Executa todos os testes usando dotenvx para carregar variáveis de ambiente |
| **lint** | `npm run lint` | Executa ESLint para validar o código |
| **lint:fix** | `npm run lint:fix` | Executa ESLint e corrige problemas automaticamente |
| **type-check** | `npm run type-check` | Verifica tipos TypeScript sem gerar arquivos |

### Exemplo de Execução

```bash
# Executar todos os testes
npm test

# Validar código
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Verificar tipos
npm run type-check

## 💻 Como Usar

### Padrão de Teste Triple A

Os testes seguem o padrão **Triple A** (Arrange, Act, Assert):

- **Arrange**: Preparação do ambiente e dados necessários
- **Act**: Execução da ação a ser testada
- **Assert**: Validação do resultado esperado

### Estrutura de Testes

A estrutura dos testes segue o padrão:

- **`describe`**: Nome do produto (usando `process.env.PRODUCT_NAME`)
- **`context`**: Funcionalidade que será testada (ex: "Login/Signup")
- **`it`**: Caso de teste específico com identificação `[CT-XXX]`

### Casos de Teste

Todos os casos de teste criados no projeto estão documentados e organizados no [Board de Casos de Teste do GitHub](https://github.com/users/qajonatasmartins/projects/8). O board contém:

- Lista completa de todos os casos de teste
- Status de cada caso de teste
- Organização por funcionalidade/feature
- Rastreamento de implementação

Consulte o board para visualizar todos os casos de teste disponíveis e seus status.

### Criando um Novo Teste

1. **Criar seletores** em `components/[feature]/[feature].elements.ts`:
```typescript
export const loginComponents = {
    txtTitleLoginForm: ".login-form h2"
}
```

2. **Criar dados de teste** em `data/[feature]/[feature].data.ts`:
```typescript
export const ct001 = {
    titleLoginForm: "Login to your account"
}
```

3. **Criar teste** em `tests/[feature]/[feature].test.ts`:
```typescript
import {
    baseCustomCommand, clickCustomCommand,
    expectCustomCommand, getTextCustomCommand
} from "../../constants";
import { menuComponents } from "../../components/menu/menu.elements";
import { loginComponents } from "../../components/login/login.elements";
import { ct001 } from "../../data/login/login.data";

describe(`${process.env.PRODUCT_NAME}`, () => {

    context(`${process.env.PRODUCT_NAME} - Login/Signup`, () => {

        before('Navigate to the login page', async () => {
            await baseCustomCommand.navigateTo(process.env.BASE_URL!)
        })

        it(`[CT-001] - Login/Signup - Validate title login form`, async () => {
            // Arrange: Preparação (se necessário)
            
            // Act: Execução da ação
            await clickCustomCommand.click(menuComponents.btnSignupLoginMenu)
            
            // Assert: Validação
            await expectCustomCommand.expect(
                ct001.titleLoginForm, 
                await getTextCustomCommand.getText(loginComponents.txtTitleLoginForm)
            )
        })

        after('Finish test execution', async () => {
            await baseCustomCommand.finishTestExecution()
        })
    })
})
```

**Nota**: Os testes utilizam diretamente os Custom Commands com os seletores definidos nos arquivos `*.elements.ts` e dados dos arquivos `*.data.ts`. Não é necessário criar classes Page Object - a abstração é feita através dos Custom Commands.

### Usando Custom Commands

O projeto fornece Custom Commands reutilizáveis:

- **`baseCustomCommand.navigateTo(url)`**: Navega para uma URL
- **`baseCustomCommand.finishTestExecution()`**: Fecha o navegador
- **`clickCustomCommand.click(selector)`**: Clica em um elemento
- **`getTextCustomCommand.getText(selector)`**: Obtém o texto de um elemento
- **`expectCustomCommand.expect(expected, actual)`**: Faz uma asserção

### Gerenciando Dados de Teste

Os dados de teste são organizados na pasta `data/` seguindo a mesma estrutura de funcionalidades:

- Cada arquivo `*.data.ts` contém objetos exportados com dados específicos
- Nomenclatura: `ct[numero]` para identificar cada caso de teste
- Exemplo:

```typescript
// data/login/login.data.ts
export const ct001 = {
    titleLoginForm: "Login to your account"
}

export const ct002 = {
    email: "test@example.com",
    password: "password123"
}
```

Isso permite centralizar os dados de teste e facilitar a manutenção, além de separar dados de lógica de teste.

## 🔧 Configuração TypeScript

O projeto utiliza TypeScript com configurações strict mode ativadas:

- **Target**: ES2020
- **Module**: CommonJS
- **Strict Mode**: Ativado (inclui `strictNullChecks`, `noImplicitAny`, etc.)
- **Source Maps**: Ativado para debugging
- **Type Definitions**: Inclui tipos para Mocha, Chai e Node.js

## 📝 Convenções de Código

### Nomenclatura
- **Classes**: PascalCase (ex: `BaseCustomCommand`)
- **Arquivos**: camelCase (ex: `base.customCommand.ts`)
- **Constantes**: camelCase (ex: `baseCustomCommand`)
- **Dados de teste**: `ct[numero]` (ex: `ct001`, `ct002`)

### Organização
- Separação clara entre seletores (components), dados (data), Custom Commands (core) e testes
- Cada funcionalidade possui sua própria pasta com elementos e dados

### Estrutura de Testes
- **`describe`**: Nome do produto (`process.env.PRODUCT_NAME`)
- **`context`**: Funcionalidade a ser testada
- **`it`**: Caso de teste com identificação `[CT-XXX]`

### Padrão de Teste
- **Triple A** (Arrange, Act, Assert)

### Mensagens de Commit
- **Formato**: `tipo(escopo opcional): descrição`
- **Tipos**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`
- **Exemplo**: `feat: adiciona novo teste de login`

### Documentação
- JSDoc nos métodos públicos dos Custom Commands
- README.md atualizado com todas as mudanças significativas

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças seguindo o padrão Conventional Commits:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Regras de Contribuição

- ✅ Todos os commits devem seguir o padrão **Conventional Commits**
- ✅ O código deve passar nas validações do ESLint
- ✅ O código deve passar na verificação de tipos TypeScript
- ✅ Documente mudanças significativas no README.md

## 📄 Licença

ISC

## 🔗 Links Úteis

- [Repositório GitHub](https://github.com/qajonatasmartins/qa.vibuim-ai.typescript)
- [Board de Casos de Teste](https://github.com/users/qajonatasmartins/projects/8) - Contém todos os casos de teste criados no projeto
- [Issues](https://github.com/qajonatasmartins/qa.vibuim-ai.typescript/issues)
