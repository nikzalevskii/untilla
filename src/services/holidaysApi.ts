import { Country, PublicHoliday } from "@/types";

const BASE_URL = 'https://date.nager.at/api/v3'

export async function fetchCountries(): Promise<Country[]> {
    const response = await fetch(`${BASE_URL}/availablecountries`)

    if (!response.ok) {
    throw new Error(`Failed to fetch countries: HTTP ${response.status}`)
    }

  return response.json()
}

export async function fetchHolidays(
  countryCode: string,
  year: number,
): Promise<PublicHoliday[]> {
  const response = await fetch(
    `${BASE_URL}/publicholidays/${year}/${countryCode}`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch holidays for ${countryCode}: HTTP ${response.status}`,
    )
  }

  return response.json()
}