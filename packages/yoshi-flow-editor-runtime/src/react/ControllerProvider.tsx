import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { ControllerContext } from './ControllerContext';

export class ControllerProvider extends React.Component<
  InferProps<typeof ControllerProvider.propTypes>
> {
  static propTypes = {
    data: PropTypes.object,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <ControllerContext.Provider value={this.props.data}>
        {this.props.children}
      </ControllerContext.Provider>
    );
  }
}
