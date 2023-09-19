import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from '@fastify/multipart'
import path from "path";
import fs from "fs";
import { promisify } from 'util'
import { pipeline } from 'stream'
import { randomUUID } from "crypto";

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25,
        }
    })

    app.post('/videos', async (request, reply) => {
        const data = await request.file()

        if(!data) {
            return reply.status(400).send({error: 'Missing file'})
        }

        const extension = path.extname(data.filename)

        if(extension !== '.mp3'){
            return reply.status(400).send({error: 'Invalid file type, please upload a .mp3 file'}) 
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}-${extension}`

        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)
        
        await pump(data.file, fs.createWriteStream(uploadDestination))
    })
}