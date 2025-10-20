import React, { createContext, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { behaviors } from '~/constants/behaviors'

// Types
export type BehaviorLabel = (typeof behaviors)[number]['label']
export type BehaviorNameZh = (typeof behaviors)[number]['name']
export type BehaviorKey = BehaviorLabel

export type CountsRecord = Record<BehaviorKey, number>

export interface FocusCounts {
  HighlyFocused: number
  ModeratelyFocused: number
  LowFocused: number
}

export interface FocusPoint {
  time: string
  HighlyFocused: number
  ModeratelyFocused: number
  LowFocused: number
}

export interface SankeyLink {
  source: string
  target: string
  value: number
}

interface ClassVisionContextValue {
  now: number
  countsNow: CountsRecord
  countsMinuteAgo: CountsRecord
  focusNow: FocusCounts
  focusMinuteAgo: FocusCounts
  focusSeriesLastMinute: FocusPoint[]
  sankeyLinksMinuteAgoToNow: SankeyLink[]
}

const ClassVisionContext = createContext<ClassVisionContextValue | null>(null)

const LABEL_TO_NAME_ZH: Record<BehaviorLabel, BehaviorNameZh> = behaviors.reduce((acc, b) => {
  acc[b.label as BehaviorLabel] = b.name
  return acc
}, {} as Record<BehaviorLabel, BehaviorNameZh>)

const FOCUS_MAP: Record<keyof FocusCounts, BehaviorLabel[]> = {
  HighlyFocused: ['LookingUp', 'Standing'],
  ModeratelyFocused: ['LookingDown', 'LookingBack'],
  LowFocused: ['LyingOnDesk', 'UsingPhone'],
}

function emptyCounts(total = 0): CountsRecord {
  const rec = {} as CountsRecord
  behaviors.forEach((b) => {
    (rec as any)[b.label] = 0
  })
  // Optionally fill equal distribution when total > 0
  if (total > 0) {
    let remaining = total
    const n = behaviors.length
    behaviors.forEach((b, i) => {
      const portion = i === n - 1 ? remaining : Math.floor(total / n)
      ;(rec as any)[b.label] = portion
      remaining -= portion
    })
  }
  return rec
}

function countsToFocus(counts: CountsRecord): FocusCounts {
  return {
    HighlyFocused: FOCUS_MAP.HighlyFocused.reduce((s, k) => s + counts[k], 0),
    ModeratelyFocused: FOCUS_MAP.ModeratelyFocused.reduce((s, k) => s + counts[k], 0),
    LowFocused: FOCUS_MAP.LowFocused.reduce((s, k) => s + counts[k], 0),
  }
}

// Make a small-change step that preserves total sum.
function stepCounts(prev: CountsRecord, maxMoves = 3): CountsRecord {
  const next: CountsRecord = { ...prev }
  const moves = Math.floor(Math.random() * (maxMoves + 1)) // 0..maxMoves
  const labels = behaviors.map(b => b.label) as BehaviorLabel[]
  for (let m = 0; m < moves; m++) {
    // pick a source with count > 0
    const nonZero = labels.filter(l => next[l] > 0)
    if (nonZero.length === 0)
      break
    const i = nonZero[Math.floor(Math.random() * nonZero.length)]
    // pick a target (can be same? ensure different)
    const others = labels.filter(l => l !== i)
    const j = others[Math.floor(Math.random() * others.length)]
    next[i] -= 1
    next[j] += 1
  }
  return next
}

// Given previous and current counts (both sum to same total), construct a flow matrix satisfying row/col sums.
function computeFlows(prev: CountsRecord, curr: CountsRecord): SankeyLink[] {
  const labels = behaviors.map(b => b.label) as BehaviorLabel[]
  // Start with diagonal min allocations
  const prevRemain: Record<BehaviorLabel, number> = {} as any
  const colRemain: Record<BehaviorLabel, number> = {} as any
  labels.forEach((l) => {
    prevRemain[l] = prev[l]
    colRemain[l] = curr[l]
  })

  const links: SankeyLink[] = []

  // First assign diagonal
  labels.forEach((l) => {
    const stay = Math.min(prevRemain[l], colRemain[l])
    if (stay > 0) {
      prevRemain[l] -= stay
      colRemain[l] -= stay
      links.push({
        source: `前一分钟-${LABEL_TO_NAME_ZH[l]}`,
        target: `当前-${LABEL_TO_NAME_ZH[l]}`,
        value: stay,
      })
    }
  })

  // Distribute remaining row to remaining columns greedily
  const colsOrder = [...labels]
  labels.forEach((r) => {
    let remainingRow = prevRemain[r]
    if (remainingRow <= 0)
      return
    for (const c of colsOrder) {
      if (remainingRow <= 0)
        break
      const give = Math.min(remainingRow, colRemain[c])
      if (give > 0) {
        links.push({
          source: `前一分钟-${LABEL_TO_NAME_ZH[r]}`,
          target: `当前-${LABEL_TO_NAME_ZH[c]}`,
          value: give,
        })
        remainingRow -= give
        colRemain[c] -= give
      }
    }
  })

  return links
}

function nowString(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString('zh-CN', { minute: '2-digit', second: '2-digit' })
}

const TOTAL = 30

export function ClassVisionProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<{ ts: number, counts: CountsRecord }[]>([])
  const lastRef = useRef<CountsRecord>(emptyCounts(TOTAL))

  // Initialize initial counts randomly but sum to TOTAL
  const ensureInit = useCallback(() => {
    if (history.length === 0) {
      const base = emptyCounts(0)
      // Randomly assign TOTAL across categories
      let remaining = TOTAL
      const labels = behaviors.map(b => b.label) as BehaviorLabel[]
      while (remaining > 0) {
        const l = labels[Math.floor(Math.random() * labels.length)]
        base[l] = (base[l] || 0) + 1
        remaining--
      }
      lastRef.current = base
      setHistory([{ ts: Date.now(), counts: { ...base } }])
    }
  }, [history.length])

  useEffect(() => {
    ensureInit()
  }, [ensureInit])

  useEffect(() => {
    const timer = setInterval(() => {
      setHistory((prev) => {
        const last = (prev.length ? prev[prev.length - 1].counts : lastRef.current)
        const next = stepCounts(last, 3)
        lastRef.current = next
        const ts = Date.now()
        const nextHist = [...prev, { ts, counts: next }]
        // keep only last 60 seconds
        const prune = nextHist.slice(-60)
        return prune
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const now = history.length ? history[history.length - 1] : { ts: Date.now(), counts: emptyCounts(TOTAL) }
  const minuteAgo = history.length >= 60 ? history[0] : history[0] ?? now

  const focusSeriesLastMinute = useMemo<FocusPoint[]>(() => {
    return history.map((h) => {
      const f = countsToFocus(h.counts)
      return { time: nowString(h.ts), ...f }
    })
  }, [history])

  const value = useMemo<ClassVisionContextValue>(() => {
    const countsNow = now.counts
    const countsMinuteAgo = minuteAgo.counts
    const focusNow = countsToFocus(countsNow)
    const focusMinuteAgo = countsToFocus(countsMinuteAgo)
    const sankeyLinksMinuteAgoToNow = computeFlows(countsMinuteAgo, countsNow)

    return {
      now: now.ts,
      countsNow,
      countsMinuteAgo,
      focusNow,
      focusMinuteAgo,
      focusSeriesLastMinute,
      sankeyLinksMinuteAgoToNow,
    }
  }, [now, minuteAgo, focusSeriesLastMinute])

  return (
    <ClassVisionContext value={value}>
      {children}
    </ClassVisionContext>
  )
}

export function useClassVisionData() {
  const ctx = use(ClassVisionContext)
  if (!ctx)
    throw new Error('useClassVisionData must be used within ClassVisionProvider')
  return ctx
}
