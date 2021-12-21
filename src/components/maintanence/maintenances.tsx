import { useGlobalContext } from 'context'
import styles from './maintenances.module.scss'

type MaintenancesProps = {
    type: 'correction' | 'preventive'
}

export const Maintenances = ({ type }: MaintenancesProps) => {
    const { maintenances } = useGlobalContext()
    
    return (
        <div className={styles.container}>
            <h1>Manutenções Corretivas</h1>
            <div>
                {
                    maintenances.map(maint => (
                        maint.type === type && (
                            <div key={maint.id}>
                                <h3>{maint.owner}</h3>
                                <h4>{maint.equipment}</h4>
                                <p>{maint.status}</p>
                            </div>
                        )
                    ))
                }
            </div>
        </div>
    )
}