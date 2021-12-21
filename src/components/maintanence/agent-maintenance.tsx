import { useGlobalContext } from 'context'
import { revertDateString } from 'global/functions'
import { Type_Maintenance } from 'global/types'
import { useEffect, useState } from 'react'
import styles from './agent-maintenances.module.scss'

type AgentMaintenancesProps = {
    agent: string
}

export const AgentMaintenances = ({ agent }:AgentMaintenancesProps) => {
    const { maintenances } = useGlobalContext()
    const [agentMaintenances, setAgentMaintenances] = useState<Type_Maintenance[]>([])

    useEffect(() => {
        setAgentMaintenances(
            [...maintenances]
            .filter(maint => maint.agent === agent)
            .sort((maintA, maintB) => (
                new Date(revertDateString(maintA.date)).getTime() 
                > new Date(revertDateString(maintB.date)).getTime() 
                ? 1 
                : -1
            ))
        )
    }, [maintenances, agent])

    return (
        <div className={styles.container}>
            <span>Agente responsável: </span>
            <h1>{agent}</h1>
            <span>Ultimas manutenções:</span>
            {
                agentMaintenances.map((maint, index) => (
                    index < 5 && (
                        <div key={maint.id} className={styles.maintenance}>
                            <span>Equipamento: <h2>{maint.equipment}</h2></span>
                            <span>Data: <h2>{maint.date}</h2></span>
                        </div>
                    )
                ))
            }
        </div>
    )
}