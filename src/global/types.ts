export type TYPE_MaintenanceType = 'correction' | 'preventive'

export type TYPE_MaintenanceStatus = 'Aberta' | 'Fechada'

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
}