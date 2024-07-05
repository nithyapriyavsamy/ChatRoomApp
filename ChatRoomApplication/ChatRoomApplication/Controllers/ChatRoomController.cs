using ChatRoomApplication.Models.Dto;
using ChatRoomApplication.SignalR.ChatRoomHub;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatRoomApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ChatRoomController : ControllerBase
    {
        private readonly IChatRoomHub _hub;
        public ChatRoomController(IChatRoomHub hub)
        {
            _hub = hub;
        }

        [HttpGet("roommembers")]
        public async Task<ActionResult<UserDto>> GetRoomMembers()
        {
            return Ok(await _hub.GetChatRoomMembersAsync());
        }
    }
}
