import { fastify } from "fastify";
import { createTranscriptionRoute } from "./routes/create-video-transcription";
import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { getAllVideosRoute } from "./routes/get-all-videos";
import { uploadVideoRoute } from "./routes/upload-video";

const app = fastify();

app.register(getAllPromptsRoute);
app.register(getAllVideosRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Server is running 🚀");
  });
