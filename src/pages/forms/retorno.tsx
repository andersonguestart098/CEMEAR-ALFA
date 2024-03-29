import { Button, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from '@services/sendData';
import { ModelRetorno } from '@models/setoresInterface';
import CustomSelect_Widget from '@components/customSelect_widget';

type Props = {}

const retorno = (props: Props) => {
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm()

  const [disabilitarBotao, setDisabilitarBotao] = React.useState(false)
  const [notas, setNotas] = React.useState("")
  const [notasVisual, setNotasVisual] = React.useState([""])

  React.useEffect(()=> {
    let notasLocal = notas.split(",")
      setNotasVisual(notasLocal)
  },[notas])

  async function onSubmit(e: any) {
    setDisabilitarBotao(true)
    for(let nota in notasVisual) {
      if(notasVisual[nota]?.trim().length != 0) {
        const dadosRetorno: ModelRetorno = {
          notaFiscal: Number(notasVisual[nota]),
          placa: e.placa,
          hodometro: e.hodometro,
          data: e.data,
          obs: e.obs == "" ? "Nenhuma Observação" : e.obs,
          setor: "retorno"
        }
        await sendThisToDatabase("/api/methodsdatabase/create", dadosRetorno, 300)
      }
    }
    window.location.reload()
  }

  return (
    <div>
      <img src="/logoce (2).svg" style={{width: 70, marginLeft: 15, marginTop: 15}} />
      <form  
      onSubmit={handleSubmit(onSubmit)}
      style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", marginTop: 15}}>
        <h3 style={{textAlign: "center", marginBottom: 30}}>Retorno da Entrega</h3>
              <TextField 
              {...register("numeroNotaFiscal")}
              value={notas}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNotas(event.target.value);
              }}
              sx={{width: 250}} 
              required 
              id="numeroNotaFiscal" label="Numero Nota Fiscal" 
              variant="outlined" />
              <div style={{marginTop: 5}}>
              <p>Numero de Notas a serem enviadas</p>
              <div style={{display: "flex",flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                {
                  notasVisual.map((item,index) => {
                    return <div key={index} style={{marginLeft: 4, color: "#fff", background: "#058FED", padding: 10, borderRadius: 5}}>{item}</div>
                  })
                }
                </div>
              </div>
              <br/>
                <CustomSelect_Widget
                 labelText={'Placa:'} 
                 register={register("placa")} 
                 itens={[
                  {value: "YW7921", visualValue: "YW7921"},
                  {value: "IWC5261", visualValue: "IWC5261"},
                  {value: "JBD7E59", visualValue: "JBD7E59"},
                  {value: "IZT1E84", visualValue: "IZT1E84"},
                  {value: "IWW7921", visualValue: "IWW7921"},
                  {value: "IVO1603", visualValue: "IVO1603"},
                  {value: "AZI2E30", visualValue: "AZI2E30"},
                  {value: "ITA7784", visualValue: "ITA7784"},
                  {value: "IUT9476", visualValue: "IUT9476"},
                  {value: "IST6840", visualValue: "IST6840"},
                  {value: "IVP0G05", visualValue: "IVP0G05"},
                  {value: "JBD9H36", visualValue: "JBD9H36"},
                  {value: "IXH8706", visualValue: "IXH8706"}
                 ]}  
                 />
                <br/><br/>
                <TextField 
                {...register("hodometro")} 
                sx={{width: 250}} 
                type="text" required 
                id="hodometro" label="Hodometro" 
                variant="outlined" />
                <br/><br/>
                <TextField 
                {...register("data")} 
                sx={{width: 250}} 
                type="date" required 
                id="data" label="" 
                variant="outlined" />
                <br/><br/>
                  <TextField 
                  {...register("obs")} 
                  sx={{width: 250}} 
                  type="text" 
                  id="obs" label="Observações" 
                  variant="outlined" />
                  <br/><br/>

              <Button type="submit" disabled={disabilitarBotao} variant="contained">Enviar</Button>
          </form>
    </div>
  )
}

export default retorno