# payment-prototype-options

## Getting started

Install Node.js (see requirements)

#### Clone this repo

```
git clone git@github.com:alphagov/govuk_prototype_kit.git
```

#### Install dependencies

```
npm install
```

This will install folders containing programs described by the package.json file to a folder called `node_modules`.

#### Run the app

```
node start.js
```

Go to [localhost:3000](http://localhost:3000) in your browser.

#### Hot reload

Any code changes should update in the browser without you restarting the app.

The app recompiles app/assets/stylesheets/application.scss everytime changes are observed.

## Documentation

Find out how to work with the prototyping application.

* [Getting started](docs/getting-started.md) (Read this first)
* [Creating routes](docs/creating-routes.md)
* [Making pages](docs/making-pages.md)
* [Writing CSS](docs/writing-css.md)
* [Deploying (getting your work online)](docs/deploying.md)
* [Tips and Tricks](docs/tips-and-tricks.md)

This project is built on top of Express, the idea is that it is straightforward to create simple static pages out of the box. However, you're not limited to that - more dynamic sites can be built with more understanding of Express. Here's a good [Express tutorial.](http://code.tutsplus.com/tutorials/introduction-to-express--net-33367)

## Integrating Other Prototypes

1. Define a service under `app/services.js`. This includes which payment types should be available for this service, and its display name, etc.

2. Land the service's own prototype at `https://username:password@payment-prototype.herokuapp.com/landing?service=name&amount=100&return_url=http://other.service.gov.uk`. This will begin a journey through the Payments Prototype and at the end, return you to the `return_url` you specify.
