import React from 'react'
import FormularioOT from '../components/FormularioOT'

const NuevaOT = () => {
  return (
    <>
    <h1 className="text-4xl font-black">Nueva orden de trabajo</h1>
    <div className="mt-10 flex justify-center place-content-center">
        <FormularioOT/>
    </div>
  </>
  )
}

export default NuevaOT