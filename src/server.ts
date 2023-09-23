import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { createTranscriptionRoute } from "./routes/create-video-transcription";
import { generateAiCompletionsRoute } from "./routes/generate-ai-completion";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { getAllVideosRoute } from "./routes/get-all-videos";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});
//O ideal é que em produção seja colocado exatamente o endereço do frontend que irá acessar a aplicação

app.register(getAllPromptsRoute);
app.register(getAllVideosRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionsRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running 🚀");
  });
