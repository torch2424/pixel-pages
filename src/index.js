import { h, render, Component } from 'preact';

class App extends Component {
  state = { 
    isLoading: true,
    errorMessage: null,
    config: null
  }

  componentDidMount() {

    // TODO torch2424: Get an app config and page config JSON from the query params
    // App config should have the various settings associated with pixel pages (Analytics, Facebook Pixels, etc...)
    // Page config should have the actual information needed to display the page (E.g Spotify album id and stuff)
    
    const asyncMount = async () => {
      // Grab our searchParams
      const searchParams = new URLSearchParams(window.location.search);

      const configKeys = [
        'app-config',
        'page-config'
      ];

      const hasMissingConfig = configKeys.some(configKey => {
        if (searchParams.has(configKey)) {
          return false;
        }
        return true;
      });

      // Verify that we have a the appropriate params
      if (hasMissingConfig) {
        this.setState({
          ...this.state,
          isLoading: false,
          errorMessage: 'This page has an incomplete URL. Make sure you copied the URL exactly as it was sent to you.'
        });
        return;
      }

      // Fetch our JSON configs
      const config = {};
      for (let i = 0; i < configKeys.length; i++) {
        const configKey = configKeys[i];
        const configUrl = searchParams.get(configKey);
        
        // Try to get the config
        console.log('grabbing config', configUrl)
        const configJson = await (await fetch(configUrl)).json();
        console.log(configJson);
        config[configKey] = configJson;
      }
      
      this.setState({
        ...this.state,
        isLoading: false,
        config
      })
    };
    asyncMount().catch(error => {
      this.setState({
        ...this.state,
        isLoading: false,
        errorMessage: 'Unable to load the page. Please let the person who sent you this know that their page is broken!'
      });
    });
  }

  render() {
    return (
      <main id="app" class="min-w-full min-h-full w-screen h-screen bg-neutral-900">
        <div class="flex w-full h-full items-center justify-center">
          { this.state.errorMessage ? (
            <div class="w-1/2 text-white text-center">
              <h1>🛑 Error!</h1>
              <h2>{this.state.errorMessage}</h2>
            </div>
          ) : ''}
          { this.state.isLoading ? (
            <svg class="animate-spin h-1/4 w-1/4 fill-white" viewBox="0 0 24 24">
              <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
              <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" />
            </svg>
          ) : ''}
          { this.state.config ? (
            <div>
              Loaded!
            </div>
          ) : '' }
        </div>
      </main>
    );
  }
}

render(<App />, document.querySelector('body'));
