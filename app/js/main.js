window.h = preact.h
window.app = window.app || {}
app.component = app.component || {}

app.component.counter = ({count}) => {
  return h('div', {id: 'app'},
    'count is ' + count,
    h('button', {
      onClick: () => { app.render({count: count + 1}) }
    }, 'Increment!')
  )
}

app.render = ({count}) => {
  preact.render(
    h(app.component.counter, {count: count || 0}),
    document.body,
    document.getElementById('app')
  )
}

document.addEventListener('DOMContentLoaded', function () {
  app.render({count: 0})
})
