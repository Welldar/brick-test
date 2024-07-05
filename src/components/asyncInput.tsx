import { useEffect, useState } from 'react'
import { getEpisodes, getEpisode, Episode } from 'rickmortyapi'
import { Input } from './Input'
import { debounce } from '../utils/useDebounce'

const debouncedFetchTags = debounce(async function fetchTags(
  rawValue: string,
  callback: React.Dispatch<React.SetStateAction<Episode[] | undefined>>
) {
  const value = rawValue.trim().toLowerCase()
  const isNumber = value == '' ? false : !Object.is(Number(value), NaN)

  let results: Episode[] | undefined

  if (isNumber) {
    const episode = await getEpisode(+value)
    results = [episode.data]
  } else if (value.startsWith('s0')) {
    const episodes = await getEpisodes({ episode: value })
    results = episodes.data.results
  } else {
    const episodes = await getEpisodes({ name: value })
    results = episodes.data.results
  }

  results = results?.filter(({ id }) => id) ?? []

  callback(results.length > 0 ? results : undefined)
}, 200)

export function AsyncInput({
  id,
  onChangeHandler,
  defaultValue = '',
}: {
  id: string
  onChangeHandler?: (name: string, value: string) => void
  defaultValue?: string
}) {
  const [episodes, setEpisodes] = useState<Episode[]>()
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    const fetchInitialValues = async () => {
      if (defaultValue) {
        const {
          data: { episode },
        } = await getEpisode(+defaultValue)

        setValue(episode)
      }
      const {
        data: { results },
      } = await getEpisodes()

      setEpisodes(results)
    }

    fetchInitialValues()
  }, [defaultValue])

  return (
    <div className="group relative">
      <Input
        id={id}
        type="text"
        defaultValue={value}
        leftCol={
          <div className="flex h-full min-w-28 items-center gap-2 border-r-2 text-center text-zinc-400">
            <span
              className="rotate-45 cursor-pointer text-3xl leading-[1]"
              onClick={() => {
                onChangeHandler?.(id, ``)
                setValue('')
              }}
            >
              +
            </span>
            {value}
          </div>
        }
        onChange={async (e) => debouncedFetchTags(e.target.value, setEpisodes)}
      />

      <ul
        tabIndex={0}
        className="invisible absolute z-10 mt-1 flex max-h-64 w-full flex-wrap justify-center gap-2 overflow-y-scroll rounded-md border border-zinc-200 bg-white p-2 shadow [scrollbar-width:thin] group-focus-within:visible"
      >
        {episodes
          ? episodes.map(({ name, id: key, episode }) => (
              <Tag
                episode={episode}
                name={name}
                key={key}
                onClickHandler={(e) => {
                  e.currentTarget.parentElement?.blur()
                  onChangeHandler?.(id, `${key}`)
                  setValue(episode)
                }}
              />
            ))
          : 'Ничего не найдено'}
      </ul>
    </div>
  )
}

function Tag({
  episode,
  name,
  onClickHandler,
}: {
  episode: string
  name: string
  onClickHandler: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}) {
  return (
    <li
      className="flex-auto cursor-pointer rounded-3xl border px-3 py-1 text-center hover:bg-slate-200"
      onClick={onClickHandler}
    >
      <span className="mr-2 text-sm lowercase text-zinc-500 empty:mr-0">
        {episode}
      </span>
      {name}
    </li>
  )
}
