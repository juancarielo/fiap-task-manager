import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import NextCors from 'nextjs-cors'

const corsHandler = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200,
    })
    return handler(req, res)
}

export default corsHandler
