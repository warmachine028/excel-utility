import { createContext, useState } from 'react'

export const ProgressContext = createContext()

const test = () => {
    const [progress, setProgress] = useState(1)
    const [data, setData] = useState({})
    return <ProgressContext.Provider value={}></ProgressContext.Provider>
}
