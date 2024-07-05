import { Link } from 'react-router-dom'
import { Character } from 'rickmortyapi'

export function ResultsItem({
  name,
  image,
  species,
  status,
  id,
}: Pick<Character, 'name' | 'image' | 'species' | 'status' | 'id'>) {
  return (
    <li className="my-2">
      <Link
        className="grid grid-cols-[max-content_minmax(50px,200px)_repeat(2,1fr)] flex-wrap items-center justify-items-center gap-4 rounded-xl border border-zinc-300 p-2 text-center shadow-sm hover:bg-zinc-300"
        to={`/character/${id}`}
      >
        <img
          src={image}
          width={300}
          height={300}
          alt=""
          className="size-12 justify-self-start rounded-full"
        />
        <div>{name}</div>
        <div className="hidden sm:block">{species}</div>
        <div>{status}</div>
      </Link>
    </li>
  )
}
