import { Breadcrumbs } from "~/components/drive/breadcrumbs"
import { Toolbar } from "~/components/drive/toolbar"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 flex flex-col gap-4">
        <Breadcrumbs parents={[]} />
        <Toolbar />
      </header>
      <div className="bg-card rounded-md border p-8 text-center">
        <h1 className="text-foreground mb-2 text-lg font-medium">
          Folder not found
        </h1>
        <p className="text-muted-foreground text-sm">
          The folder you’re looking for doesn’t exist or was moved.
        </p>
      </div>
    </main>
  )
}
