"use client"

import { useState } from "react"
import { BookOpen, CalendarDays, Check, Clock3, Heart, PenLine, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialEntries = [
  { date: "Yesterday", title: "A clear, focused day", preview: "Made good progress on the product launch and left room to reset." },
  { date: "Monday, Sep 7", title: "Starting with intention", preview: "Today I want to protect my creative time and celebrate small wins." },
]

export function JournalContent() {
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [mood, setMood] = useState("Good")
  const [saved, setSaved] = useState(false)
  const [entries, setEntries] = useState(initialEntries)

  const saveEntry = () => {
    if (!title.trim() && !note.trim()) return
    setEntries((current) => [
      { date: "Just now", title: title.trim() || "Daily reflection", preview: note.trim() || "A quiet moment to check in with myself." },
      ...current,
    ])
    setSaved(true)
    setTitle("")
    setNote("")
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)] gap-4">
        <Card className="border-border bg-card shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
            <div>
              <div className="flex items-center gap-2 text-primary mb-2"><PenLine className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-wider">Today&apos;s entry</span></div>
              <CardTitle className="text-xl">What&apos;s on your mind?</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Capture a thought, review your day, or make space for what matters.</p>
            </div>
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><BookOpen className="h-5 w-5" /></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give this entry a title" className="h-11 bg-background" />
            <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write your thoughts, a review of the day, or a personal note..." className="min-h-[260px] resize-y bg-background leading-7" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-4">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />Private to your journal</span>
              <Button onClick={saveEntry} className="gap-2"><Save className="h-4 w-4" />{saved ? "Saved" : "Save entry"}</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-sm">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Heart className="h-4 w-4 text-primary" />Daily check-in</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div><p className="text-sm font-medium mb-2">How are you feeling?</p><div className="flex flex-wrap gap-2">{["Great", "Good", "Okay", "Low"].map((option) => <Button key={option} type="button" variant={mood === option ? "default" : "outline"} onClick={() => setMood(option)} className="h-8 px-3 text-xs">{option}</Button>)}</div></div>
            <div className="rounded-xl bg-secondary/60 p-4"><p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">A gentle prompt</p><p className="text-sm leading-6 text-foreground">What is one thing you want to remember about today?</p></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="h-4 w-4" /><span>Monday, September 7, 2026</span></div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between"><div><CardTitle className="text-base">Recent entries</CardTitle><p className="text-sm text-muted-foreground mt-1">A small archive of your reflections.</p></div><Badge variant="secondary">{entries.length} entries</Badge></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">{entries.map((entry, index) => <article key={`${entry.date}-${index}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-colors"><div className="flex items-center justify-between gap-3 mb-2"><h3 className="font-semibold text-sm">{entry.title}</h3>{index === 0 && entry.date === "Just now" && <Check className="h-4 w-4 text-primary" />}</div><p className="text-xs text-muted-foreground mb-2">{entry.date}</p><p className="text-sm leading-6 text-muted-foreground">{entry.preview}</p></article>)}</CardContent>
      </Card>
    </div>
  )
}
