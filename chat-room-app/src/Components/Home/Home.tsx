import './Home.css';
import * as signalR from '@microsoft/signalr';
import { useEffect,useState,useRef } from 'react';
import {UpdateMembers, UpdateMessages, ResetData} from '../../Redux/ChatAction';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ApiService from '../../Service/ApiService';

function Home() {
    const dispatch = useDispatch();
    const apiService = ApiService();

    var members = useSelector((store:any)=>store.members);
    var messages = useSelector((store:any)=>store.messages);

    var [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    var [userName, setUserName] = useState("");
    var [message, setMessage] = useState("");
    var [enterRoom, setEnterRoom] = useState(false);
    var [exitRoom, setExitRoom] = useState(true);

    useEffect(() => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
          setUserName(storedUserName);
          setEnterRoom(true);
          setExitRoom(false);
          startConnection();
          apiService.GetRoomMembers()
          .then(data=>{
            dispatch(UpdateMembers(data));
          })
          .catch(error=>{
            console.log(error);
          })
      }
      return () => {
      };
  }, []);

    const startConnection = async () => {
        if (connection) {
          await ExitRoom();
          }
        const newConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Trace)
            .withAutomaticReconnect()
            .withUrl("http://localhost:5131/chathub")
            .build();

        try {
            await newConnection.start();
            setConnection(newConnection);

            newConnection.on("UpdateRoomMembers", (data: any) => {
                dispatch(UpdateMembers(data));
            });

            newConnection.on("NewMessage", (data: any) => {
              console.log(data, 'data')
                dispatch(UpdateMessages(data));
            });

            return newConnection;
        } catch (err) {
            console.error("Failed to start connection: ", err);
            return null;
        }
    };

    const EnterRoom = async () => {
            const newConnection = await startConnection();
            if (newConnection) {
                await newConnection.invoke("EnterRoom", userName);
                setExitRoom(false);
                setEnterRoom(true);
                localStorage.setItem("userName", userName);
            }
    };

    const ExitRoom = async () => {
        if (connection) {
            const currentUserName = localStorage.getItem("userName") || userName;
            await connection.invoke("ExitRoom", currentUserName);
            setEnterRoom(false);
            setExitRoom(true);
            dispatch(ResetData());
            connection.stop();
            setConnection(null);
            localStorage.removeItem("userName");
        }
    };

    const sendMessage = async () => {
        if (connection) {
            const payloadhub = {
                name: userName,
                message: message
            };
            await connection.invoke("SendMessage", payloadhub);
            setMessage("");
        }
    }
 

  return (
      <div className='Home'>
            <div className='first-box'>
                <div className='exit'>
                        <button className='exit-room-button' onClick={ExitRoom} disabled={exitRoom}>Exit Room</button>
                </div>
                <div className='first-box-input'>
                      <input type='text'className='nameInput' value={userName} onChange={(e) => setUserName(e.target.value)} disabled={enterRoom}/>
                      <button className='enter-room-button' onClick={EnterRoom} disabled={enterRoom}>Enter Room</button>
                </div>
            </div>
            <div className='second-box'>
                <div className='chat-box'>
                <h2 className='section-header'>Group Chat</h2>
                {messages.length > 0 ? messages.map((msg: any) => {
                    const messageTime = new Date(msg.time); 
                    const isCurrentUser = userName === msg.name;
                    return (
                        <div key={msg.time + msg.name} style={{
                          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                          backgroundColor: isCurrentUser ? '#e4e6eb' : '#1877f2',
                          color: isCurrentUser ? 'black' : 'white'
                        }}>
                          {msg.message}
                          <p style={{color: isCurrentUser ? 'black' : 'white'}}>
                            {msg.name}&nbsp;{messageTime.toLocaleTimeString('en-US', { hour12: true })}
                          </p>    
                        </div>
                    );
                    }) : <p>No Messages yet!!!</p>}
                </div>
                <div className='room-members'>
                <h2 className='section-header'>Members</h2>
                    {members.length>0 ? members.map((member : any) => (
                        <div key={member.index}>
                            👤{member}
                        </div>
                    )) : <p>No members in the room</p>}
                </div>
            </div>
            <div className='bottom-box'>
                <input type='text'className='chatInput' value={message} onChange={(e) => setMessage(e.target.value)}/> 
                <button className='send-button' onClick={sendMessage} disabled={message?false:true}>Send</button>
            </div>
    </div>
  );
}

export default Home;