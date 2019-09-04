import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { PublicDataContext, PublicDataType } from './PublicDataContext';

// Later it can be passed into a hook as `usePublicData(scope)`
const scope = 'COMPONENT';

export class PublicDataProviderViewer extends React.Component<
  InferProps<typeof PublicDataProviderViewer.propTypes>
> {
  static propTypes = {
    data: PropTypes.any.isRequired,
  };

  handleGetParam = (key: string): any => {
    try {
      return this.props.data[scope][key];
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  state = {
    value: {
      get: this.handleGetParam,
      set: () => {
        throw new Error(`you can't edit public data on viewer mode`);
      },
      ready: true,
      readyPromise: Promise.resolve(true),
      type: PublicDataType.ViewerPublicData,
    },
  };

  render() {
    return (
      <PublicDataContext.Provider value={this.state.value}>
        {this.props.children}
      </PublicDataContext.Provider>
    );
  }
}
