import { LoaderFunctionArgs } from 'react-router-dom'
import {
  Character,
  CharacterFilter,
  getEpisode,
  getCharacter,
  getCharacters,
} from 'rickmortyapi'

export async function RootLoader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const page = Number(searchParams.get('page') ?? '1')
  const name = searchParams.get('name') ?? ''
  const species = searchParams.get('species') ?? ''
  const status = searchParams.get('status') ?? ''
  const episode = searchParams.get('episode') ?? ''

  if (episode) {
    const {
      data: { characters },
    } = await getEpisode(+episode)
    const { data } = await getCharacter(
      characters.map((character) => Number(character.split('/').pop()))
    )

    const results = filterCharacters(data, { name, species, status }).filter(
      ({ id }) => id
    )

    return {
      results: results.length > 0 ? results : undefined,
      info: { count: results.length },
    }
  }

  const { data } = await getCharacters({ page, name, species, status })
  const f = data.results?.filter(({ id }) => id) ?? []
  data.results = f.length > 0 ? f : undefined
  return data
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
