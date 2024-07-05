import { LoaderFunctionArgs } from 'react-router-dom'
import { getCharacter } from 'rickmortyapi'

export async function CharacterLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id ?? -1)

  try {
    const { data, status } = await getCharacter(id)
    return status == 200 ? data : undefined
  } catch {
    return undefined
  }
}
