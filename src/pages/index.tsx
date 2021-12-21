import { AgentMaintenances } from 'components/maintanence/agent-maintenance'
import { Maintenances } from 'components/maintanence/maintenances'
import { useGlobalContext } from 'context'
import { baseUrl } from 'global/api'
import { revertDateString } from 'global/functions'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  const { loadMaintenances } = useGlobalContext()

  const getMaintenances = async () => {
    const result = await fetch(baseUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await result.json()
    loadMaintenances(data)
  }
  
  useEffect(() => {
    getMaintenances()
  }, [])

  return (
    <div className={styles.container}>
      <AgentMaintenances agent='Jhoni Giacomolli' />
      <div className={styles.maintenances}>
        <Maintenances type='correction' />
        <Maintenances type='preventive' />
      </div>
    </div>
  )
}

export default Home
