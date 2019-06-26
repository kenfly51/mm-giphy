import React from 'react';
import { GiphyContainer } from './components/GiphyContainer'

function App() {
  return (
    <GiphyContainer
      url="https://api.giphy.com/v1/gifs/trending"
      apiKey="eUVMjjobXnZldjnCYWVmfL4KrfUI3Is4"
    />
  );
}

export default App;
