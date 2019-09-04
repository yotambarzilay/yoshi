import createInstances from './createInstances';
import { objectPromiseAll } from './utils';

export const connect = widgetContainer => async (
  controllerConfig,
  { store, ...platformAsyncData },
) => {
  function mapDispatchObject(mapDispatchToProps) {
    return Object.keys(mapDispatchToProps).reduce((acc, key) => {
      return {
        ...acc,
        [key]: (...args) => store.dispatch(mapDispatchToProps[key](...args)),
      };
    }, {});
  }

  const platformData = await objectPromiseAll(platformAsyncData);

  const {
    mapDispatchToProps,
    mapStateToProps,
    mapStateAndDispatchToCorvidApi,
  } = widgetContainer(controllerConfig, {
    store,
    ...createInstances(platformData),
  });

  const corvidApi = mapStateAndDispatchToCorvidApi(
    store.getState(),
    store.dispatch,
  );

  return {
    pageReady: async () => {
      const dispatchProps =
        typeof mapDispatchToProps === 'object'
          ? mapDispatchObject(mapDispatchToProps)
          : mapDispatchToProps(store.dispatch);

      const render = () => {
        const stateProps = mapStateToProps(store.getState());

        controllerConfig.setProps({
          platformData,
          ...stateProps,
          ...dispatchProps,
        });
      };

      store.subscribe(render);

      render();
    },
    exports: corvidApi,
  };
};
