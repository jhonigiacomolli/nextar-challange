import { PrimaryButton } from 'components/button/primary-button'
import { useGlobalContext } from 'context'
import { TYPE_Equipments } from 'global/types'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'

type ChangeOption = 'description' | 'locatedArea' | 'maintenances' | 'model' | 'nextMaintenance' | 'observations' | 'register'

export const EquipmentList = () => {
    const { equipments, newEquipment, updateEquipment, deleteEquipment } = useGlobalContext()
    const [equipment, setEquipment] = useState({
        id: 0,
        description: '',
        locatedArea: '',
        maintenances: [],
        model: '',
        nextMaintenance: '',
        observations: '',
        register: ''
    } as TYPE_Equipments)
    const [state, setState] = useState<'new' | 'edit'>('new')
    const [modal, setModal] = useState(false)

    const handleChangeEquipment = (type: ChangeOption, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value

        if(state === 'edit') {
            setEquipment(old => {
                const equip: {[key in ChangeOption]: string | string[]} = { ...old }
                equip[type] = value
                const updatedEquip = { ...equip } as TYPE_Equipments

                return updatedEquip
            })
        }else {
            const index = Math.max.apply(null, equipments.map(ag => ag.id))
            const equip: {[key in ChangeOption]: string | string[]} = { ...equipment }
            equip[type] = value
            const updatedEquip = { ...equip } as TYPE_Equipments
            setEquipment({
                ...updatedEquip,
                id: index + 1
            })
        }
    }
    const handleCreateEquipment = () => {
        if(equipment.description) {
            state === 'new' && newEquipment(equipment)
            state === 'edit' && updateEquipment(equipment)
            setEquipment({
                id: 0,  
                description: '',
                locatedArea: '',
                maintenances: [],
                model: '',
                nextMaintenance: '',
                observations: '',
                register: ''
            })
            setState('new')
            setModal(false)
        }
    } 

    const handleUpdateEquipment = (equipment: TYPE_Equipments) => {
        setState('edit')
        setModal(true)
        setEquipment(equipment)
    }

    const handleRemoveEquipment = (id: number) => {
        deleteEquipment(equipments.filter(ag => ag.id === id)[0])
    }

    const handleCancelEdit= () => {
        setEquipment({
            id: equipments.length,  
            description: '',
            locatedArea: '',
            maintenances: [],
            model: '',
            nextMaintenance: '',
            observations: '',
            register: ''
        })
        setState('new')
        setModal(false)
    }

    return (
        <div className={styles.container}>
            <div className={styles.new}>
                {!modal && <PrimaryButton title="Adicionar novo" link='' onClick={() => setModal(true)} />}
                {modal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div>
                                <label htmlFor="description">
                                    Descrição
                                    <input id='description' type="text" value={equipment.description} onChange={(e) => handleChangeEquipment('description', e)}/>
                                </label>
                                <label htmlFor="area">
                                    Área
                                    <input id='area' type="text" value={equipment.locatedArea} onChange={(e) => handleChangeEquipment('locatedArea', e)}/>
                                </label>
                                <label htmlFor="register">
                                    Registor
                                    <input id='registeer' type="text" value={equipment.register} onChange={(e) => handleChangeEquipment('register', e)}/>
                                </label>
                                <label htmlFor="next-maintenance">
                                    Próxima Manutenção
                                    <input id='next-maintenance' type="text" value={equipment.nextMaintenance} onChange={(e) => handleChangeEquipment('nextMaintenance', e)}/>
                                </label>
                                <label htmlFor="model">
                                    Modelo
                                    <input id='model' type="text" value={equipment.model} onChange={(e) => handleChangeEquipment('model', e)}/>
                                </label>
                                <label htmlFor="observations">
                                    Observações
                                    <textarea id='observations' value={equipment.observations} onChange={(e) => handleChangeEquipment('observations', e)}/>
                                </label>
                                <div className={styles.actions}>
                                    <PrimaryButton title={state === 'new' ? 'Adicionar' : 'Salvar'} link='' onClick={handleCreateEquipment} />
                                    <PrimaryButton className={styles.cancel} title='Cancelar' link='' onClick={handleCancelEdit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={`${styles.equipments} ${styles.header}`}>
                    <span className={styles.equipment}>equipmentes</span>
                </div>
                {
                    equipments.length > 0 
                    ? (
                        <div>
                            {
                                equipments.map((ag, index, array) => (
                                    <div 
                                        key={index} 
                                        className={`
                                            ${styles.equipments} 
                                            ${( array.length < 1 || (index ===  array.length -1)) ? '' : styles.underline}
                                        `}
                                    >
                                        <span className={styles.equipment}>{ag.description}</span>
                                        <PrimaryButton 
                                            className={styles.action} 
                                            title='Editar' 
                                            onClick={() => handleUpdateEquipment(ag)} 
                                        />
                                        <PrimaryButton 
                                            className={styles.action} 
                                            title='Excluir' 
                                            onClick={() => handleRemoveEquipment(ag.id)} 
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )
                    : <p>Não existem equipmentes cadastrados</p>
                }
            </div>
        </div>
    )
}