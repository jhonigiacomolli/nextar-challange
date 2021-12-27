import { AgentList } from "components/agent"
import { EquipmentList } from "components/equipment"
import { Header } from "components/header"
import { useGlobalContext } from "context"
import { getAreas, getEquipments, getMaintenances } from "global/api"
import { useEffect } from "react"
import styles from 'styles/home.module.scss'

const Equipments = () => {
    const { areas, maintenances, equipments, loadAreas, loadMaintenances, loadEquipments } = useGlobalContext()

    useEffect(() => {
        equipments.length === 0 && getEquipmentsData()
        areas.length === 0 && getAreasData()
        maintenances.length === 0 && getMaintenacesData()
    }, [])
    
    const getEquipmentsData = async () => {
        const result = await getEquipments()        
        loadEquipments(result)
    }
    const getAreasData = async () => {
        const result = await getAreas()        
        loadAreas(result)
    }
    const getMaintenacesData = async () => {
        const result = await getMaintenances()        
        loadMaintenances(result)
    }
    
    return (
        <div className={styles.container}>
            <Header navigation/>
            <EquipmentList />
        </div>
    )
}

export default Equipments