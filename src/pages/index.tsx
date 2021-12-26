import { HomeButton } from 'components/button/home-button'
import { Logomarca } from 'components/logo'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import agentIcon from 'assets/agent-icon.svg'
import maintenanceIcon from 'assets/maintenance-icon.svg'
import areaIcon from 'assets/area-icon.svg'
import equipmentIcon from 'assets/equipment-icon.svg'
import { Header } from 'components/header'
import { useGlobalContext } from 'context'

const Home: NextPage = () => {
  const { agents } = useGlobalContext()

  console.log(agents);
  
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <HomeButton title="Manutenções" link='/manutencoes' icon={maintenanceIcon} />
        <HomeButton title="Agentes" link='/agentes' icon={agentIcon} />
        <HomeButton title="Áreas" link='/areas' icon={areaIcon} />
        <HomeButton title="Equipamentos" link='/equipamentos' icon={equipmentIcon} />
      </div>
    </div>
  )
}

export default Home
