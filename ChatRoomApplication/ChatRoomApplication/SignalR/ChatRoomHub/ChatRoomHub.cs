using ChatRoomApplication.Models.Dto;
using Microsoft.AspNetCore.SignalR;

namespace ChatRoomApplication.SignalR.ChatRoomHub
{
    public class ChatRoomHub : Hub, IChatRoomHub
    {
        public static List<string> RoomMembers = new List<string>();
        public static List<Message> GroupMessage = new List<Message>();

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

        public async Task<List<string>> GetChatRoomMembersAsync()
        {
            return RoomMembers;
        }

        public async Task SendMessage(Message msg)
        {
            msg.Id = Guid.NewGuid();
            msg.time=DateTime.Now;
            GroupMessage.Add(msg);
            await Clients.All.SendAsync("NewMessage", msg);
        }
    }
}
