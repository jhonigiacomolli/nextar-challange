import { createAgent, createEquipment, editAgent, editEquipment, removeAgent, removeEquipment } from "global/api";
import { TYPE_Equipments, TYPE_Agent, TYPE_FilterParams, Type_Maintenance, TYPE_MaintenanceStatus, TYPE_MaintenanceType, TYPE_Ordenation } from "global/types";
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
    search?: string
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
    equipments: TYPE_Equipments[]
    loadEquipments: (equipement: TYPE_Equipments[]) => void
    newEquipment: (equipement: TYPE_Equipments) => void
    updateEquipment: (equipement: TYPE_Equipments) => void
    deleteEquipment: (equipement: TYPE_Equipments) => void
}

const initialFilterParams: TYPE_FilterParams = {
    entries: 5,
    ordenation: 'old',
    agent: { id: 0, agent: '' },
    type: 'correction',
    status: 'Aberta',
    search: '',
}
export const GlobalContext = createContext({} as GlobalContextProps)

export const GlobalContextProvider = ({ children }:GlobalContextProviderProps) => {
    const [filterParams, setSetFilterParams] = useState<TYPE_FilterParams>(initialFilterParams)
    const [agents, setAgents] = useState<TYPE_Agent[]>([])
    const [maintenances, setMaintenances] = useState<Type_Maintenance[]>([])
    const [equipments, setEquipments] = useState<TYPE_Equipments[]>([])

    //Agents
    const loadAgents = (agents: TYPE_Agent[]) => {
        setAgents(agents)
    }
    const newAgents = async (agent: TYPE_Agent) => {
        const result = await createAgent(agent)
        const newAgent: TYPE_Agent = await result.json()

        result.status === 201 && setAgents(old => [
            ...old,
            newAgent
        ])
    }
    const updateAgents = async (agent: TYPE_Agent) => {
        const result = await editAgent(agent)
        
        result.status === 200 && setAgents(old => old.map(item => item.id === agent.id ? agent : item 
        ))
    }
    const deleteAgents = async (agents: TYPE_Agent) => {
        const result = await removeAgent(agents.id)        
        result.status === 200 && setAgents(old => old.filter(item => item.id !== agents.id))
    }

    //Equipments
    const loadEquipments = (equipment: TYPE_Equipments[]) => {
        setEquipments(equipment)
    }
    const newEquipment = async (equipment: TYPE_Equipments) => {
        const result = await createEquipment(equipment)
        const newEquipment: TYPE_Equipments = await result.json()

        result.status === 201 && setEquipments(old => [
            ...old,
            newEquipment
        ])
    }
    const updateEquipment = async (equipment: TYPE_Equipments) => {
        const result = await editEquipment(equipment)
        
        result.status === 200 && setEquipments(old => old.map(item => item.id === equipment.id ? equipment : item 
        ))
    }
    const deleteEquipment = async (equipment: TYPE_Equipments) => {
        const result = await removeEquipment(equipment.id)        
        result.status === 200 && setEquipments(old => old.filter(item => item.id !== equipment.id))
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
            equipments,
            loadEquipments,
            newEquipment,
            updateEquipment,
            deleteEquipment,
        }} >
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext)
    return context
}