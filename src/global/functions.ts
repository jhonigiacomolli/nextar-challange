export const revertDateString = (date: string) => {
    const dateSplit = date.split('/')
    return `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`
} 
export const searchParameterize = (value: string) => {    
    return  value.toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "") 
                .replace(/,/, '')
                .replace(/\./, '')
}