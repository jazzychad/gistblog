# gistblog

gistblog is a simple node.js app (easily hosted on Heroku) that uses
Github for user authentication and Gists for the backing store of post
data. gistblog presents a simple interface to quickly compose
markdown-based posts and display them to readers.

The author may publish posts as public, private, or limit viewing of
posts to specific Github usernames (useful for a private post among a
group of people or peer reviews of drafts before making a post public).

More features coming soon.

## Example

A reference implementation can be seen at: [http://txt.jazzychad.net](http://txt.jazzychad.net)

## Development

To setup run the following commands:

    npm install -d
    heroku apps:create --stack cedar <app_name_here>
    heroku addons:add mongolab:sandbox # free 496mg mongo tier
    heroku addons:add redistogo:nano # free 5mb redis server

use foreman for local heroku testing

**DO NOT PUT SENSITIVE KEYS OR INFORMATION IN THE SOURCE CODE
EVER. PUT THEM IN ENVIRONMENT VARIABLES AND REFERENCE THEM FROM
CONFIG.JS**

See `exports.sample.txt` for environment variables you will need to set.

## Contributing

If you would like to contribute to this project, great! Please fork
this repo and get it up and running locally. Create a feature branch,
and then send a pull-request once you have finished it.

## Contact

Questions about how things work? Feel free to ping me on twitter
@[jazzychad](https://twitter.com/jazzychad). Enterprising folks can
also find my email address through my website.

## Disclaimers

This code will be under active development and might change frequently.

## LICENSE

MIT License. See LICENSE for info.
