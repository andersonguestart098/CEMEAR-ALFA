import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prismaInstance";
import NextCors from "nextjs-cors";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    if (req.method !== 'POST') {
        res.status(405).send({ result: 'Apenas metodos POST são autorizados' })
        return
    }

    const {id, dado} = req.body
    console.log(req.body)
    if(dado.index == "notaFiscal") {
        await prisma.passagemDados.update({
            data: {
                notaFiscal: Number(dado.value)
            },
            where: {
                id: Number(id)
            }
        })
        return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
    }

    if(!req.body) {
        return res.status(400).send({ result: "Tudo em falta" })  
    }else if (!id.length) {
        return res.status(400).send({ result: "ID em falta" })  
    }else if (Object.keys(dado).length === 0) {
        return res.status(400).send({ result: "DADOS em falta" })  
    }

    

    await prisma.financeiro.update({
        where: {
            id: Number(id)
        },
        data: {
            [dado.index]: dado.value
        }
    })
    return res.status(201).send({ result: `editado ${dado.index} com valor ${dado.value}`})
}