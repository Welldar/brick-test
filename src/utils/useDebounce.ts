import { useRef } from 'react'

export function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof window.setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export function useDebounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
) {
  const timeoutId = useRef<ReturnType<typeof window.setTimeout>>()

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
