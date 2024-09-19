import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const userConversations = new Map();

async function generateResponse(userId, prompt) {
  try {
    let conversation = userConversations.get(userId) || [];

    conversation.push({ role: 'user', content: prompt });

    if (conversation.length > 10) {
      conversation = conversation.slice(conversation.length - 10);
    }
               //No bloco abaixo, você pode personalizar alguma característica da IA, dar instruções específicas do comportamento dela, bem como definir alguma personalidade propriamente dita. Quanto mais detalhar, mais "polida" será.
               //Você não necessariamente precisa customizar ela, caso não queira adicionar essa customização. Se for o caso, basta deixar esse bloco vazio.
               //O bloco system pode ser acessado também na Dashboard da OpenAI.
    const systemMessage = {
      role: 'system',
      content: `
               
        `.trim(),
    };

    const messages = [systemMessage, ...conversation];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', //Aqui você escolhe qual modelo do GPT você irá integrar com a sua API. Lembrando que você precisa ter acesso ao modelo que deseja utilizar, e você pode verificar isso no site da Dashboard OpenAI
      messages: messages,
    });

    const response = completion.choices[0].message.content.trim();

    conversation.push({ role: 'assistant', content: response });
    userConversations.set(userId, conversation);

    return response;
  } catch (error) {
    console.error('Erro ao gerar resposta da OpenAI:', error);

    if (error.status === 429) {
      return 'Desculpe, estamos atingindo o limite de requisições. Por favor, tente novamente mais tarde.';
    } else if (error.status === 401) {
      return 'Desculpe, houve um problema de autenticação com a API.';
    } else if (error.status === 404 && error.message.includes('does not exist')) {
      return 'Desculpe, o modelo especificado não está disponível.';
    }

    return 'Desculpe, ocorreu um erro ao processar sua solicitação.';
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.mentions.has(client.user)) {
    const prompt = message.content.replace(/<@!?(\d+)>/, '').trim();
    if (prompt.length === 0) return;

    await message.channel.sendTyping();
    const response = await generateResponse(message.author.id, prompt);

    //Dividir a resposta em partes de até 2000 caracteres, pois o Discord não permite que bots enviem mensagens com mais de 2000 caracteres. 
    //Então, nesse caso, se a resposta da IA ultrapassar os 2000 caracteres, ela irá dividir a mensagem em duas ou mais partes para respeitar essa limitação do Discord.
    const chunks = response.match(/[\s\S]{1,1999}/g);

    for (const chunk of chunks) {
      await message.channel.send(chunk);
    }
  }

  //Comandos de interação, você pode criar quantos comandos quiser, e personalizar.
  if (message.content.startsWith('!')) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const user = message.author;
    switch (command) {
      case 'exemplo':
        message.channel.send({
          embeds: [{
            title: 'Interação',
            description: `Comando de exemplo para ${user}`,
            image: {
              url: 'imagem/gif caso queira colocar',
            },
          }],
        });
        break;

      default:
        message.channel.send('Comando não reconhecido.');
        break;
    }
  }
});

setInterval(async () => {
  const channel = client.channels.cache.get('1285396583571263541'); //Aqui eu fiz um sisteminha para a IA enviar mensagens randomizadas relacionado a um tema específico de meu gosto particular, e esse ID de canal é onde ela enviará as mensagens.
  if (!channel) return;

  const messages = [ //Aqui ficam as mensagens de randomização.
    'Você sabia? A neurociência é a chave para entender a consciência humana.',
    'A física quântica desafia nossa percepção da realidade.',
    '“Aquele que controla o passado controla o futuro.” - Makise Kurisu',
    'O tempo é relativo, mas as emoções são atemporais.',
    'A ciência não é sobre porquês, é sobre como.',
    '“Não há coincidências no mundo, apenas a inevitabilidade.”',
    'Você já considerou as implicações dos buracos de minhoca?',
    'A mente humana é mais complexa do que qualquer equação.',
    '“A triste verdade é que a inspiração raramente vem quando você está procurando por ela.”',
    'Lembre-se, cada escolha leva a um mundo diferente.',
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  channel.send(randomMessage);
}, 9600000); //Tempo de intervalo das mensagens randomizadas em milissegundos.

client.login(process.env.DISCORD_BOT_TOKEN);
