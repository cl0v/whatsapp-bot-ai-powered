import { Ollama } from "@langchain/ollama";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import {execSync} from "child_process";




const model = new Ollama({
    model: "llama3.1",
});


export default async function iaChat(name, message) {
    console.log(`Recebida a mensagem (${name}) - ${message}`);
    const output = await model.invoke(
        [
            new HumanMessage({content: message})
        // new HumanMessage({ content: "Hi! I'm Bob" , name: "Bob" }),
        // new AIMessage({ content: "Hello Bob! How can I assist you today?" }),
        // new HumanMessage({ content: message,  name: name  }),

      ]);

    console.log(output);

    return output
}


await iaChat("Marcelo", "Olá, me chamo Marcelo");
// console.log("\n >>>>>>>><<<<<<<<< \n")
// await iaChat("Bob", "Qual é meu nome?");

console.log("Finalizando Modelo")
execSync("ollama stop llama3.1:latest")