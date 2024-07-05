import { useSearchParams } from 'react-router-dom'
import { AsyncInput } from './asyncInput'
import { Input } from './Input'
import { Select } from './select'

type FormControllerProps<
  T extends typeof AsyncInput | typeof Input | typeof Select,
> = {
  Controller: T
  className: string
  id: string
  labelTxt: string
}

type PolymorphicProps<
  T extends typeof AsyncInput | typeof Input | typeof Select,
> = FormControllerProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof FormControllerProps<T>>

export function FormController<
  T extends typeof AsyncInput | typeof Input | typeof Select,
>({ Controller, className, id, labelTxt, ...props }: PolymorphicProps<T>) {
  const [URLSearchParams] = useSearchParams()

  return (
    <div className={className}>
      <label htmlFor={id}>{labelTxt}</label>
      {/* @ts-expect-error: FIXME this used to work in TypeScript 4.x but not anymore */}
      <Controller
        defaultValue={URLSearchParams.get(id) ?? ''}
        id={id}
        {...props}
      />
    </div>
  )
}
