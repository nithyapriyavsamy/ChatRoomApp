using ChatRoomApplication.SignalR.ChatRoomHub;
using System.Threading;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

builder.Services.AddScoped<ChatRoomHub>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allowed origin
            .AllowAnyHeader() // Allow any header
            .AllowAnyMethod() // Allow any HTTP method
            .AllowCredentials(); // Allow credentials (cookies, authorization headers)
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowAll");

app.MapHub<ChatRoomHub>("/chathub");

app.MapControllers();

app.Run();
