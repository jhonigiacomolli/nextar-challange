import { useGlobalContext } from 'context'
import { TYPE_Agent, TYPE_MaintenanceStatus, TYPE_MaintenanceType, TYPE_Ordenation } from 'global/types'
import { ChangeEvent, useEffect, useState } from 'react'
import searchIcon from 'assets/search.svg'
import Image from 'next/image'
import styles from './index.module.scss'

type FilterProps = {
    kind: 'agent-list' | 'maintenance-search'
}
export const Filter = ({ kind }: FilterProps) => {
    const { agents, filterParams, updateFilterParams } = useGlobalContext()
    const [agent, setAgent] = useState<TYPE_Agent>(filterParams.agent)
    const [type, setType] = useState<TYPE_MaintenanceType>(filterParams.type)
    const [status, setStatus] = useState<TYPE_MaintenanceStatus>(filterParams.status)
    const [entries, setEntries] = useState(filterParams.entries)
    const [ordenation, setOrdenation] = useState<TYPE_Ordenation>(filterParams.ordenation)
    const [search, setSearch] = useState('')

    const handleChangeEntries = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setEntries(Number(value))
    }
    const handleChangeOrdenation = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setOrdenation(value as TYPE_Ordenation)
    }
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

    const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearch(value)
    }

    useEffect(() => {
        updateFilterParams({
            agent,
            type,
            status,
            entries,
            ordenation, 
            search,
        })
    }, [agent, type, status, entries, ordenation, search])

    return (
        <div className={styles.container}>
            {
                kind === 'agent-list' && (
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
                )
            }
            {
                kind === 'maintenance-search' && (
                    <div className={`${styles.filter} ${styles.search}`}>
                        <p>Busca:</p>
                        <div className={styles.icon}>
                            <input type="text" name="search" id="serch" onChange={handleChangeSearch} />
                            <Image src={searchIcon} alt="search" width={18} height={18} />
                        </div>
                    </div>
                )
            }
            {
                kind === 'agent-list' && (
                    <div className={styles.filter}>
                        <p>Tipo:</p>
                        <select name="select-maintenance-type" id="select-maintenance-type" onChange={handleChangeType}>
                            <option value="correction">Corretiva</option>
                            <option value="preventive">Preventiva</option>
                        </select>
                    </div>
                )
            }
            <div className={styles.filter}>
                <p>Status:</p>
                <select name="select-maintenance-status" id="select-maintenance-status" onChange={handleChangeStatus}>
                    <option value="Aberta">Aberta</option>
                    <option value="Fechada">Fechada</option>
                </select>
            </div>
            <div className={styles.filter}>
                <p>Ordenação:</p>
                <select name="select-maintenance-ordenation" id="select-maintenance-ordenation" onChange={handleChangeOrdenation}>
                    <option value="old">Mais antigas</option>
                    <option value="recent">Mais recentes</option>
                </select>
            </div>
            <div className={styles.filter}>
                <p>Itens Exibidos:</p>
                <select name="select-maintenance-entries" id="select-maintenance-entries" onChange={handleChangeEntries}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    )
}