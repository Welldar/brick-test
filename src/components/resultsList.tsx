import { useLoaderData } from 'react-router-dom'
import { Character, Info } from 'rickmortyapi'
import { ResultsItem } from './resultsItem'
import { Pagination } from './pagination'

export function ResultsList() {
  const { info, results } = useLoaderData() as Info<Character[]>
  const pages = info?.pages

  return (
    <div>
      <h2>Найдено {info?.count}</h2>
      <ul>
        {results?.map(({ name, image, species, status, id }) => (
          <ResultsItem
            key={id}
            id={id}
            name={name}
            image={image}
            species={species}
            status={status}
          />
        ))}
      </ul>
      {pages && <Pagination pages={pages} />}
    </div>
  )
}
