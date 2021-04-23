!((doc, Socket, storage, location) => {
  let oList = doc.querySelector('#list')
  let oMsg = doc.querySelector('#message')
  let oSendBtn = doc.querySelector('#send')
  let ws = new Socket('ws:localhost:8000')
  let username = ''

  let init = () => {
    bindEvent()
  }
  function bindEvent() {
    oSendBtn.addEventListener('click', handleSendBtnClick, false)
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)


  }

  function handleSendBtnClick() {
    const msg = oMsg.value
    if (!msg.trim().length) {
      return
    }

    ws.send(JSON.stringify({
      user: username,
      dataTime: new Date().getTime(),
      message: msg
    }))

    oMsg.value = ''

    console.log('sendMessage');
  }
  function handleOpen(e) {
    console.log('open', e);
    username = storage.getItem('username')

    if (!username) {
      location.href = 'entry.html'
      return
    }
  }
  function handleClose(e) {
    console.log('close', e);
  }
  function handleError(e) {
    console.log('error', e);
  }
  function handleMessage(e) {
    console.log('message', e);
    const msgData = JSON.parse(e.data)
    oList.appendChild(createMsg(msgData))

  }

  function createMsg(data) {
    const { user, dataTime, message } = data
    const oItem = doc.createElement('li')
    oItem.innerHTML = `
      <p>
        <span>${user}</span>
        <i>${new Date(dataTime)}</i>
      </p>
      <p>消息：${message}</p>
    `
    return oItem
  }
  init()



})(document, WebSocket, localStorage, location)