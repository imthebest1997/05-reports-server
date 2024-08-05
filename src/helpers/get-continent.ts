import { continents } from "@prisma/client";

export enum Continent {
    Africa,
    Antarctica,
    Asia,
    Europe,
    Oceania,
    NorthAmerica = 'North America',
    SouthAmerica = 'South America'
}

// listado de continentes
export const continentsList = Object.values(Continent).filter(value => typeof value === 'string');

// Como obtener la enumeracion de un continente
export const getContinent = (continent: string): continents => {
    if (continent.toLowerCase() === 'north america') {
        return 'North_America';
    } else if (continent.toLowerCase() === 'south america') {
        return 'South_America';
    }

    return continentsList.find(c => c.toLowerCase() === continent.toLowerCase()) as continents;
}