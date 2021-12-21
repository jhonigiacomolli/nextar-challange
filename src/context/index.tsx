import { Type_Maintenance } from "global/types";
import { createContext, ReactNode, useContext, useState } from "react";

type GlobalContextProviderProps = {
    children: ReactNode
}
type GlobalContextProps = {
    maintenances: Type_Maintenance[]
    loadMaintenances: (maintenances: Type_Maintenance[]) => void
    newMaintenances: (maintenance: Type_Maintenance) => void
    updateMaintenances: (maintenance: Type_Maintenance) => void
    deleteMaintenances: (maintenance: Type_Maintenance) => void
}
export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({ children }:GlobalContextProviderProps) => {
    const [maintenances, setMaintenances] = useState<Type_Maintenance[]>([])

    const loadMaintenances = (maintenances: Type_Maintenance[]) => {
        setMaintenances(maintenances)
    }

    const newMaintenances = (maintenance: Type_Maintenance) => {
        setMaintenances(old => [
            ...old,
            maintenance
        ])
    }

    const updateMaintenances = (maintenance: Type_Maintenance) => {
        setMaintenances(old => old.map(item => item.id === maintenance.id ? maintenance : item 
        ))
    }

    const deleteMaintenances = (maintenance: Type_Maintenance) => {
        setMaintenances(old => old.filter(item => item.id !== maintenance.id))
    }

    return (
        <GlobalContext.Provider value={{ 
            maintenances, 
            loadMaintenances,
            newMaintenances,
            updateMaintenances,
            deleteMaintenances, 
        }} >
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    return context
}