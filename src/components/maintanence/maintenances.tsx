import { Filter } from 'components/maintenance-filter'
import { useGlobalContext } from 'context'
import { revertDateString, searchParameterize } from 'global/functions'
import { Type_Maintenance } from 'global/types'
import { useEffect, useState } from 'react'
import styles from './maintenances.module.scss'
import maintenanceIcon from 'assets/maintenance-icon.svg'
import Image from 'next/image'

type MaintenancesProps = {
    type: 'correction' | 'preventive'
    displayFilter?: boolean
}

export const Maintenances = ({ type, displayFilter = false }: MaintenancesProps) => {
    const { maintenances, filterParams } = useGlobalContext()
    const [listedMaintenances, setListedMaintenances] = useState<Type_Maintenance[]>([])
    
    console.log(searchParameterize(filterParams.search));
    maintenances.map(item => console.log(searchParameterize(item.area).includes(filterParams.search)));
    
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

    return (
        <div className={styles.container}>
            <h1>
                {
                    displayFilter && (
                        <div className={styles.title}>
                            <Image src={maintenanceIcon} alt='icon' width={50} height={50} />
                            Manutenções
                        </div>
                    )
                }
            </h1>
            {
                displayFilter && <Filter kind='maintenance-search' />
            }
            <h2 className={styles.subtitle}>{type === 'correction' && 'Lista Manutenções Corretivas'}</h2>
            <h2 className={styles.subtitle}>{type === 'preventive' && 'Lista Manutenções Preventivas'}</h2>
            <div className={styles.content}>
                <div className={`${styles.maintenance} ${styles.header}`}>
                    <span className={styles.agent}>Agente</span>
                    <span>Área</span>
                    <span className={styles.equipment}>Equipamento</span>
                    <span className={styles.date}>Data</span>
                </div>
                {
                    listedMaintenances.length > 0 
                    ? (
                        <div>
                            {
                                listedMaintenances.map((maint, index, array) => (
                                    index < filterParams.entries &&  (
                                        <div 
                                            key={index + maint.id} 
                                            className={`
                                                ${styles.maintenance} 
                                                ${( array.length < 1 || (index === filterParams.entries -1)) ? '' : styles.underline}
                                            `}
                                        >
                                            <span className={styles.agent}>{maint.agent}</span>
                                            <span>{maint.area}</span>
                                            <span className={styles.equipment}>{maint.equipment}</span>
                                            <span className={styles.date}>{maint.date}</span>
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