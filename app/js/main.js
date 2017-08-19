window.h = preact.h
window.app = window.app || {}
app.component = app.component || {}

app.component.main = ({query, results, onChange}) =>
  h('div', {id: 'app'},
    query ? h(app.component.results, {results}) : h(app.component.instructions, {}),
    h(app.component.search, {
      query,
      onSearch: (query) => {
        if (!query) return onChange({})
        fetch(`/api/search/${query}`).then(res => res.json()).then(json => {
          onChange({query: json.query, results: json.results})
        })
      }
    })
  )

app.component.results = ({query, results}) =>
  h('div', {class: 'results'},
    results ? results.map(result => h(app.component.result, result)) : []
  )

app.component.result = ({japanese, id}) =>
  h('div', {class: 'result'}, `${id}: ${japanese}`)

app.component.instructions = () =>
  h('div', {class: 'instructions'}, `
    To get started, just search for a token or something.
  `)

app.component.search = ({query, onSearch}) =>
  h('input', {type: 'search',
    placeholder: 'Shirt and…',
    value: query,
    onKeyUp: (e) => onSearch(e.target.value)
  })

app.render = (props) => {
  console.log('rendering', props)
  preact.render(
    h(app.component.main, Object.assign({}, props, {onChange: app.render})),
    document.body,
    document.getElementById('app')
  )
}

document.addEventListener('DOMContentLoaded', function () {
  app.render({})
})
