window.h = preact.h
window.app = window.app || {}
app.component = app.component || {}

app.component.main = ({query}) =>
  h('div', {id: 'app'},
    query ? h(app.component.results, {query}) : h(app.component.instructions, {}),
    h(app.component.search, {query})
  )

app.component.results = ({query}) =>
  h('div', {class: 'results'},
    h(app.component.result, {japanese: 'fake results for ' + query, key: 0, id: 0}),
    h(app.component.result, {japanese: '「' + query + '」って日本語じゃない、よ！', key: 1, id: 1}),
    h(app.component.result, {japanese: 'なるほど', key: 2, id: 2})
  )

app.component.result = ({japanese, id}) =>
  h('div', {class: 'result'}, `${id}: ${japanese}`)

app.component.instructions = () =>
  h('div', {class: 'instructions'}, `
    To get started, just search for a token or something.
  `)

app.component.search = ({query}) =>
  h('input', {type: 'search',
    placeholder: 'Shirt and…',
    value: query,
    onKeyUp: (e) => app.render({query: e.target.value})
  })

app.render = (props) => {
  preact.render(
    h(app.component.main, props),
    document.body,
    document.getElementById('app')
  )
}

document.addEventListener('DOMContentLoaded', function () {
  app.render({})
})
