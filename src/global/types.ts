export type TYPE_MaintenanceType = 'correction' | 'preventive'

export type TYPE_MaintenanceStatus = 'Aberta' | 'Fechada'

export type TYPE_Ordenation = 'recent' | 'old'

export type Type_Maintenance = {
    id: number
    type: TYPE_MaintenanceType
    equipment: string
    area: string
    date: string
    agent: string
    owner: string
    status: TYPE_MaintenanceStatus
}
export type TYPE_Agent = {
    id: number
    agent: string
}
export type TYPE_FilterParams = {
    agent: TYPE_Agent
    type: TYPE_MaintenanceType
    status: TYPE_MaintenanceStatus
    entries: number
    ordenation: TYPE_Ordenation
    search: string
}
export type TYPE_Equipments = {
    id: number
    description: string
    register: string
    model: string
    locatedArea: string
    nextMaintenance: string
    maintenances: string[]
    observations: string
}
export type TYPE_Area = {
    id: number
    name: string
    equipmentList: string[]
    block: string
}