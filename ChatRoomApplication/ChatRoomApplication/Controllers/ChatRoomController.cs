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
        private readonly ChatRoomHub _hub;
        public ChatRoomController(ChatRoomHub hub)
        {
            _hub = hub;
        }

        [HttpPost("enterRoom")]
        public async Task<ActionResult<UserDto>> EnterRoom(UserDto dto)
        {
            await _hub.EnterRoom(dto.name);
            return Ok(dto);
        }

        [HttpPost("exitRoom")]
        public async Task<ActionResult> ExitRoom(UserDto dto)
        {
            await _hub.ExitRoom(dto.name);
            return Ok("Done");
        }
    }
}
