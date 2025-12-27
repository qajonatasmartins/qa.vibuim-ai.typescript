# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions para automação de CI/CD do projeto.

## Workflows Disponíveis

### CI (`ci.yml`)

Pipeline de integração contínua que executa:

1. **Lint e Verificação de Tipos** (job separado):
   - Executa ESLint para validar o código
   - Verifica tipos TypeScript

2. **Testes** (executado após lint passar):
   - Instala Chrome automaticamente usando `browser-actions/setup-chrome`
   - Executa todos os testes do projeto
   - Testa em múltiplas versões do Node.js (20.x e 22.x)

## Configuração

### Variáveis de Ambiente (Secrets)

O workflow precisa das seguintes variáveis de ambiente. Configure-as como **Secrets** no GitHub:

1. Acesse: **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Adicione os seguintes secrets:

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `BASE_URL` | URL base da aplicação a ser testada | `https://automationexercise.com` |
| `PRODUCT_NAME` | Nome do produto sendo testado | `Automation Exercise` |

### Valores Padrão

Se os secrets não estiverem configurados, o workflow usará valores padrão:
- `BASE_URL`: `https://automationexercise.com`
- `PRODUCT_NAME`: `Automation Exercise`

⚠️ **Importante**: Configure os secrets com os valores corretos para seu ambiente de testes.

## Quando o Workflow é Executado

O workflow `ci.yml` é executado automaticamente quando:

- ✅ Push para branches: `main`, `master`, `develop`
- ✅ Pull Requests para branches: `main`, `master`, `develop`
- ✅ Execução manual via GitHub Actions UI (workflow_dispatch)

## Estrutura dos Jobs

```
lint-and-type-check (sempre executa primeiro)
    ↓
test (executa após lint passar)
    ├── Node.js 20.x
    └── Node.js 22.x
```

## Artifacts

Os resultados dos testes são salvos como artifacts e ficam disponíveis por 7 dias:
- Acesse a aba **Actions** no GitHub
- Clique na execução do workflow
- Baixe os artifacts em **Artifacts**

## Troubleshooting

### Testes falhando

1. Verifique se os secrets estão configurados corretamente
2. Verifique se a URL base está acessível
3. Verifique se o Chrome foi instalado corretamente (a action `browser-actions/setup-chrome` faz isso automaticamente)
4. Verifique os logs do workflow para mais detalhes

### Chrome/Navegador

O Chrome é instalado automaticamente pela action `browser-actions/setup-chrome@v2`, que:
- Instala a versão mais recente do Chrome
- Configura todas as dependências necessárias
- Funciona em modo headless por padrão (via variável `HEADLESS=true`)

### Lint falhando

1. Execute `npm run lint:fix` localmente
2. Commit as correções
3. Push novamente

### Type-check falhando

1. Execute `npm run type-check` localmente
2. Corrija os erros de tipo
3. Commit as correções

