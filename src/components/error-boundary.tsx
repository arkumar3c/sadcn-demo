import * as React from "react"

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="text-foreground bg-background flex min-h-svh flex-col items-center justify-center gap-4 p-6">
          <p className="text-lg font-semibold">Something went wrong</p>
          <pre className="bg-muted max-w-full overflow-auto rounded-lg p-4 text-left text-sm whitespace-pre-wrap">
            {this.state.error.message}
          </pre>
          <button
            type="button"
            className="text-primary underline"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
