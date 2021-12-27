import { AreaList } from "components/area"
import { Header } from "components/header"
import { useGlobalContext } from "context"
import { getAreas, getEquipments } from "global/api"
import { useEffect } from "react"
import styles from 'styles/home.module.scss'

const Areas = () => {
    const { areas, equipments, loadAreas, loadEquipments } = useGlobalContext()

    useEffect(() => {
        areas.length === 0 && getEquipmentsData()
        equipments.length === 0 && getAreasData()
    }, [])
    
    const getAreasData = async () => {
        const result = await getAreas()        
        loadAreas(result)
    }

    const getEquipmentsData = async () => {
        const result = await getEquipments()
        console.log(result);
        
        loadEquipments(result)
    }


    return (
        <div className={styles.container}>
            <Header navigation/>
            <AreaList />
        </div>
    )
}

export default Areas