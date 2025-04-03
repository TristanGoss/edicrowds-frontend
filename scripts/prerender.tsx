// Pre-render some SPA pages so that Google can index them.
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppPagesForPrerender } from '../src/AppPagesForPrerender';

const pages = [
  { path: '/contact', file: 'contact.html' },
  { path: '/privacy', file: 'privacy.html' },
  { path: '/about', file: 'about.html' },
  { path: '/how', file: 'how.html' },
  { path: '/terms', file: 'terms.html' }
];

const outputDir = path.resolve('dist');

for (const page of pages) {
  const html = renderToString(
    React.createElement(StaticRouter, { location: page.path },
      React.createElement(AppPagesForPrerender)
    )
  );

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${page.path.slice(1)} - Edinburgh Crowds</title>
    <meta name="robots" content="index,follow" />
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`;

  fs.writeFileSync(path.join(outputDir, page.file), fullHtml);
  console.log(`Pre-rendered ${page.file}`);
}
