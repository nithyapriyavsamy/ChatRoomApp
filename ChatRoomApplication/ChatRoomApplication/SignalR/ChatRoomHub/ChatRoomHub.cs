using Microsoft.AspNetCore.SignalR;

namespace ChatRoomApplication.SignalR.ChatRoomHub
{
    public class ChatRoomHub : Hub
    {
        public static List<string> RoomMembers = new List<string>();
        
        public async Task EnterRoom(string name)
        {
            RoomMembers.Add(name);
            await Clients.All.SendAsync("UpdateRoomMembers", RoomMembers);
        }
        public async Task ExitRoom(string name)
        {
            RoomMembers.Remove(name);
            await Clients.All.SendAsync("UpdateRoomMembers", RoomMembers);
        }
    }
}
