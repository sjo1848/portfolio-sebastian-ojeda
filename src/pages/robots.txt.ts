import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site ?? new URL('https://portfolio.example.com');
  const sitemap = new URL('sitemap-index.xml', baseUrl);

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      `Sitemap: ${sitemap.href}`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
};
