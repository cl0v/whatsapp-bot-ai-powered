import { Ollama } from "@langchain/ollama";
// import fs from "fs/promises";

// const imageData = await fs.readFile("pup.png");

export  async function imgRecognition(imageDataBase64) {
    const model = new Ollama({
        model: "llava",
    })
        .bind({
            images: [imageDataBase64],
        });

    const response = await model.invoke("Explain me in details what is the image provided in Portugues-BR");
    
    return response
}


// console.log(await imgRecognition(imageData.toString("base64")));