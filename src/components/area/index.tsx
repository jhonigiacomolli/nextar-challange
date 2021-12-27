import { PrimaryButton } from 'components/button/primary-button'
import { useGlobalContext } from 'context'
import { TYPE_Area } from 'global/types'
import { ChangeEvent, useState } from 'react'
import styles from './index.module.scss'

type ChangeOption = 'name' | 'block'

export const AreaList = () => {
    const { equipments, areas, newArea, updateArea, deleteArea } = useGlobalContext()
    const [area, setArea] = useState({
        id: 0,
        name: '',
        block: '',
    } as TYPE_Area)
    const [state, setState] = useState<'new' | 'edit' | 'details'>('new')
    const [modal, setModal] = useState(false)

    const handleChangeEquipment = (type: ChangeOption, event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if(state === 'edit') {
            setArea(old => {
                const ar: {[key in ChangeOption]: string | string[]} = { ...old }
                ar[type] = value
                const updatedArea = { ...ar } as TYPE_Area

                return updatedArea
            })
        }else {
            const index = Math.max.apply(null, areas.map(ag => ag.id))
            const ar: {[key in ChangeOption]: string | string[]} = { ...area }
            ar[type] = value
            const updatedArea = { ...ar } as TYPE_Area
            setArea({
                ...updatedArea,
                id: index + 1
            })
        }
    }
    const handleCreateEquipment = () => {
        if(area.name) {
            state === 'new' && newArea(area)
            state === 'edit' && updateArea(area)
            setArea({
                id: 0,  
                name: '',
                block: '',
            })
            setState('new')
            setModal(false)
        }
    } 

    const handleUpdateEquipment = (area: TYPE_Area) => {
        setState('edit')
        setModal(true)
        setArea(area)
    }

    const handleRemoveEquipment = (id: number) => {
        deleteArea(areas.filter(ag => ag.id === id)[0])
    }

    const handleDisplayDetails = (area: TYPE_Area) => {
        setArea(area)
        setState('details')
        setModal(true)
    }
    
    const handleCancelEdit= () => {
        setArea({
            id: 0,  
            name: '',
            block: '',
        })
        setState('new')
        setModal(false)
    }

    console.log(equipments
        .filter(equip => equip.locatedArea.includes(area.name)));
    

    return (
        <div className={styles.container}>
            <div className={styles.new}>
                {!modal && <PrimaryButton title="Adicionar novo" link='' onClick={() => setModal(true)} />}
                {modal && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            {state === 'new' && <h3>Adicionar equipamento</h3>}
                            {state === 'edit' && <h3>Editando: {area.name}</h3>}
                            <div>
                                <label htmlFor="description">
                                    Nome
                                    <input id='description' disabled={state === 'details'} type="text" value={area.name} onChange={(e) => handleChangeEquipment('name', e)}/>
                                </label>
                                <label htmlFor="register">
                                    Bloco
                                    <input id='registeer' disabled={state === 'details'} type="text" value={area.block} onChange={(e) => handleChangeEquipment('block', e)}/>
                                </label>
                                {state === 'details' && (
                                    <div>
                                        Equipamentos listados nessa área:
                                        <div className={styles.equipmentList}>
                                            {
                                                equipments
                                                .filter(equip => equip.locatedArea.includes(area.name))
                                                .map(equip => (
                                                    <p key={'equip-list' + equip.id}>
                                                        { equip.description }
                                                    </p>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                                <div className={styles.actions}>
                                    {state !== 'details' && (
                                        <PrimaryButton title={state === 'new' ? 'Adicionar' : 'Salvar'} link='' onClick={handleCreateEquipment} />
                                    )}
                                    <PrimaryButton className={styles.cancel} title='Cancelar' link='' onClick={handleCancelEdit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.content}>
                <div className={`${styles.areas} ${styles.header}`}>
                    <span className={styles.area}>Área</span>
                    <span className={styles.area}>Bloco</span>
                    <span></span>
                </div>
                {
                    areas.length > 0 
                    ? (
                        <div>
                            {
                                areas.map((ag, index, array) => (
                                    <div 
                                        key={index} 
                                        className={`
                                            ${styles.areas} 
                                            ${( array.length < 1 || (index ===  array.length -1)) ? '' : styles.underline}
                                        `}
                                    >
                                        <span className={styles.area}>{ag.name}</span>
                                        <span className={styles.area}>{ag.block}</span>
                                        <PrimaryButton 
                                            className={styles.action} 
                                            title='Detalhes' 
                                            onClick={() => handleDisplayDetails(ag)} 
                                        />
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
                    : <p>Não existem areaes cadastrados</p>
                }
            </div>
        </div>
    )
}