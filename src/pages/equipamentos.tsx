import { AgentList } from "components/agent-list"
import { EquipmentList } from "components/equipment-list"
import { Header } from "components/header"
import { useGlobalContext } from "context"
import { getEquipments } from "global/api"
import { useEffect } from "react"
import styles from 'styles/home.module.scss'

const Equipments = () => {
    const { equipments, loadEquipments } = useGlobalContext()

    useEffect(() => {
        equipments.length === 0 && getEquipmentsData()
    }, [])
    
    const getEquipmentsData = async () => {
        const result = await getEquipments()
        console.log(result);
        
        loadEquipments(result)
    }
    return (
        <div className={styles.container}>
            <Header navigation/>
            <EquipmentList />
        </div>
    )
}

export default Equipments