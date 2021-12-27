import { AgentMaintenances } from 'components/maintenance-list-agent'
import { Maintenances } from 'components/maintanence/maintenances'
import { useGlobalContext } from 'context'
import { useEffect } from 'react'
import styles from '../styles/home.module.scss'
import { Logomarca } from 'components/logo'
import { getAgents, getAreas, getEquipments, getMaintenances } from 'global/api'
import { PrimaryButton } from 'components/button/primary-button'
import { Header } from 'components/header'

const MaintenancesPage = () => {
  const { equipments, maintenances, agents, areas, loadMaintenances, loadAgents, loadAreas, loadEquipments } = useGlobalContext()

  useEffect(() => {
    equipments.length === 0 && getEquipmentsData()
    areas.length === 0 && getAreasData()
    agents.length === 0 && getAgentsData()
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
  const getAgentsData = async () => {
    const result = await getAgents()        
    loadAgents(result)
  }

  return (
    <div className={styles.container}>
      <Header navigation/>
      <AgentMaintenances />
      <Maintenances type='corretiva' displayFilter />
      <Maintenances type='preventiva' />
    </div>
  )
}

export default MaintenancesPage

