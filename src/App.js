import React, { useEffect } from 'react';
import './App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useQuery } from "react-query";

function App({ queryClient }) {
  const { lastMessage, readyState } = useWebSocket('ws://localhost:8080');
  const { data: posts } = useQuery("posts", () => fetch("http://localhost:8080/posts").then((res) => res.json()), { staleTime: Infinity });

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
      {posts?.length === 0 && "There is no data"}
      <pre>{JSON.stringify(posts, null, 2) }</pre>
    </div>
  );
}

export default App;
