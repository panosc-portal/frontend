import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

const ErrorFallback = ({error, componentStack, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ui = props => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    {props.children}
  </ErrorBoundary>
)

export default ui
