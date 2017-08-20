window.h = preact.h
window.app = window.app || {}
app.component = app.component || {}

app.component.main = ({query, results, selected, onChange}) =>
  h(window.preactRouter, {id: 'app'},
    h(app.component.show, {
      path: '/sentence/:selected',
      query,
      results,
      onGoBack: () => onChange({query, results})
    }),
    h(app.component.index, {
      default: true,
      query,
      results,
      onChange
    })
  )

app.component.show = ({selected, query, results, onGoBack}) => {
  const sentence = results.find(result => String(result.id) === String(selected))
  return h('div', {class: 'sentence'},
    h('div', {}, sentence.japanese),
    h('div', {}, sentence.english),
    h('a', {href: `japanese://search/${sentence.japanese}`}, 'Search in Japanese.app'),
    h('br'),
    h('a', {href: `midori://translate?text=${sentence.japanese}`}, 'Translate in Midori.app'),
    h('div', {class: 'go-back'},
      h('a', {href: `/search/${query}`}, '<-'),
      query
    )
  )
}

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
    document.body.lastElementChild
  )
}

document.addEventListener('DOMContentLoaded', function () {
  app.render({})
})
