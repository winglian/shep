## Shep [![Build Status](https://travis-ci.org/bustlelabs/shep.svg?branch=master)](https://travis-ci.org/bustlelabs/shep) [![npm version](https://badge.fury.io/js/shep.svg)](https://badge.fury.io/js/shep)

A framework for building applications using AWS API Gateway and Lambda.

Shep can also be used just to deploy lambda functions. See the "Using without API Gateway" section for more information.

## Installation

`npm install -g shep-cli`

## Quick start

```
> shep new
... follow prompts ...
> cd <project-folder>
> git init
> npm install
> shep pull
> shep create-function
... follow prompts ...
> shep create-resource
... follow prompts ...
> shep create-method
... follow prompts ...
> shep deploy
... follow prompts ...
```

## Using Without API Gateway

You can use `shep` without API gateway if you just need to deploy and version lambda functions. When creating a project use the following command: `shep new --no-api`. Your project will now skip any API gateway commands and integrations.

## Opinions

### API Gateway Web UI

It is important to note that this does not yet replace the API Gateway UI. For creating new resources/functions/methods you will want to use the shep cli, but edits for headers, params, etc should probably be made through the Web UI. Make sure to update your local api.json file by running `shep pull`

### Mapping templates

API Gateway allows you to write "mapping templates" that transform data before sending it to lambda or other backends. They are written in velocity (java templating) and generally not fun to deal with. Shep contains a generic template that you should use instead. This is automatically configured for you. Functions generated by shep contain ES2015 destructuring that already matches this template. Just use it and save yourself some headache.

Here is an example of the input to lambda:

``` js
{
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    Accept-Encoding: "gzip",
    Accept-Language: "en-US,en;q=0.8",
    Cache-Control: "max-age=0",
    CloudFront-Forwarded-Proto: "https",
    CloudFront-Is-Desktop-Viewer: "true",
    CloudFront-Is-Mobile-Viewer: "false",
    CloudFront-Is-SmartTV-Viewer: "false",
    CloudFront-Is-Tablet-Viewer: "false",
    CloudFront-Viewer-Country: "US",
    DNT: "1",
    Upgrade-Insecure-Requests: "1",
    Via: "1.1 9fab2a39c6d2bda91a3a58e2e1e6133d.cloudfront.net (CloudFront)",
    X-Amz-Cf-Id: "_iTvfyle3-4VqQD3doABOKcjRMq06s1CGQXGTr6LBZB4Wm0i5T2ebg==",
    X-Forwarded-For: "75.151.133.222, 204.246.168.164",
    X-Forwarded-Port: "443",
    X-Forwarded-Proto: "https"
  },
  pathParameters: { },
  queryParameters: { },
  body: { }
}
```

### Lambda versions + API Gateway stages

Shep automatically configures proper permissions and links between API Gateway stages and lambda functions. Example: the beta API stage will call the beta version of your lambda functions. Environment variables are contained in `env.js` and copied into your lambda function on deployment. Just add new keys to that file to created additional environments.

### Node Dependencies

Dependencies can be specified for all project functions in your project root `package.json`. These are copied to each function on deployment and overidden by the dependencies in each functions `package.json` file. Essentially each function 'inherits' any production dependencies from the root project.

## AWS Wishlist

### Swagger export without stage name
### Install dependencies



## Other projects

[Serverless](https://github.com/serverless/serverless)

Shep and Serverless have similar goals. The creation of Shep was definitely inspired by Serverless. With Shep we strive for a more minimal feature set with more opinions baked in. We encourage you to check out both and select the right one for your project.

[Apex](https://github.com/apex/apex)

Apex is very similar to using Shep with the `--no-api` flag. It is just for managing and deploying lambda functions. It also supports multiple lambda runtimes where Shep only supports nodejs.

## CLI Commands

`shep new` - Creates a new project

`shep create-resource` - Creates a new resource

`shep create-function` - Creates a new function

`shep create-method` - Creates a new method. You should already have created the resource and the function before running this command

`shep deploy` - Deploys all functions, sets up permissions+versions, and makes a new API gateway deployment

`shep pull` - Pulls a JSON representation of your API and writes it to `api.json`. This is used by shep to match up functions with resources and endpoints. If you make changes using the API gateway web UI make sure to pull down those changes by running this command

`shep run` - Will run a function using the `development` environment and the event found at `functions/{funcName}/event.json`

## Development

Rebuild on file change: `npm run compile -- -w`

Test: `npm test`
