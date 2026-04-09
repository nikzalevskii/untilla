export type Country = {
    countryCode: string, 
    name: string
}

export type PublicHoliday = {
    date: string,
    localName: string,
    name: string,
    countryCode: string,
    fixed: boolean,
    global: boolean,
    types: string[]
}