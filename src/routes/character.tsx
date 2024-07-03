import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { type Character, getCharacter } from 'rickmortyapi'

export async function CharacterLoader({ params }: LoaderFunctionArgs) {
  const id = Number(params.id ?? -1)

  try {
    const { data, status } = await getCharacter(id)
    return status == 200 ? data : undefined
  } catch {
    return undefined
  }
}

export function Character() {
  const character = useLoaderData() as Character | undefined

  console.log(character)

  if (!character) return <h2>Нет такого персонажа</h2>

  const bullets = [
    { text: 'Имя:', value: character.name },
    { text: 'Пол:', value: character.gender },
    { text: 'Местонахождения:', value: character.location.name },
    { text: 'Место рождения:', value: character.origin.name },
    { text: 'Вид:', value: character.species },
    { text: 'Тип:', value: character.type },
    { text: 'Статус:', value: character.status },
  ]

  return (
    <div className="grid items-center justify-items-center gap-3 rounded-xl border border-zinc-300 p-3 shadow-2xl md:grid-flow-col">
      <img src={character.image} alt="" className="rounded-lg" />
      <dl className="items-center gap-x-8 gap-y-2 justify-self-stretch font-medium text-zinc-400 sm:grid sm:grid-cols-2 sm:p-5">
        {bullets.map(({ text, value }) => (
          <Bullet key={text} text={text} value={value} />
        ))}
      </dl>
    </div>
  )
}

function Bullet({ text, value }: { text: string; value: string }) {
  return (
    <>
      <dt className="font-normal">{text}</dt>
      <dd className="mt-1 justify-self-end text-zinc-500 sm:mt-0 sm:text-right">
        {value}
      </dd>
      <div className="col-span-2 mb-3 border-b border-zinc-200 last:border-none sm:mb-0 sm:mt-0" />
    </>
  )
}
