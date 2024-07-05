import React, { forwardRef } from 'react'

export const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { icon?: React.ReactElement; leftCol?: React.ReactElement }
>(function Input(props, ref) {
  const { icon, leftCol, ...inputProps } = props
  return (
    <div className="flex items-center gap-2 rounded-xl border border-zinc-400 p-2 text-zinc-500 focus-within:ring-2 focus-within:ring-offset-teal-400">
      {leftCol}
      <input
        {...inputProps}
        ref={ref}
        className={`w-full outline-none ${props.className}`}
      />
      {icon}
    </div>
  )
})
