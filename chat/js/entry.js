!((doc, storage, location) => {
  let ousername = doc.querySelector('#username')
  let obutton = doc.querySelector('#entry')

  let init = () => {
    bindEvent()
  }

  function bindEvent() {
    obutton.addEventListener('click', handleEnterBtnClick, false)
  }

  function handleEnterBtnClick() {
    let username = ousername.value.trim()

    if (username.length < 6) {
      alert('用户名不小于六位')
      return
    }

    storage.setItem('username', username)
    location.href = 'index.html'

  }

  init()

})(document, localStorage, location)