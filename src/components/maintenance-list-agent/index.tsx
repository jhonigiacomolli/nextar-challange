import { Filter } from 'components/maintenance-filter'
import { useGlobalContext } from 'context'
import { revertDateString } from 'global/functions'
import { Type_Maintenance } from 'global/types'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export const AgentMaintenances = () => {
    const { filterParams, maintenances } = useGlobalContext()
    const [agentMaintenances, setAgentMaintenances] = useState<Type_Maintenance[]>([])
    
    console.log(filterParams);
    
    useEffect(() => {
        setAgentMaintenances(
            [...maintenances]
            .filter(maint => 
                maint.agent === filterParams.agent?.agent
                && maint.type === filterParams.type
                && maint.status === filterParams.status
            )
            .sort((maintA, maintB) => filterParams.ordenation === 'old' ? (
                new Date(revertDateString(maintA.date)).getTime() 
                > new Date(revertDateString(maintB.date)).getTime() 
                ? 1 
                : -1
            ) : 0)
            .sort((maintA, maintB) => filterParams.ordenation === 'recent' ? (
                new Date(revertDateString(maintB.date)).getTime() 
                > new Date(revertDateString(maintA.date)).getTime() 
                ? 1 
                : -1
            ) : 0)
        )
    }, [maintenances, filterParams.agent, filterParams.type, filterParams.status, filterParams.ordenation ])    

    return (
        <div className={styles.container}>
            <Filter />
            <div className={styles.content}>
                <div className={`${styles.maintenance} ${styles.header}`}>
                    <span>Área</span>
                    <span className={styles.equipment}>Equipamento</span>
                    <span className={styles.date}>Data</span>
                </div>
                {
                    agentMaintenances.length > 0 
                    ? (
                        <div>
                            {
                                agentMaintenances.map((maint, index) => (
                                    index < filterParams.entries &&  (
                                        <div key={index + maint.id} className={styles.maintenance}>
                                            <span>Área{maint.area}</span>
                                            <span className={styles.equipment}>{maint.equipment}</span>
                                            <span className={styles.date}>{maint.date}</span>
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    )
                    : 'Não existem dados para serem exibidos'
                }
            </div>
        </div>
    )
}