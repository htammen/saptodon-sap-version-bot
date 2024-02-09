# saptodon SAP version bot 

This is a bot that toots new release infos for several SAP npm packages and github repos.

The packages/repos are watched by the great [newreleases.io](https://newreleases.io) website.  
This website offers the ability to get informed about project updates in several repositories.
Under these are npm and github where most SAP (open source) development is hosted.

Besides others newreleases.io offers the ability to get informed via webhooks. That means 
newreleases sends a notification to a defined URL whenever a new version of an observed 
package/repo get released.

In our case this means that this program that is deployed on the internet gets informed.  
saptodon SAP version bot analyses the information, creates a mastodon status (toot) text 
and toots it to mastodon via the user @sap_versions@saptodon.org. 

## Technical infos
I don't tell too much about technical details here cause this service runs on the internet. 
Even though the technical infrastructure is very secure I don't want the bad folks directly
lead to the servers.

The only thing you should know is that is application is build with [Deno](https://deno.com/).
The Deno runtime runs Typescript out of the box and offers much more security than node.js does.
