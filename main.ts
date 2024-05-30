import { serve } from "https://deno.land/std@0.214.0/http/server.ts";
import { createRestAPIClient } from "https://cdn.skypack.dev/masto";

/**
  * create the mastodon status message from newreleases.io json input 
  */
function parseRequest(json: object): string {
  let url = ""
  if (json.provider === "github") { url = `https://github.com/${json.project}` }
  if (json.provider === "npm") { url = `https://www.npmjs.com/package/${json.project}` }
  if (json.provider === "maven") { url = `https://central.sonatype.com/artifact/${json.project.replace(':', '/')}` }
  return `There is a new version of\n${json.project}\non ${json.provider}\nversion: ${json.version}${url ? `\n${url}` : ``}`
}

/**
 * handles the incoming request fron newreleases.io 
 */
async function handler(_req) {
  try {
    const inputJSON = await _req.json();
    console.log(inputJSON)
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
      visibility: "public",
    });

    // console.log(status.url);
  } catch (e: unknown) {
    if (typeof e === "string") {
      console.log(e)
    } else if (e instanceof Error) {
      console.log(e.name)
      console.log(e.message)
    }
  }

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
