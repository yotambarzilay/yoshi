import React from 'react';
import { PublicData } from 'yoshi-flow-editor-runtime';

export default () => {
  return (
    <div>
      <h2>Set Title</h2>
      <PublicData>
        {publicData => {
          const title = publicData.get('title');
          return (
            <input
              type="text"
              value={title}
              onChange={event => publicData.set('title', event.target.value)}
            />
          );
        }}
      </PublicData>
    </div>
  );
};
