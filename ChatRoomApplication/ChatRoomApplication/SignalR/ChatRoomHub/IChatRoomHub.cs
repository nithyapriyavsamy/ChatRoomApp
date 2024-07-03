namespace ChatRoomApplication.SignalR.ChatRoomHub
{
    public interface IChatRoomHub
    {
        public Task EnterRoom(string name);
        public Task ExitRoom(string name);
    }
}
