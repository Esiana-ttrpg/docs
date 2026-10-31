import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const content = fileURLToPath(new URL('../src/content/docs/', import.meta.url));
const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));

// Keep ordinary relative Markdown links editable and navigable on GitHub.
// Only the rendered website uses /docs/ routes instead of source filenames.
export default function documentationLinks() {
  return (tree, file) => {
    function visit(node) {
      if (['link', 'definition', 'image'].includes(node.type) && node.url) {
        const [, pathname, suffix] = node.url.match(/^([^?#]*)(.*)$/s);
        if (pathname && !/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(pathname)) {
          const target = path.resolve(path.dirname(file.path), decodeURIComponent(pathname));
          const relative = path.relative(content, target).replaceAll('\\', '/');
          if (!relative.startsWith('../') && /\.mdx?$/.test(relative)) {
            if (!existsSync(target)) throw new Error(`${file.path}: missing documentation link ${node.url}`);
            const route = relative.replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '').toLowerCase();
            node.url = `/docs/${route}${route && !route.endsWith('/') ? '/' : ''}${suffix}`;
          } else if (target.startsWith(publicDirectory)) {
            if (!existsSync(target)) throw new Error(`${file.path}: missing asset ${node.url}`);
            node.url = `/docs/${path.relative(publicDirectory, target).replaceAll('\\', '/')}${suffix}`;
          }
        }
      }
      for (const child of node.children ?? []) visit(child);
    }
    visit(tree);
  };
}
