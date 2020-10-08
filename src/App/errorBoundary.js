import React from 'react'

import {ErrorBoundary} from 'react-error-boundary'

import {Card} from '../Primitives'

const ui = props => {
  const ErrorFallback = ({error, componentStack, resetErrorBoundary}) => {
    return (
      <Card role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <pre>{componentStack}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </Card>
    )
  }
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default ui
