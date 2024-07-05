import { useRef, useState } from 'react'
import { ListIcon } from './listIcon'
import { Input } from './Input'

export function Select({
  options,
  id,
  onChangeHandler,
  defaultValue = '',
}: {
  options?: string[]
  id: string
  onChangeHandler?: (name: string, value: string) => void
  defaultValue?: string
}) {
  const [value, setValue] = useState(defaultValue)
  const [opened, setOpened] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  return (
    <div
      onClick={() => {
        setOpened(!opened)
        ref.current?.focus()
      }}
      className="relative select-none text-zinc-600"
    >
      <Input
        ref={ref}
        onBlur={() => setOpened(false)}
        readOnly
        id={id}
        value={value}
        type="text"
        icon={<ListIcon />}
      />

      {opened ? (
        <ul
          onPointerDown={(e) => e.preventDefault()}
          className="absolute z-10 mt-1 max-h-64 w-full divide-y overflow-y-scroll rounded-md border border-zinc-200 bg-white shadow [scrollbar-width:thin]"
        >
          {options?.map((value, ind) => (
            <li
              key={ind}
              onClick={() => {
                setValue(value)
                onChangeHandler?.(id, value)
                setOpened(false)
              }}
              className="h min-h-14 cursor-pointer px-3 py-4 hover:bg-slate-100"
            >
              {value}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
