# widget built using Vue custom element

```html
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="initial-scale=1.0, user-scalable=no  width=device-width, shrink-to-fit=no"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>DEMO PAGE</title>
  </head>
  <body>
    <widget-app class="container"></widget-app>
    <script src="widget.js"></script>
  </body>
</html>
```

## About

Amazon graph is a visual recommendation service that helps people find the right product from Amazon's catalog;
be it a book, a movie or a video game -Amazon graph finds everything!

## How it works

Widget is built with vue.js , and uses vue custom element for embedding. Visual represtation of nodes is achieved using vivagraph.

the script uses a custom script tag widget-app

```
<widget-app class="container"></widget-app>
```

## Testing

To test the wiget you need to have nodejs installed , first run

```
npm install
```

this will install all the dependencies . to start a local server for the app run

```
npm run start
```

to build the widget simply run

```
npm run build
```

this will generate a build in `public/js` which you can embed in your page using the custom tag

###

The Widget currently a json file to demonstarte the desired features , an Amazon affiliate account is required for full use of the app
