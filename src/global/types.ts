export type Type_Maintenance = {
    id: number
    type: 'correction' | 'preventive'
    equipment: string
    area: string
    date: string
    agent: string
    owner: string
    status: 'Aberta' | 'Fechada'
}