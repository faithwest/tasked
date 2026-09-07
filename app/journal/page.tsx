import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { JournalContent } from "@/components/journal/journal-content"

export default function JournalPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block"><Sidebar /></div>
      <main className="flex-1 p-3 md:p-4 lg:p-5 lg:ml-64">
        <Header title="Journal" description="Make space for your thoughts, reviews, and personal notes." />
        <div className="mt-4 md:mt-5"><JournalContent /></div>
      </main>
    </div>
  )
}
