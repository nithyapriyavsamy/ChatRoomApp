namespace ChatRoomApplication.SignalR.ChatRoomHub
{
    public interface IChatRoomHub
    {
        public Task<List<string>> GetChatRoomMembersAsync();
    }
}
