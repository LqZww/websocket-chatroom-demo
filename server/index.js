const Ws = require('ws')

!((Ws) => {
  const server = new Ws.Server({ port: 8000 })

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    server.on('on', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen() {
    console.log('server open');
  }

  function handleClose() {
    console.log('server close');
  }

  function handleError() {
    console.log('server error');
  }

  function handleConnection(ws) {
    ws.on('message', handleMessage)
    console.log('server connection');
  }

  function handleMessage(msg) {
    console.log(msg);
    server.clients.forEach(function (c) {
      c.send(msg)
    })
  }

  init()
})(Ws)