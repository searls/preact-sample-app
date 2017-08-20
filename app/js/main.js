window.h = preact.h
window.app = window.app || {}
app.component = app.component || {}

app.component.main = ({query, results, selected, onChange}) => {
  let page
  if (selected) {
    page = h(app.component.show, {
      query,
      selected,
      onGoBack: () => onChange({query, results})
    })
  } else {
    page = h(app.component.index, {query, results, onChange})
  }
  return h('div', {id: 'app'}, page)
}

app.component.show = ({query, selected, onGoBack}) =>
  h('div', {})

app.component.index = ({query, results, onChange}) =>
  h('div', {},
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
  h('ul', {class: 'results'},
    results ? results.map(result => h(app.component.result, result)) : []
  )

app.component.result = ({japanese, id}) =>
  h('li', {class: 'result'},
    h('a', {href: `/sentence/${id}`}, japanese)
  )

app.component.instructions = () =>
  h('div', {class: 'instructions'}, `
    To get started, just search for a token or something.
  `)

app.component.search = ({query, onSearch}) =>
  h('input', {type: 'search',
    placeholder: 'Type words…',
    value: query,
    onKeyUp: (e) => onSearch(e.target.value)
  })

app.render = (props) => {
  preact.render(
    h(app.component.main, Object.assign({}, props, {onChange: app.render})),
    document.body,
    document.getElementById('app')
  )
}

document.addEventListener('DOMContentLoaded', function () {
  app.render({})
})
