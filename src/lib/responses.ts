export function json(res: any) {
  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export function badRequest(res: any) {
  return new Response(JSON.stringify(res), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

export function notFound(res: any) {
  return new Response(JSON.stringify(res), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
