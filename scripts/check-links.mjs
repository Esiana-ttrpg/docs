import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromHtml } from 'hast-util-from-html';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://esiana-ttrpg.github.io';
const base = '/docs/';
const pages = new Map();
const errors = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(filename);
    else if (entry.name.endsWith('.html')) {
      const tree = fromHtml(await readFile(filename, 'utf8'));
      const ids = new Set();
      const links = [];
      function visit(node) {
        const props = node.properties ?? {};
        if (props.id) ids.add(String(props.id));
        for (const key of ['href', 'src', 'poster']) {
          if (key === 'href' && props.rel?.includes('canonical')) continue;
          if (typeof props[key] === 'string') links.push(props[key]);
        }
        if (props.srcSet) {
          for (const candidate of String(props.srcSet).split(',')) links.push(candidate.trim().split(/\s+/)[0]);
        }
        for (const child of node.children ?? []) visit(child);
      }
      visit(tree);
      pages.set(filename, { ids, links });
    }
  }
}

await walk(output);
for (const [filename, { links }] of pages) {
  const relative = path.relative(output, filename).replaceAll('\\', '/');
  const source = new URL(base + relative.replace(/index\.html$/, ''), origin);
  for (const link of links) {
    const url = new URL(link, source);
    if (url.origin !== origin) continue;
    if (!url.pathname.startsWith(base)) {
      errors.push(`${relative}: link escapes /docs/: ${link}`);
      continue;
    }
    let target = path.resolve(output, '.' + decodeURIComponent(url.pathname.slice('/docs'.length)));
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) {
        errors.push(`${relative}: missing anchor: ${link}`);
      }
    } catch {
      errors.push(`${relative}: missing target: ${link}`);
    }
  }
}

const content = fileURLToPath(new URL('../src/content/docs/', import.meta.url));
async function countMarkdown(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) count += await countMarkdown(path.join(directory, entry.name));
    else if (/\.mdx?$/.test(entry.name)) count++;
  }
  return count;
}
const expected = await countMarkdown(content);
if (pages.size !== expected + 1) errors.push(`Expected ${expected} documentation pages plus the 404 page; found ${pages.size}.`);
const editedSources = new Set();
for (const [filename, page] of pages) {
  if (filename === path.join(output, '404.html')) continue;
  const relative = path.relative(output, filename).replaceAll('\\', '/');
  const prefix = 'https://github.com/Esiana-ttrpg/docs/edit/main/src/content/docs/';
  const edits = page.links.filter((link) => link.startsWith(prefix));
  if (edits.length !== 1) {
    errors.push(`${relative}: expected one GitHub edit link, found ${edits.length}`);
    continue;
  }
  const source = decodeURIComponent(edits[0].slice(prefix.length));
  try {
    await stat(path.join(content, source));
    if (editedSources.has(source)) errors.push(`${relative}: duplicate source edit link: ${source}`);
    editedSources.add(source);
  } catch { errors.push(`${relative}: edit link points to missing source: ${source}`); }
}
for (const asset of ['pagefind/pagefind.js', 'pagefind/pagefind-entry.json']) {
  try { await stat(path.join(output, asset)); }
  catch { errors.push(`Missing search asset: ${asset}`); }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${expected} documentation pages, internal links and anchors, static assets, GitHub edit links, and Pagefind output under ${base}.`);
}
