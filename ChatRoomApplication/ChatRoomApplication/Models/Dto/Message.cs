namespace ChatRoomApplication.Models.Dto
{
    public class Message
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string message { get; set; }
        public DateTime time { get; set; }
    }
}
