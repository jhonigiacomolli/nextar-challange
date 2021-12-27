import { PrimaryButton } from 'components/button/primary-button'
import { useGlobalContext } from 'context'
import { Type_Maintenance } from 'global/types'
import { ChangeEvent, useState } from 'react'
import styles from './new-maintenance.module.scss'

type NewMaintenancesProps = {
    type: 'new' | 'edit' | 'details'
    state: boolean
    updateState: (state: boolean) => void
    data: Type_Maintenance
}
type ChangeOption = 'type' | 'equipment' | 'area' | 'date' | 'agent' | 'owner' | 'status'

export const NewMaintenance = ({ type, state, data, updateState }:NewMaintenancesProps) => {
    const { maintenances, equipments, areas, agents, newMaintenances, updateMaintenances } = useGlobalContext()
    const [maintenance, setMaintenance] = useState(data)

    const handleChangeMaintenance = (option: ChangeOption, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = event.target.value

        if(type === 'edit') {
            setMaintenance(old => {
                const maint: {[key in ChangeOption]: string} = { ...old }
                maint[option] = value
                const updatedMaintenance = { ...maint } as Type_Maintenance

                return updatedMaintenance
            })
        }else {
            const index = Math.max.apply(null, maintenances.map(ag => ag.id))            
            const maint: {[key in ChangeOption]: string | string[]} = { ...maintenance }
            maint[option] = value
            const updatedMaintenance = { ...maint } as Type_Maintenance
            setMaintenance({
                ...updatedMaintenance,
                status: 'Aberta',
                date: '',
                id: index + 1
            })
        }
    }

    const handleCreateMaintenance = () => {
        type === 'new' && newMaintenances(maintenance)
        type === 'edit' && updateMaintenances(maintenance)
        console.log(maintenance, type);
        
        setMaintenance({
            id: 0,
            type: 'preventiva',
            equipment: '',
            area: '',
            date: '',
            agent: '',
            owner: '',
            status: 'Aberta'
        })
        updateState(false)
    }

    const handleCancelEdit = () => {
        updateState(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {type === 'new' && <h2>Nova manutenção</h2>}
                {type === 'edit' && <h2>Atualizar manutenção</h2>}
                <label htmlFor="select-type">
                    Tipo:
                    <select name="select-type" id="select-type" disabled={type === 'details'} value={maintenance.type} onChange={(e) => handleChangeMaintenance('type', e)}>
                        <option value="empty">Selecione...</option>
                        <option value="corretiva">Corretiva</option>
                        <option value="preventiva">Preventiva</option>
                    </select>
                </label>
                <label htmlFor="select-equipment">
                    Equipamento:
                    <select name="select-equipment" id="select-equipment" disabled={type === 'details'} value={maintenance.equipment} onChange={(e) => handleChangeMaintenance('equipment', e)}>
                        <option value="empty">Selecione...</option>
                        {
                            equipments.map(equip => (
                                <option key={'equip' + equip.id} value={equip.description}>
                                    {equip.description}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="select-area">
                    Área:
                    <select name="select-area" id="select-area" disabled={type === 'details'} value={maintenance.area} onChange={(e) => handleChangeMaintenance('area', e)}>
                        <option value="empty">Selecione...</option>
                        {
                            areas.map(area => (
                                <option key={'area' + area.id} value={`${area.name} - ${area.block}`}>
                                    {`${area.name} - ${area.block}`}
                                </option>
                            ))
                        }
                    </select>
                </label>
                {type === 'details' && (
                    <label htmlFor="maintenance-date">
                        Data:
                        <input type="date" value={maintenance.date} disabled={type === 'details'}  onChange={(e) => handleChangeMaintenance('date', e)}/>
                    </label>
                )}
                <label htmlFor="select-maintenance-agent">
                    Agente de manutenção:
                    <select name="select-maintenance-agent" id="select-maintenance-agent" disabled={type === 'details'} value={maintenance.agent} onChange={(e) => handleChangeMaintenance('agent', e)}>
                        <option value="empty">Selecione...</option>
                        {
                            agents.map(ag => (
                                <option key={'ag' + ag.id} value={ag.agent}>
                                    {ag.agent}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="maintenance-owner">
                    Solicitante:
                    <input type="text" value={maintenance.owner} disabled={type === 'details'} onChange={(e) => handleChangeMaintenance('owner', e)} />
                </label>
                {type === 'details' && (
                    <label htmlFor="select-state">
                        Estado:
                        <input type="text" id="select-state" value={maintenance.status} disabled={type === 'details'} onChange={(e) => handleChangeMaintenance('status', e)} />
                    </label>
                )}
                <div className={styles.actions}>
                    {type !== 'details' && (
                        <PrimaryButton 
                            title={type === 'new' ? 'Adicionar' : 'Salvar'} 
                            link='' 
                            onClick={handleCreateMaintenance} 
                        />
                    )}
                    <PrimaryButton 
                        className={styles.cancel} 
                        title='Cancelar' 
                        link='' 
                        onClick={handleCancelEdit}
                    />
                </div>
            </div>
        </div>
    )
}