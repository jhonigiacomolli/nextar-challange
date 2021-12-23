import { TYPE_Agent, TYPE_FilterParams, Type_Maintenance, TYPE_MaintenanceStatus, TYPE_MaintenanceType, TYPE_Ordenation } from "global/types";
import { createContext, ReactNode, useContext, useState } from "react";

type GlobalContextProviderProps = {
    children: ReactNode
}
type UpdateFilter = { 
    entries?: number
    ordenation?: TYPE_Ordenation
    agent?: TYPE_Agent
    status?: TYPE_MaintenanceStatus
    type?: TYPE_MaintenanceType 
}
type GlobalContextProps = {
    filterParams: TYPE_FilterParams
    updateFilterParams: (params: UpdateFilter) => void
    agents: TYPE_Agent[]
    loadAgents: (agents: TYPE_Agent[]) => void
    newAgents: (agent: TYPE_Agent) => void
    updateAgents: (agent: TYPE_Agent) => void
    deleteAgents: (agent: TYPE_Agent) => void
    maintenances: Type_Maintenance[]
    loadMaintenances: (maintenances: Type_Maintenance[]) => void
    newMaintenances: (maintenance: Type_Maintenance) => void
    updateMaintenances: (maintenance: Type_Maintenance) => void
    deleteMaintenances: (maintenance: Type_Maintenance) => void
}

const initialFilterParams: TYPE_FilterParams = {
    entries: 5,
    ordenation: 'old',
    agent: { id: 0, agent: '' },
    type: 'correction',
    status: 'Aberta',
}
export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({ children }:GlobalContextProviderProps) => {
    const [filterParams, setSetFilterParams] = useState<TYPE_FilterParams>(initialFilterParams)
    const [agents, setAgents] = useState<TYPE_Agent[]>([])
    const [maintenances, setMaintenances] = useState<Type_Maintenance[]>([])

    //Agents
    const loadAgents = (agents: TYPE_Agent[]) => {
        setAgents(agents)
    }
    const newAgents = (agents: TYPE_Agent) => {
        setAgents(old => [
            ...old,
            agents
        ])
    }
    const updateAgents = (agents: TYPE_Agent) => {
        setAgents(old => old.map(item => item.id === agents.id ? agents : item 
        ))
    }
    const deleteAgents = (agents: TYPE_Agent) => {
        setAgents(old => old.filter(item => item.id !== agents.id))
    }

    //Maintenances
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

    //Filter
    const updateFilterParams = (params: UpdateFilter) => {
        setSetFilterParams(old => ({
            ...old,
            ...params
        }))
    }

    return (
        <GlobalContext.Provider value={{ 
            filterParams,
            agents,
            loadAgents,
            newAgents,
            updateAgents,
            deleteAgents,
            updateFilterParams,
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