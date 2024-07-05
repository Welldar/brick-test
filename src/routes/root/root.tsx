import { useSearchParams } from 'react-router-dom'
import { ResultsList } from '../../components/resultsList'
import { AsyncInput } from '../../components/asyncInput'
import { Select } from '../../components/select'
import { Input } from '../../components/Input'
import { useDebounce } from '../../utils/useDebounce'
import React from 'react'
import { FormController } from '../../components/formController'

const species = [
  '',
  'Human',
  'Alien',
  'Humanoid',
  'unknown',
  'Poopybutthole',
  'Mythological Creature',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
]

export function Root() {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()

  const onChangeHandler = (name: string, value: string) => {
    URLSearchParams.set(name, value)
    URLSearchParams.delete('page')
    SetURLSearchParams(URLSearchParams)
  }

  const debouncedChangeHandler = useDebounce(onChangeHandler, 600)

  return (
    <div className="w-full">
      <form
        spellCheck="false"
        autoComplete="off"
        className="my-8 grid grid-cols-2 gap-4 text-zinc-600"
      >
        <FormController
          Controller={Input}
          id="name"
          className="col-span-2"
          labelTxt="Имя персонажа"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            debouncedChangeHandler(e.target.id, e.target.value)
          }
        />
        <FormController
          Controller={Select}
          id="status"
          className="col-span-2 sm:col-span-1"
          labelTxt="Жив?"
          onChangeHandler={onChangeHandler}
          options={['', 'Alive', 'Dead', 'unknown']}
        />
        <FormController
          Controller={Select}
          id="species"
          className="col-span-2 sm:col-span-1"
          labelTxt="Раса"
          onChangeHandler={onChangeHandler}
          options={species}
        />
        <FormController
          Controller={AsyncInput}
          className="col-span-2"
          id="episode"
          labelTxt="Эпизод"
          onChangeHandler={onChangeHandler}
        />
      </form>

      <ResultsList />
    </div>
  )
}
