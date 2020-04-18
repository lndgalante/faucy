import { useEffect } from 'react'

const useUpdateValue = ({ name, value, register, setValue }) => {
  useEffect(() => {
    register({ name })
    setValue(name, value)
  }, [name, value, register, setValue])
}

export { useUpdateValue }
