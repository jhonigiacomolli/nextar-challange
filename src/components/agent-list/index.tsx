import { PrimaryButton } from 'components/button/primary-button'
import { useGlobalContext } from 'context'
import { TYPE_Agent } from 'global/types'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'

export const AgentList = () => {
    const { agents, newAgents, updateAgents, deleteAgents } = useGlobalContext()
    const [agent, setAgent] = useState({} as TYPE_Agent)
    const [state, setState] = useState<'new' | 'edit'>('new')

    const handleChangeAgent = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if(state === 'edit') {
            setAgent(old => ({
                ...old,
                agent: value
            }))
        }else {
            const index = Math.max.apply(null, agents.map(ag => ag.id))
            setAgent({
                id: index + 1,
                agent: value
            })
        }
    }
    const handleCreateAgent = () => {
        if(agent.agent) {
            state === 'new' && newAgents(agent)
            state === 'edit' && updateAgents(agent)
            setAgent({
                id: agents.length,  
                agent: ''
            })
            setState('new')
        }
    } 

    const handleUpdateAgent = (agent: TYPE_Agent) => {
        setState('edit')
        setAgent(agent)
    }

    const handleRemoveAgent = (id: number) => {
        deleteAgents(agents.filter(ag => ag.id === id)[0])
    }

    const handleCancelEdit= () => {
        setAgent({
            id: 0,
            agent: ''
        })
        setState('new')
    }

    return (
        <div className={styles.container}>
            <div className={styles.new}>
                {state === 'new' && <span>Adicione um novo agente:</span>}
                {state === 'edit' && <span>Edite este agente:</span>}
                <div>
                    <input type="text" value={agent.agent} onChange={handleChangeAgent}/>
                    <PrimaryButton title={state === 'new' ? 'Adicionar' : 'Salvar'} link='' onClick={handleCreateAgent}/>
                    {state === 'edit' && (
                        <PrimaryButton className={styles.cancel} title='Cancelar' link='' onClick={handleCancelEdit}/>
                    )}
                </div>
            </div>
            <div className={styles.content}>
                <div className={`${styles.agents} ${styles.header}`}>
                    <span className={styles.agent}>Agentes</span>
                </div>
                {
                    agents.length > 0 
                    ? (
                        <div>
                            {
                                agents.map((ag, index, array) => (
                                    <div 
                                        key={index} 
                                        className={`
                                            ${styles.agents} 
                                            ${( array.length < 1 || (index ===  array.length -1)) ? '' : styles.underline}
                                        `}
                                    >
                                        <span className={styles.agent}>{ag.agent}</span>
                                        <PrimaryButton className={styles.action} title='Editar' onClick={() => handleUpdateAgent(ag)} />
                                        <PrimaryButton className={styles.action} title='Excluir' onClick={() => handleRemoveAgent(ag.id)} />
                                    </div>
                                ))
                            }
                        </div>
                    )
                    : <p>Não existem agentes cadastrados</p>
                }
            </div>
        </div>
    )
}