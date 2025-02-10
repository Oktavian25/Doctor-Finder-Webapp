using System.ComponentModel;
using backend.Models;

namespace backend;

public class ReviewEntity
{
    public int Id {get;set;}
    public required int SenderId {get;set;}
    public required int ReceiverId {get;set;}
    public required string? Review {get;set;}
    public required int Rating {get;set;}
}
