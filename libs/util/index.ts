import { LatLng } from './types'

import { twMerge } from "tailwind-merge"
import { clsx, type ClassValue } from "clsx"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const isLatLng = (obj?: Partial<LatLng> | null): obj is LatLng => {
  return obj?.lat !== undefined && obj?.lng !== undefined
}