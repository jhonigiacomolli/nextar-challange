import { AgentMaintenances } from 'components/maintenance-agent'
import { Maintenances } from 'components/maintanence/maintenances'
import { useGlobalContext } from 'context'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from '../styles/home.module.scss'
import { Logomarca } from 'components/logo'
import { getAgents, getMaintenances } from 'global/api'

const Home: NextPage = () => {
  const { loadMaintenances, loadAgents } = useGlobalContext()

  const getData = async () => {
    const maintenances  = await getMaintenances()
    const agents = await getAgents()

    loadMaintenances(maintenances)
    loadAgents(agents)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Logomarca />
      <AgentMaintenances />
      <div className={styles.maintenances}>
        <Maintenances type='correction' />
        <Maintenances type='preventive' />
      </div>
    </div>
  )
}

export default Home
