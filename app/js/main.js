document.addEventListener('DOMContentLoaded', function () {
  window.h = preact.h

  class CounterComponent extends preact.Component {
    constructor (args) {
      super()
      this.count = 0
    }

    render (args) {
      return h('div', {}, [
        'count is ' + this.count,
        h('input', {
          type: 'submit',
          onClick: (e) => this.increment(e)
        })])
    }

    increment (e) {
      this.count += 1
      this.setState({})
    }
  }

  window.preact.render(h(CounterComponent, {}), document.body)
})
