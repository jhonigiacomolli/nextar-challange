import { Filter } from 'components/maintenance-filter'
import { useGlobalContext } from 'context'
import { revertDateString } from 'global/functions'
import { Type_Maintenance } from 'global/types'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export const AgentMaintenances = () => {
    const { filterParams, maintenances } = useGlobalContext()
    const [agentMaintenances, setAgentMaintenances] = useState<Type_Maintenance[]>([])

    useEffect(() => {
        setAgentMaintenances(
            [...maintenances]
            .filter(maint => maint.agent === filterParams.agent?.agent)
            .filter(maint => maint.status === 'Fechada')
            .sort((maintA, maintB) => (
                new Date(revertDateString(maintA.date)).getTime() 
                > new Date(revertDateString(maintB.date)).getTime() 
                ? 1 
                : -1
            ))
        )
    }, [maintenances, filterParams.agent])    

    return (
        <div className={styles.container}>
            <Filter />
            <div className={styles.selectedAgent}>
                <p>Agente responsável:</p> 
                <h1>
                    {
                        filterParams.agent?.agent === '' 
                        ? 'Nenhum agente selecionado' 
                        : filterParams.agent?.agent
                    }
                </h1>
            </div>
            <span>Ultimas manutenções:</span>
            {
                agentMaintenances.map((maint, index) => (
                    index < 5 &&  (
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