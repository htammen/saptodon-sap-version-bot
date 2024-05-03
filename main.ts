import { serve } from "https://deno.land/std@0.214.0/http/server.ts";
import { createRestAPIClient } from "https://cdn.skypack.dev/masto";

/**
  * create the mastodon status message from newreleases.io json input 
  */
function parseRequest(json: object): string {
  let url = ""
  if (json.provider === "github") { url = `https://github.com/${json.project}`}
  return `There is a new version of\n${json.project}\non ${json.provider}\nversion: ${json.version}${url?`\n${url}`:``}`
}

/**
 * handles the incoming request fron newreleases.io 
 */
async function handler(_req) {
  const inputJSON = await _req.json();
  const resp = parseRequest(inputJSON);

  // URL and TOKEN are retrieved from environment variable
  // URL = https://saptodon.org
  // TOKEN = secret token of saptodon user who wants to toot status
  const masto = createRestAPIClient({
    url: Deno.env.get("URL"),
    accessToken: Deno.env.get("TOKEN"),
  });

  // create the mastodon status (toot)
  const status = await masto.v1.statuses.create({
    status: resp,
    visibility: "private",
  });

  // console.log(status.url);

  // Return status 200 to newreleases.io.
  return new Response(null, {
    status: 200,
    statusText: 'ok',
    headers: {
      "content-type": "text/plain;charset=utf-8",
    },
  });
}

serve(handler);
