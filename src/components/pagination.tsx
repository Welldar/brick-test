import { memo, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function Pagination({ pages }: { pages: number }) {
  const [pressed, setPressed] = useState(false)
  const [prevClientX, setPrevClientX] = useState(0)
  const [x, setX] = useState(0)
  const [allowClick, setAllowClick] = useState(true)
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', HandleUp)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', HandleUp)
    }

    function handleMove(e: PointerEvent) {
      if (pressed) {
        setX(x + e.clientX - prevClientX)
        setPrevClientX(e.clientX)
        setAllowClick(false)
      }
    }

    function HandleUp(e: PointerEvent) {
      e.preventDefault()

      if (ref.current) {
        if (x < -ref.current.scrollWidth)
          setX(-ref.current.scrollWidth + ref.current.offsetWidth)
        else if (x > ref.current.offsetWidth) setX(0)
      }

      setPressed(false)
      setAllowClick(true)
    }
  }, [pressed, x, prevClientX])

  const PageButtons = new Array(pages).fill(null).map((_, i) => {
    const page = i + 1

    return <PageButton page={page} key={i} />
  })

  return (
    <div className="flex items-center gap-2">
      <div className="cursor-pointer" onClick={(e) => setX(0)}>
        {'<<'}
      </div>
      <div
        className="flex-grow cursor-grab touch-none select-none overflow-hidden p-3"
        onPointerDown={(e) => {
          setPressed(true)
          e.nativeEvent.preventDefault()
          setPrevClientX(e.clientX)
        }}
      >
        <ul
          ref={ref}
          className={`flex gap-2 ${pressed ? '' : 'transition-transform'} ${allowClick ? '' : 'pointer-events-none'}`}
          style={{ transform: `translateX(${x}px)` }}
        >
          {PageButtons}
        </ul>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          if (ref.current)
            setX(-ref.current.scrollWidth + ref.current.offsetWidth)
        }}
      >
        {'>>'}
      </div>
    </div>
  )
}

const PageButton = memo(function PageButton({ page }: { page: number }) {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams()
  const currentPage = Number(URLSearchParams.get('page') ?? '1')

  return (
    <li
      onClick={() => {
        URLSearchParams.set('page', `${page}`)
        SetURLSearchParams(URLSearchParams)
      }}
      className={
        'min-w-7 flex-auto text-center hover:text-slate-200 ' +
        (currentPage == page ? 'pointer-events-none text-amber-300' : '')
      }
    >
      {page}
    </li>
  )
})
