import { TYPE_Agent, TYPE_Equipments } from "./types"

const baseUrl = 'http://localhost:3001'

const getMaintenances = async () => {
    const result = await fetch(baseUrl + '/maintenances', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await result.json()
  }

const getAgents = async () => {
    const result = await fetch(baseUrl + '/agents', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await result.json()
}

const createAgent = async (agent: TYPE_Agent) => {
  const result = await fetch(baseUrl +  '/agents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agent)
  })
    
  return await result
}
const editAgent = async (agent: TYPE_Agent) => {
  const result = await fetch(baseUrl +  '/agents/' + agent.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(agent)
  })
  console.log(result);
  
  return await result
}

const removeAgent = async (id: number) => {
  const result = await fetch(baseUrl +  `/agents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await result
}

const getAreas = async () => {
  const result = await fetch(baseUrl + '/areas', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await result.json()
}

const getEquipments = async () => {
  const result = await fetch(baseUrl + '/equipments', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await result.json()
}

const createEquipment = async (equipment: TYPE_Equipments) => {
  const result = await fetch(baseUrl +  '/equipments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(equipment)
  })
    
  return await result
}
const editEquipment = async (equipment: TYPE_Equipments) => {
  const result = await fetch(baseUrl +  '/equipments/' + equipment.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(equipment)
  })
  
  return await result
}

const removeEquipment = async (id: number) => {
  const result = await fetch(baseUrl +  `/equipments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await result
}

export { 
  getMaintenances, 
  getAgents, 
  createAgent, 
  editAgent, 
  removeAgent, 
  getAreas, 
  getEquipments, 
  createEquipment, 
  editEquipment, 
  removeEquipment 
}