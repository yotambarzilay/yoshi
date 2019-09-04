import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PublicDataContext, PublicDataType } from './PublicDataContext';

export class PublicData extends React.Component<
  InferProps<typeof PublicData.propTypes>
> {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <PublicDataContext.Consumer>
        {publicData => {
          return this.props.children(publicData);
        }}
      </PublicDataContext.Consumer>
    );
  }
}
