import React from 'react';
import createInstances from './createInstances';
import { getProcessedCss } from 'tpa-style-webpack-plugin/runtime';

const WidgetWrapper = UserComponent =>
  class ComponentWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      console.log(this.props.style);
      const css = getProcessedCss(this.props.style);
      console.log(css);

      return (
        <div>
          <link
            href="https://localhost:3200/viewerWidget.css"
            rel="stylesheet"
            type="text/css"
          />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <UserComponent
            {...createInstances(this.props.experiments)}
            {...this.props}
          />
        </div>
      );
    }
  };

export default WidgetWrapper;
