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

export { getMaintenances, getAgents }