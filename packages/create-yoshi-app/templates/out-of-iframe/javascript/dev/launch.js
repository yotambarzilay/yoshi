const puppeteer = require('puppeteer');

// Small script to run the viewer in React 16.9.0 so we can use hooks
puppeteer.launch({ devtools: true }).then(async browser => {
  const page = await browser.newPage();

  const cdp = await page.target().createCDPSession();

  await cdp.send('Network.setRequestInterception', {
    patterns: [
      {
        urlPattern:
          'https://static.parastorage.com/unpkg/react-dom@*/umd/react-dom.production.min.js',
      },
      {
        urlPattern:
          'https://static.parastorage.com/unpkg/react@*/umd/react.production.min.js',
      },
    ],
  });

  await cdp.on(
    'Network.requestIntercepted',
    async ({ interceptionId, request }) => {
      let url;

      if (request.url.includes('react-dom')) {
        url =
          'https://static.parastorage.com/unpkg/react-dom@16.9.0/umd/react-dom.production.min.js';
      } else if (request.url.includes('react')) {
        url =
          'https://static.parastorage.com/unpkg/react@16.9.0/umd/react.production.min.js';
      } else {
        url = request.url;
      }

      await cdp.send('Network.continueInterceptedRequest', {
        interceptionId,
        url,
      });
    },
  );

  await page.goto('https://ranywix.wixsite.com/mysite-8');
});
