import React, { useState } from 'react'

import { useFetch } from "@hooks/useFetch";
import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import CustomTable from "@components/customtable"
import CustomNavBar from "@components/customAppBar"
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';
import { motion } from 'framer-motion';
import { Chip, CircularProgress, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import Loader from '~/components/loader';
import CustomSelect_Widget from '~/components/customSelect_widget';
import color from '~/config/colors';

interface typeDB {
    result: ModelConfirmacaoEntrega[]
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

  const [travarAuto, setTravarAuto ] = useState(false)
  const [searchString, setSearchString ] = useState("{}")

  //! VALOR PADRAO DE FILTRO DE PESQUISA (VALOR DO DB)
  const [filterInput, setFilterInput ] = useState('notaFiscalP')
  
  const [valueInputChange, setValueInputChange ] = useState('')

  React.useEffect(() => {
    if(searchString == "{}") {
      setTravarAuto(false)
    }
  }, [searchString])

  const { data, isLoading } = travarAuto ?
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "confirmacaoEntrega", searchString) :
  useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "confirmacaoEntrega")



  //! LOADER DE CARREGAMENTO
  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <CustomNavBar setor="CONFIRMAÇÃO DE ENTREGA" 
      setSearchString={setSearchString}
      setValueInputChange={setValueInputChange}
      searchString={searchString}
      filter={filterInput}
      setSearch={setTravarAuto}
      dados={dataAuth} 
      filterData={[["dataCriacao", "cliente"],[
        {
          updatedAt: {
            gte: new Date(valueInputChange)
          }
        },
        {cliente: {
            contains: valueInputChange
        }}
      ]]} 
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{textAlign: "center"}}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip onClick={() => {
            setFilterInput("notaFiscal")
          }} sx={filterInput == "notaFiscal" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Numero de Nota Fiscal"  variant="outlined" />
          
          <Chip onClick={() => { 
            setFilterInput("cliente")
          }} sx={filterInput == "cliente" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Cliente"  variant="outlined" />

          <Chip onClick={() => { 
            setFilterInput("dataCriacao")
          }} sx={filterInput == "dataCriacao" ? {marginLeft: 2, background: "#6d6e6d80"} : {marginLeft: 2}} label="Data"  variant="outlined" />
        </div>
        <p>Filtro rapido: </p>
        <div style={{display: "flex", justifyContent: "space-between", marginLeft: 15, marginRight: 15}}>
          <CustomSelect_Widget 
          itens={[
            {value: "Emitida", visualValue: "Notas Emitida", color: color.financeiro.emitida.background},
            {value: "Pendente", visualValue: "Notas Pendente", color: color.financeiro.pendente.background},
            {value: "Cancelada", visualValue: "Notas Cancelada", color: color.financeiro.cancelada.background},
            {value: "Retornou", visualValue: "Notas Retornou", color: color.financeiro.retornou.background},
            {value: "Boleto em aberto", visualValue: "Notas Boleto em aberto", color: color.financeiro.boletoAberto.background},
            {value: "Aguardando deposito", visualValue: "Notas Aguardando deposito", color: color.financeiro.aguardadoDeposito.background}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.statusNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Status Nota Fiscal'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "expedicao", visualValue: "Expedicao"},
            {value: "expedicao2", visualValue: "Expedicao 2"},
            {value: "logistica", visualValue: "Logistica"}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.author = {}
            currentFilter.author.expedicao = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Expedicões'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "Rosi", visualValue: "Rosi"},
            {value: "Aprendiz", visualValue: "Aprendiz"},
            {value: "Julia", visualValue: "Julia"},
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.operadorNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Operador Nota Fiscal'}          
          />
          <CustomSelect_Widget 
          itens={[
            {value: "Max", visualValue: "Max"},
            {value: "Eduardo", visualValue: "Eduardo"},
            {value: "Cristiano S.", visualValue: "Cristiano S."},
            {value: "Manoel", visualValue: "Manoel"},
            {value: "Cristinao D.", visualValue: "Cristinao D."}
          ]} 
          onChangeValue={(e) => {
            let currentFilter = JSON.parse(searchString)
            currentFilter.responsavelNotaFiscal = e.target.value
            setSearchString(JSON.stringify(currentFilter))
            setTravarAuto(true)
          }}
          labelText={'Responsavel Nota Fiscal'}          
          />
        </div>
        <Chip onClick={() => { 
            setSearchString("{}")
          }} sx={{marginTop: 2}} label="Tirar Todos Filtros" variant="outlined" />
      </div>
      
      <CustomTable 
      childrenCabecarioTable={
        <TableRow>
              <TableCell>Id</TableCell>
              <TableCell >Data|Hora</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Nota Fiscal</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Entrega|Concluída</TableCell>
              <TableCell>Observação</TableCell>
              
          </TableRow>
      }
      childrenRowTable={
        data!.result.map((item: ModelConfirmacaoEntrega) => {
            return (
              <TableRow
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.motorista}</TableCell>
                  <TableCell>{item.notaFiscal}</TableCell>
                  <TableCell>{item.cidade}</TableCell>
                  <TableCell>{item.entregaConcluida}</TableCell>
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