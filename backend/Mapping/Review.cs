using Azure.Core.Pipeline;
using backend.Models;

namespace backend;

public class Review
{
    public int Id{get;set;}
    public int SenderId{get;set;}
    public int ReceiverId{get;set;}
    public string? Sender{get;set;}
    public string? Receiver{get;set;}
    public string? ReviewMessage{get;set;} // conflict with class name so var name is ReviewMessage instead of Review;
    public int Rating{get;set;}
    
}

