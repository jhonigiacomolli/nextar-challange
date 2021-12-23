import { useGlobalContext } from 'context'
import { TYPE_Agent, TYPE_MaintenanceStatus, TYPE_MaintenanceType } from 'global/types'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './index.module.scss'

export const Filter = () => {
    const { agents, filterParams, updateFilterParams } = useGlobalContext()
    const [agent, setAgent] = useState<TYPE_Agent>(filterParams.agent)
    const [type, setType] = useState<TYPE_MaintenanceType>(filterParams.type)
    const [status, setStatus] = useState<TYPE_MaintenanceStatus>(filterParams.status)

    const handleChangeAgent = (event: ChangeEvent<HTMLSelectElement>) => {
        const id = event.target.value
        const agent = agents.filter(ag => ag.id === Number(id))[0]
        setAgent(agent)
    }

    const handleChangeType = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setType(value as TYPE_MaintenanceType)
    }

    const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setStatus(value as TYPE_MaintenanceStatus)
    }
    useEffect(() => {
        updateFilterParams({
            agent,
            type,
            status
        })
    }, [agent])

    return (
        <div className={styles.container}>
            <div className={styles.filter}>
                <p>Tipo:</p>
                <select name="select-maintenance-type" id="select-maintenance-type" onChange={handleChangeType}>
                    <option value="correction">Corretiva</option>
                    <option value="preventive">Preventiva</option>
                </select>
            </div>
            <div className={styles.filter}>
                <p>Status:</p>
                <select name="select-maintenance-status" id="select-maintenance-status" onChange={handleChangeStatus}>
                    <option value="Aberta">Aberta</option>
                    <option value="Fechada">Fechada</option>
                </select>
            </div>
            <div className={`${styles.filter} ${styles.agent}`}>
                <p>Agente:</p>
                <select name="select-maintenance-agent" id="select-maintenance-agent" onChange={handleChangeAgent}>
                    <option value="empty">Selecione...</option>
                    {
                        agents.map(agent => (
                            <option key={agent.id} value={agent.id}>
                                {agent.agent}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}