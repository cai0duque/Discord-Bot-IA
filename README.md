# Bot IA no Discord

- Este repositório contém um código-base em JS para a criação de um bot no [Discord](<https://discord.com/developers/applications>), com integração à IA (nesse caso, [Chat-GPT](<https://platform.openai.com/settings/profile?tab=api-keys>));
- Você pode fazer quaisquer alterações e incrementações que desejar em seu próprio bot a partir deste código;
- Este bot está em desenvolvimento e ainda não contém uma estruturação completa para uso Global (público), significa que ele ainda não é ideal para ser um bot público e grande no Discord;

# Objetivos

- Estudos sobre integrações de APIs e comportamento das IAs;
- Desenvolver um Bot bem estruturado no Discord;
- Aprofundamento nos conhecimentos sobre a linguagem JS, Back-End com Node.JS, dependências, etc;

---

# Guia de Instalação

- Caso queira replicar o código direto ao ponto para iniciar sua pr´pria personalização, prossiga com os passos.

# Requisitos

- **Node.js** versão **18** ou superior;
- **npm** (geralmente instalado junto com o Node.js);
- Uma conta na **OpenAI** para obter uma chave de API (Sujeito a custos, pois o uso da API não é gratuita no caso da OpenAI);
- Um bot do **Discord** criado no [Portal do Desenvolvedor do Discord](<https://discord.com/developers/applications>);

---

# 1= Instalar o Node.js

- Caso você ainda não tenha o Node.js instalado:

- **Windows:**

A= Acesse o site oficial do Node.js: [https://nodejs.org/](<https://nodejs.org/>);
B= Baixe o instalador **LTS (Long Term Support)** recomendado;
C= Execute o instalador e siga as instruções na tela;
D= Verifique a instalação abrindo o **Prompt de Comando** e digitando:

   ```bash
   node -v
   npm -v
   ```

   As versões instaladas do Node.js e npm serão mostradas, em caso do sucesso da instalação.

- **macOS:**

A= Você pode instalar o Node.js via **Homebrew** ou baixando o instalador.

   **Via Homebrew:**

   ```bash
   brew install node
   ```

   **Via Instalador:**

   - Baixe o instalador LTS em [https://nodejs.org/](https://nodejs.org/)
   - Execute o instalador e siga as instruções.

B= Verifique a instalação no **Terminal**:

   ```bash
   node -v
   npm -v
   ```

- **Linux:**

A= Use o gerenciador de pacotes da sua distribuição ou o instalador oficial.

   **Debian/Ubuntu:**

   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

- **Para versões mais recentes:**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

B= Verifique a instalação:

   ```bash
   node -v
   npm -v
   ```

---

# 2= Clonar o Repositório

- Clone este repositório:

```bash
git clone https://github.com/cai0duque/Discord-Bot-IA.git
```

# 3= Navegar até o Diretório do Projeto

- Entre no diretório do arquivo clonado (ou da pasta onde você selecionou para clonar o repositório):

```bash
cd pasta-onde-estiver-o-clone
```

# 4= Instalar as Dependências do Projeto

- Execute o comando abaixo para instalar todas as dependências necessárias listadas no `package.json`:

```bash
npm install
```

- Isso instalará pacotes como `discord.js`, `openai`, `dotenv`.

# 5= Token e APi KEY

- Crie um arquivo .env na raiz do projeto para armazenar suas chaves de API:

```bash
Copiar código
touch .env
```

- No arquivo .env, adicione as seguintes linhas:
```env
DISCORD_BOT_TOKEN=SEU_TOKEN_DO_DISCORD
OPENAI_API_KEY=SUA_CHAVE_DE_API_DA_OPENAI
```

DISCORD_BOT_TOKEN: O token do seu bot do Discord. Você pode obtê-lo no [Discord Developer Portal](<https://discord.com/developers/applications>);
OPENAI_API_KEY: Sua chave de API da OpenAI. Você pode obtê-la em [OpenAI API Keys](<https://platform.openai.com/api-keys>);

# 6= Executar o Bot e deixar ele Online:

- Você pode iniciar o bot com o seguinte comando:

```bash
node index.js
```

- Você deverá ver uma mensagem no console indicando que o bot está online:

```
Logged in as SeuBot#1234!
```

# 7= Testar o Bot

- **No Discord**, vá até o servidor onde o bot está presente;
- **Mencione o bot** e envie uma mensagem para ver se ele responde;
- **Use os comandos** que você criou, caso tenha criado, para testar;

---

# Referências

- **Documentação do Discord.js**: [discord.js.org](https://discord.js.org/#/docs/discord.js/main/general/welcome)
- **Documentação da OpenAI API**: [OpenAI API Reference](https://platform.openai.com/docs/api-reference/introduction)
- **Node.js ESM**: [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html)
