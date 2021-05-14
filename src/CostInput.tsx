import React, { useState } from "react"


export function CostInput() {
  const [value, setValue] = useState('')

  const removeDollarSign = (value: string) => (value[0] === '$' ? value.slice(1) : value)
  const getReturnValue = (value: string) => (value === '' ? '' : `$${value}`)

  const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
    ev.preventDefault()
    const inputtedValue = ev.currentTarget.value
    const noDollarSign = removeDollarSign(inputtedValue)
    console.log(
      parseInt(noDollarSign), inputtedValue,
      ev.currentTarget
    )
    if (isNaN(parseInt(noDollarSign))) return
    setValue(getReturnValue(noDollarSign))
  }

  return <input value={value} type="text" aria-label="cost-input" onChange={handleChange} />
};