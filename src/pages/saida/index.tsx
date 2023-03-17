import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelSaida } from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';

import { CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';

interface typeDB {
    result: ModelSaida[]
    lengthDB: number
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if(!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props:{
      session
    }
  }
}

function index() {
  const { data: dataAuth } = useSession()
  const [pagina, setPagina ] = useState(0)

  const { data, isLoading } = useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "saida")



  if(isLoading) {
    return <div style={{display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress disableShrink />
    </div>
  }

  return (
    <>
      <CustomNavBar setor="CARREGAMENTO CAMINHÃO" setData={setPagina} dados={dataAuth} />
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
              <TableCell>Cód|Entrega</TableCell>
              <TableCell>Número|NF</TableCell>
              <TableCell>Conferente</TableCell>
              <TableCell>Placa</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Cidades|Destino</TableCell>
              <TableCell>Hodometro</TableCell>
              <TableCell>Data|Hora|Saída</TableCell>
              <TableCell>Observação</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelSaida) => {
            return (
              <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.codigoEntrega}</TableCell>
                  <TableCell>{item.numeroNotaFiscal}</TableCell>
                  <TableCell>{item.nomeConferente}</TableCell>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell>{item.motorista}</TableCell>
                  <TableCell>{item.cidadesDestino}</TableCell>
                  <TableCell>{item.hodometro}</TableCell>
                  <TableCell>{item.dataHoraSaida}</TableCell>
                  <TableCell>{item.obs}</TableCell>



                </TableRow>
            )
          })
      } paginacao={
        <Pagination onChange={(_, value) => { 
            value = value -1
            setPagina(value)
          }} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 50}} count={Math.ceil(data.lengthDB/3)} />
      }/>
    </>
  )
}

export default index