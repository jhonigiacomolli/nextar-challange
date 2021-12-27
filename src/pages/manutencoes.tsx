import { AgentMaintenances } from 'components/maintenance-list-agent'
import { Maintenances } from 'components/maintanence/maintenances'
import { useGlobalContext } from 'context'
import { useEffect } from 'react'
import styles from '../styles/home.module.scss'
import { Logomarca } from 'components/logo'
import { getAgents, getMaintenances } from 'global/api'
import { PrimaryButton } from 'components/button/primary-button'
import { Header } from 'components/header'

const MaintenancesPage = () => {
  const { maintenances, agents, loadMaintenances, loadAgents } = useGlobalContext()

  const getData = async () => {
    if(agents.length === 0) {
      const result = await getAgents()
      loadAgents(result)
    }
    if(maintenances.length === 0) {
      const result  = await getMaintenances()
      loadMaintenances(result)
    }
  }

  useEffect(() => {
    getData()
  }, [])

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

