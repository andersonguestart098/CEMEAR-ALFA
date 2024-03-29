import { sendThisToDatabase } from "@services/sendData"
import { ModelFinanceiro } from "@models/setoresInterface"
import { databaseRepositoryImpl } from "./databaseRepository_impl"

export class databaseRepository implements databaseRepositoryImpl {

    create(router: string, data: ModelFinanceiro, setor: string): void {
        try {
            data.setor = setor
            sendThisToDatabase(router, data)
        } catch (error) {
            console.log(error)
        }
    }

    edit(router: string, metadata: string, value: string | number | boolean, setor: string): void {
        try {
            const metaData: any = metadata.split("_")
            sendThisToDatabase(router, {
                id: metaData[0],
                dado: {
                    index: metaData[1],
                    value: value
                },
                setor: setor
          })
        } catch (error) {
            console.log(error)
        }
    }

    delete(router: string, id: number): void {
        throw new Error("Method not implemented.")
    }
    
}