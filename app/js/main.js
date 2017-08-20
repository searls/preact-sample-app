window.h = preact.h
preact.router = window.preactRouter
window.app = window.app || {}

// app.store -  In-memory persistence stuff
app.store = app.store || {}
app.store.Base = class Store {
  static get instance () {
    if (this._instance) return this._instance
    this._instance = new this()
    return this._instance
  }

  constructor () {
    this.stuff = new Map()
  }

  get (key) {
    return this.stuff.get(key)
  }

  set (key, value) {
    return this.stuff.set(key, value)
  }

  has (key) {
    return this.stuff.has(key)
  }
}

app.store.Sentence = class SentenceStore extends app.store.Base {
  find (id, optionalCb) {
    if (this.has(id)) {
      return this.get(id)
    } else {
      fetch(`/api/sentence/${id}`).then(res => res.json()).then(json => {
        this.set(id, json.sentence)
        optionalCb(null, json.sentence)
      })
      return null
    }
  }

  triage (sentences) {
    sentences.forEach(sentence => this.set(sentence.id, sentence))
    return sentences
  }
}

app.store.Search = class SearchStore extends app.store.Base {
  execute (query, optionalCb) {
    if (this.has(query)) {
      return this.get(query)
    } else {
      fetch(`/api/search/${query}`).then(res => res.json()).then(json => {
        const sentences = app.store.Sentence.instance.triage(json.sentences)
        this.set(query, sentences)
        optionalCb(null, sentences)
      })
      return []
    }
  }
}

// app.component - view stuff
app.component = app.component || {}

app.component.main = ({query, results, sentenceId, onChange}) =>
  h(preact.router, {},
    h(app.component.show, {
      path: '/sentence/:sentenceId',
      query,
      onChange
    }),
    h(app.component.index, {
      path: '/search/:query',
      results,
      onChange
    }),
    h(app.component.welcome, { default: true })
  )

app.component.show = ({sentenceId, query, onChange}) => {
  const sentence = app.store.Sentence.instance.find(sentenceId, (er, sentence) => {
    onChange({sentence, sentenceId, query, error: er})
  })

  return h('div', {},
    sentence ? h(app.component.sentence, {sentence}) : 'Loading…',
    h('div', {class: 'go-back'},
      h('a', {href: query ? `/search/${query}` : '/'}, ' <- '),
      query || 'Back to search'
    )
  )
}

app.component.sentence = ({sentence}) =>
  h('div', {class: 'sentence'},
    h('div', {}, sentence.japanese),
    h('div', {}, sentence.english),
    h('ul', {class: 'actions'},
      h('li', {},
        h('a', {href: `japanese://search/${sentence.japanese}`}, 'Search in Japanese.app')
      ),
      h('li', {},
        h('a', {href: `midori://translate?text=${sentence.japanese}`}, 'Translate in Midori.app')
      )
    )
  )

app.component.index = ({query, results, onChange}) => {
  results = app.store.Search.instance.execute(query, (er, sentences) => {
    onChange({query, results: sentences, error: er})
  })

  return h('div', {},
    h(app.component.results, {results}),
    h(app.component.search, {query})
  )
}

app.component.results = ({query, results}) =>
  h('ul', {class: 'results'},
    results ? results.map(result => h(app.component.result, result)) : []
  )

app.component.result = ({japanese, id}) =>
  h('li', {class: 'result'},
    h('a', {href: `/sentence/${id}`}, japanese)
  )

app.component.welcome = () =>
  h('div', {},
    h(app.component.instructions, {}),
    h(app.component.search, {})
  )

app.component.instructions = () =>
  h('div', {class: 'instructions'}, `
    To get started, just search for a token or something.
  `)

app.component.search = ({query}) =>
  h('input', {type: 'search',
    placeholder: 'Type words…',
    value: query,
    onKeyUp: (e) => {
      const inputValue = e.target.value
      if (inputValue) {
        preact.router.route(`/search/${inputValue}`)
      } else {
        preact.router.route('/')
      }
    }
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
