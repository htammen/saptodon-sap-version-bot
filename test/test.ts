
function parseRequest(json: object): string {
  let url = ""
  if (json.provider === "github") { url = `https://github.com/${json.project}` }
  if (json.provider === "npm") { url = `https://www.npmjs.com/package/${json.project}` }
  if (json.provider === "maven") { url = `https://central.sonatype.com/artifact/${json.project.replace(':', '/')}` }
  return `There is a new version of\n${json.project}\non ${json.provider}\nversion: ${json.version}${url ? `\n${url}` : ``}`
}

let myObj = {
  provider: 'github',
  project: 'htammen/test',
  version: 'v0.3.4'
}
let result = parseRequest(myObj)
console.log(result)

myObj = {
  provider: 'npm',
  project: '@cap-js/hana',
  version: 'v0.2.5'
}
result = parseRequest(myObj)
console.log(result)

myObj = {
  provider: 'maven',
  project: 'com.sap.cds:cds-services-api',
  version: 'v2.9.5'
}
result = parseRequest(myObj)
console.log(result)
