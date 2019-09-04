import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { ControllerContext } from './ControllerContext';

export class Controller extends React.Component<
  InferProps<typeof Controller.propTypes>
> {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ControllerContext.Consumer>
        {controller => this.props.children(controller)}
      </ControllerContext.Consumer>
    );
  }
}
