import './App.css'
import Chat from "./components/Chat.tsx";
import {MessagesProvider} from "./context/MessagesContext.tsx";

function App() {

    return (
        <MessagesProvider>
            <h2 style={{margin: '0'}}>Streaming Chat</h2>
            <Chat/>
        </MessagesProvider>
    )
}

export default App
