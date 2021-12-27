import { AgentList } from "components/agent"
import { Header } from "components/header"
import { useGlobalContext } from "context"
import { getAgents } from "global/api"
import { useEffect } from "react"
import styles from 'styles/home.module.scss'

const Agents = () => {
    const { agents, loadAgents } = useGlobalContext()

    useEffect(() => {
        agents.length === 0 && getAgentsData()
    }, [])
    
    const getAgentsData = async () => {
        const result = await getAgents()
        loadAgents(result)
    }

    return (
        <div className={styles.container}>
            <Header navigation/>
            <AgentList />
        </div>
    )
}

export default Agents