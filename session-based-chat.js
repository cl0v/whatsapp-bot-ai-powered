import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { Ollama } from "@langchain/ollama";


const model = new Ollama({
  model: "mistral",
  temperature: 0,
  lowVram: true,
});

const messageHistories = {};



const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant who remembers all details the user shares with you. `,
  ],
  ["placeholder", "{chat_history}"],
  ["human", "{input}"],
]);

const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (messageHistories[sessionId] === undefined) {
      messageHistories[sessionId] = new InMemoryChatMessageHistory();
    }
    return messageHistories[sessionId];
  },
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});


export async function talk(sessionId, input){
  console.log(`(${sessionId}): ${input}`);
  const config = {
    configurable: {
      sessionId: sessionId,
    },
  };
  
  const response = await withMessageHistory.invoke(
    {
      input: input,
    },
    config
  );

  return response
}

// await talk("marcelo", "Hello my name is Marcelo")
// await talk("bob", "Hello my name is Bob")
// await talk("marcelo", "What is my name?")

// console.log("Finalizando Modelo")
// execSync("ollama stop llama3.1:latest")

