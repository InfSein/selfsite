const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex min-h-18.5 max-w-360 items-center justify-between gap-5 px-(--page-pad) py-4 font-mono text-[9.5px] tracking-[0.01em] text-muted">
        <span className="font-sans text-[13px] font-semibold tracking-[-0.035em] text-ink">
          InfSein
        </span>
        <span>© {CURRENT_YEAR}</span>
      </div>
    </footer>
  )
}
