import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useQuery } from "react-query";

function App({ queryClient }) {
  const { lastMessage, readyState } = useWebSocket('ws://localhost:8080');
  const { data: posts } = useQuery("posts", () => fetch("http://localhost:8080/posts").then((res) => res.json()), { staleTime: Infinity });

  const filterIds = posts?.map(p => p.id)
  const [selectedId, setSelectedId] = useState(null)

  const filteredPosts = selectedId ? posts?.find(post => post.id === selectedId) : posts
  console.log('selectedId', selectedId)
  console.log('filteredPosts', filteredPosts)


  useEffect(() => {
    if(lastMessage?.data === 'new-data-event') queryClient.invalidateQueries('posts')
  },[lastMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <div>The WebSocket is currently {connectionStatus}</div>
      <hr/>
      Filter Id Select
      <div>
        { filterIds?.map(id => <button key={id} value={id} onClick={() => setSelectedId(id)}>{id}</button>) }
      </div>
      <button onClick={() => setSelectedId(null)}>Clear filter</button>

      <hr/>
      All Data
      {filteredPosts?.length === 0 && "There is no data"}
      <pre>{JSON.stringify(filteredPosts, null, 2) }</pre>
    </div>
  );
}

export default App;
