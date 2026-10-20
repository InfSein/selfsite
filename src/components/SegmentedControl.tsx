interface SegmentedOption<T extends string> {
  value: T
  label: string
  ariaLabel?: string
  lang?: string
}

interface SegmentedControlProps<T extends string> {
  label: string
  value: T
  options: SegmentedOption<T>[]
  onChange: (value: T) => void
  mono?: boolean
}

export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  mono = false,
}: SegmentedControlProps<T>) {
  return (
    <div
      className="seg-switch inline-flex items-center gap-0.5"
      role="group"
      aria-label={label}
    >
      {options.map((option) => {
        const active = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            lang={option.lang}
            aria-label={option.ariaLabel}
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={`seg-switch__btn grid h-6 place-items-center rounded-full leading-none transition-[background-color,color] duration-200 phone-down:h-5.75 ${
              mono
                ? 'min-w-6.75 px-1.25 font-mono text-[9px] phone-down:min-w-6 phone-down:text-[8.5px]'
                : 'px-1.5 text-[10px] phone-down:text-[9.5px]'
            } ${
              active
                ? 'bg-accent text-on-accent'
                : 'text-muted hover:bg-surface-alt hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
