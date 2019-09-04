import * as fakeTpaResponse from './fake-tpa-response.json';

if (window.Wix && window.Wix.Utils.getViewMode() === 'standalone') {
  window.Wix = new (class WixMock {
    modelCache = {};
    siteColors;
    siteTextPresets;
    styleParams;

    constructor() {
      this.siteColors = fakeTpaResponse.res.siteColors;
      this.siteTextPresets = fakeTpaResponse.res.siteTextPresets;
      this.styleParams = fakeTpaResponse.res.style;
    }

    getComponentInfo() {
      return 'componentInfo';
    }

    getSiteInfo(cb) {
      cb({
        url: 'https://wix.com/my-site',
        baseUrl: 'https://wix.com/',
      });
    }

    addEventListener(eventName, cb) {
      console.log(eventName, cb);
    }

    Utils = {
      getViewMode() {
        return 'standalone';
      },
      getCompId() {
        return 'compId';
      },
      getUid() {
        return '123';
      },
      getLocale() {
        return 'en';
      },
      getDeviceType() {
        return 'desktop';
      },
      getInstanceValue() {
        return '';
      },
    };

    addEventListener = () => {};

    Events = {
      INSTANCE_CHANGED: 'INSTANCE_CHANGED',
      PUBLIC_DATA_CHANGED: 'PUBLIC_DATA_CHANGED',
    };

    Styles = {
      getSiteColors: cb => cb(this.siteColors),
      getSiteTextPresets: cb => cb(this.siteTextPresets),
      getStyleParams: cb => cb(this.styleParams),
      getStyleId: cb => cb('style-jp8ide5x'),
    };

    Data = {
      Public: {
        getAll: cb => cb({}),
        set: () => {},
      },
    };
  })();
}
