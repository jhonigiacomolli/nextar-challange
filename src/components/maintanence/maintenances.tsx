import { Filter } from 'components/maintenance-filter'
import { useGlobalContext } from 'context'
import { revertDateString, searchParameterize } from 'global/functions'
import { Type_Maintenance } from 'global/types'
import { useEffect, useState } from 'react'
import styles from './maintenances.module.scss'
import maintenanceIcon from 'assets/maintenance-icon.svg'
import Image from 'next/image'
import { PrimaryButton } from 'components/button/primary-button'
import { NewMaintenance } from './new-maintenace'

type MaintenancesProps = {
    type: 'corretiva' | 'preventiva'
    displayFilter?: boolean
}

export const Maintenances = ({ type, displayFilter = false }: MaintenancesProps) => {
    const { maintenances, filterParams, updateMaintenances, deleteMaintenances } = useGlobalContext()
    const [listedMaintenances, setListedMaintenances] = useState<Type_Maintenance[]>([])
    const [maintenance, setMaintenance] = useState<Type_Maintenance>({} as Type_Maintenance)
    const [state, setState] = useState<'new' | 'edit' | 'details'>('new')
    const [modal, setModal] = useState(false)
    
    useEffect(() => {
        setListedMaintenances(
            [...maintenances]
            .filter(maint => maint.type === type)
            .filter(maint => maint.status === filterParams.status)
            .filter(maint => filterParams.search === '' ? true : (
                    searchParameterize(maint.agent).includes(searchParameterize(filterParams.search)) ||
                    searchParameterize(maint.owner).includes(searchParameterize(filterParams.search)) ||
                    searchParameterize(maint.equipment).includes(searchParameterize(filterParams.search)) ||
                    searchParameterize(maint.area).includes(searchParameterize(filterParams.search))
                )
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
    }, [type, maintenances, filterParams.status, filterParams.ordenation, filterParams.search, filterParams.entries ])    

    const handleChangeModal = (state: boolean) => {
        setModal(state)
        setMaintenance({} as Type_Maintenance)
    }

    const handleUpdateMaintenance = (maintenance: Type_Maintenance) => {
        setMaintenance(maintenance)
        setState('edit')
        setModal(true)
    }

    const handleDisplayDetails = (maintenance: Type_Maintenance) => {
        setMaintenance(maintenance)
        setState('details')
        setModal(true)
    }

    const handleRemoveMaintenance = (id: number) => {
        deleteMaintenances(maintenances.filter(maint => maint.id === id)[0])
    }

    const handleCloseMaintenance = (maintenance: Type_Maintenance) => {
        updateMaintenances({
            ...maintenance,
            date: new Date().toLocaleDateString(),
            status: 'Fechada',
        })
    }

    return (
        <div className={styles.container}>
            {modal && (
                <NewMaintenance data={maintenance} type={state} state={modal} updateState={handleChangeModal} />
            )}
            <h1>
                {
                    displayFilter && (
                        <div className={styles.title}>
                            <div>
                                <Image src={maintenanceIcon} alt='icon' width={50} height={50} />
                                Manutenções
                            </div>
                            <PrimaryButton title="Adicionar nova" onClick={() => {setModal(true), setState('new')}} />
                        </div>
                    )
                }
            </h1>
            {
                displayFilter && <Filter kind='maintenance-search' />
            }
            <h2 className={styles.subtitle}>{type === 'corretiva' && 'Lista Manutenções Corretivas'}</h2>
            <h2 className={styles.subtitle}>{type === 'preventiva' && 'Lista Manutenções Preventivas'}</h2>
            <div className={styles.content}>
                <div className={`${styles.maintenance} ${styles.header}`}>
                    <span className={styles.agent}>Agente</span>
                    <span>Área</span>
                    <span className={styles.equipment}>Equipamento</span>
                    <span className={styles.date}>Data</span>
                    <span></span>
                </div>
                {
                    listedMaintenances.length > 0 
                    ? (
                        <div>
                            {
                                listedMaintenances.map((maint, index, array) => (
                                    index < filterParams.entries &&  (
                                        <div 
                                            key={type + maint.id} 
                                            className={`
                                                ${styles.maintenance} 
                                                ${( array.length < 1 || (index === filterParams.entries -1)) ? '' : styles.underline}
                                            `}
                                        >
                                            <span className={styles.agent}>{maint.agent}</span>
                                            <span>{maint.area}</span>
                                            <span className={styles.equipment}>{maint.equipment}</span>
                                            <span className={styles.date}>{maint.date}</span>
                                            {maint.date === '' && (
                                                <PrimaryButton 
                                                    className={styles.action} 
                                                    title='Fechar' 
                                                    onClick={() => handleCloseMaintenance(maint)} 
                                                />
                                            )}
                                            <PrimaryButton 
                                                className={styles.action} 
                                                title='Detalhes' 
                                                onClick={() => handleDisplayDetails(maint)} 
                                            />
                                            <PrimaryButton 
                                                className={styles.action} 
                                                title='Editar' 
                                                onClick={() => handleUpdateMaintenance(maint)} 
                                            />
                                            <PrimaryButton 
                                                className={styles.action} 
                                                title='Excluir' 
                                                onClick={() => handleRemoveMaintenance(maint.id)} 
                                            />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                    )
                    : <p>Não existem dados para serem exibidos</p>
                }
            </div>
        </div>
    )
}