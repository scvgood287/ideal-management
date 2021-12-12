const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('/editgame/:name', (req, res) => {
      const page = '/editgame/:name';
      const params = { name: req.params.name }
      console.log(params);
      //req, res, pathname, query
      app.render(req, res, page, params)
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(9090, (err) => {
      if (err) throw err;
      console.log("> Ready on Server Port: 9090")
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  })
