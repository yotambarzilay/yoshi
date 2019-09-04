import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

export class ErrorBoundary extends React.Component<
  InferProps<typeof ErrorBoundary.propTypes>
> {
  static propTypes = {
    handleException: PropTypes.func.isRequired,
  };

  componentDidCatch(error: Error) {
    this.props.handleException(error);
  }

  render() {
    return this.props.children;
  }
}
