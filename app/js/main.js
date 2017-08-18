document.addEventListener('DOMContentLoaded', function() {
  window.h = window.preact.h

  // I always assign the components to a name because I don't use a module system, so I need to be able to say e.g. App.CounterComponent = ...
  CounterComponent = class CounterComponent extends preact.Component {
    constructor(args) {
      super();
      // This is the component's state. In larger apps you'd want to use
      // models. State should be stored on the lowest component in the component
      // tree that's a parent of all children that need the state. (Sentence is
      // awkward but it's an intuitive idea once you get it.)
      this.count = 0
    }

    render(args) {
      return h('div', {}, [
        "count is " + this.count,
        h('input', {
          'type': 'submit',
          'onClick': (e) => this.increment(e), // Without the arrow function we'd have to manually bind the function because js scoping is horribly broken.
        })])
    }

    increment(e) {
      this.count += 1
      // This triggers preact to re-render even though we didn't change
      // anything in the state. I've never used whatever setState changes, which
      // is one of the ways that I probably don't understand React/preact yet.
      this.setState({})
    }
  }

  // Have to kick it off somewhere, but once the component is rendered into the
  // DOM everything will be triggered via events (the button clicks in our case).
  window.preact.render(h(CounterComponent, {}), document.body)
})
