import './Home.css';
import * as signalR from '@microsoft/signalr';
import { useEffect,useState } from 'react';
import ApiService from '../Services/ApiService';

function Home() {
    const apiService = ApiService();
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [userName, setUserName] = useState("");
    var [roomMembers, setRoomMembers] = useState([]);

    useEffect(() => {
      const newConnection = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.Trace)
          .withAutomaticReconnect()
          .withUrl("http://localhost:5131/chathub")
          .build();
    
          const startConnection = async () => {
            try {
              await newConnection.start();
              setConnection(newConnection);
            } catch (err) {
            }
          }; 
          
          newConnection.onclose(() => {
              connection?.invoke("ExitRoom", userName);
        });
          
          startConnection();  
      }, []);

    const EnterRoom=()=>{
        connection?.invoke("EnterRoom", userName);
    }

    const ExitRoom=()=>{
      connection?.invoke("ExitRoom", userName);
    }
    connection?.on("UpdateRoomMembers",(data : any)=>{
      setRoomMembers(data);
    })   

        

  return (
      <div className='Home'>
            <div className='exit'>
                    <button className='exit-room-button' onClick={ExitRoom}>Exit Room</button>
            </div>
            <div className='first-box'>
                <input type='text' onChange={(e) => setUserName(e.target.value)}/> <br/>
                <div className='enter'>
                    <button className='enter-room-button' onClick={EnterRoom}>Enter Room</button>
                </div>
            </div>
            <div className='second-box'>
                <div className='chat-box'>
                    
                </div>
                <div className='room-members'>
                    {roomMembers.length>0 ? roomMembers.map((member, index) => (
                        <div key={index}>
                            {member}
                        </div>
                    )) : <p>No members in the room</p>}
                </div>
            </div>
            <div className='bottom-box'>
                <input type='text'className='chat-input' onChange={(e) => setUserName(e.target.value)}/> 
                <button className='send-button' onClick={EnterRoom}>Send</button>
            </div>
    </div>
  );
}

export default Home;