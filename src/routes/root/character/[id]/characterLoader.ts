import { LoaderFunctionArgs } from 'react-router-dom'
import { getCharacter } from 'rickmortyapi'

export async function CharacterLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id ?? -1)

  const { data } = await getCharacter(id)

  return data.id ? data : null
}
