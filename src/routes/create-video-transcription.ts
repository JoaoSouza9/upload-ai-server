import { FastifyInstance } from "fastify";
import { createReadStream } from "fs";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    });
    const { videoId } = paramsSchema.parse(req.params);
    //Faz a validação do formato do req.params e em seguida a desestruturação para obeter o videoId

    const bodySchema = z.object({
      prompt: z.string(),
    });
    const { prompt } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const videoPath = video.path;

    const audioReadStream = createReadStream(videoPath);

    return {
      videoId,
      prompt,
    };
  });
}
