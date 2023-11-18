import { h, render, Component } from 'preact';

class App extends Component {
  state = { isLoading: true }

  componentDidMount() {

    // TODO torch2424: Get an app config and page config JSON from the query params
    // App config should have the various settings associated with pixel pages (Analytics, Facebook Pixels, etc...)
    // Page config should have the actual information needed to display the page (E.g Spotify album id and stuff)
    
  }

  render() {
    return (
      <main id="app" class="min-w-full min-h-full w-screen h-screen bg-neutral-900">
        { this.state.isLoading ? (
          <div class="flex w-full h-full items-center justify-center">
            <svg class="animate-spin h-1/4 w-1/4 fill-white" viewBox="0 0 24 24">
              <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
            </svg>
          </div>
        ) : ''}
      </main>
    );
  }
}

render(<App />, document.querySelector('body'));
