using Microsoft.EntityFrameworkCore;
using QuizProject.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();


builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
}); 

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<QuizContext>(options => options.UseInMemoryDatabase("QuizDB"));

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", policyBuilder => 
        policyBuilder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()));


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
