import { LoaderFunctionArgs } from 'react-router-dom'
import {
  Character,
  CharacterFilter,
  getEpisode,
  getCharacter,
  getCharacters,
  Info,
} from 'rickmortyapi'

export async function RootLoader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const page = Number(searchParams.get('page') ?? '1')
  const name = searchParams.get('name') ?? ''
  const species = searchParams.get('species') ?? ''
  const status = searchParams.get('status') ?? ''
  const episode = searchParams.get('episode') ?? ''

  let toBeReturned: {
    info: Partial<Info<Character[]>['info']>
    results: Info<Character[]>['results']
  }

  if (episode) {
    const {
      data: { characters },
    } = await getEpisode(+episode)
    const { data } = await getCharacter(
      characters.map((character) => Number(character.split('/').pop()))
    )

    const results = filterCharacters(data, { name, species, status })

    toBeReturned = {
      results,
      info: { count: results.length },
    }
  } else {
    const { data } = await getCharacters({ page, name, species, status })

    toBeReturned = {
      results: data.results ?? [],
      info: data.info,
    }
  }

  toBeReturned.results = toBeReturned.results?.filter(({ id }) => id) ?? []

  return toBeReturned
}

function filterCharacters(
  characters: Character[],
  options: Omit<CharacterFilter, 'page' | 'gender' | 'type'>
) {
  return characters.filter(({ name, species, status }) => {
    if (
      options.name &&
      !name.toLowerCase().includes(options.name.trim().toLowerCase())
    )
      return false
    if (options.status && status != options.status) return false
    if (options.species && species != options.species) return false

    return true
  })
}
