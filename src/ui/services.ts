import { createContext, useContext } from 'react'
import { Services } from '../services';

export const ServicesContext = createContext<Services>(undefined as any)

export function useServices() {
  const services = useContext(ServicesContext)

  if (services === undefined) console.error('Looks like services were used outside provided context.')

  return services!
}
