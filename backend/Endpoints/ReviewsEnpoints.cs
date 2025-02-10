using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using backend;
using System.Security.Claims;


public static class ReviewsEndpoints{

    public static RouteGroupBuilder ReviewsMapGroup(this WebApplication app){
        var group = app.MapGroup("/reviews");
        
        group.MapGet("/",(DoctorFinderContext dbContext)=>{
           var result = dbContext.Reviews.Select(review=>review).AsNoTracking().ToList();
           if(result is null){
                return Results.Empty;
           }
           List<Review> reviews = new List<Review>();

           for(int i = 0; i < result.Count;i++){
            reviews.Add(result[i].toDisplay(dbContext));
           }

           return Results.Ok(reviews);
        });

        group.MapGet("/{id}",(int id, DoctorFinderContext dbContext)=>{
            var result = dbContext.Reviews.Find(id);
            if(result ==  null){
                return Results.NotFound();
            }
            return Results.Ok(result.toDisplay(dbContext));
        }).WithName("GetReview");

        group.MapPost("/",[Authorize](ReviewDto newReview, DoctorFinderContext dbContext)=>{
            var sender = dbContext.Users.Find(newReview.SenderId);
            if(sender == null){
                return Results.NotFound();
            }
            var receiver = dbContext.Doctors.Find(newReview.ReceiverId);
            if(receiver == null){
                return Results.NotFound();
            }            
            
            // Check if a review from the same sender to the same receiver already exists
            var alreadyPosted = dbContext.Reviews.Any(r => r.SenderId == newReview.SenderId && r.ReceiverId == newReview.ReceiverId);
            if (alreadyPosted)
            {
                return Results.BadRequest("You have already posted a review for this doctor.");
            }

            ReviewEntity review = new()
            {
                SenderId = newReview.SenderId,
                ReceiverId = newReview.ReceiverId,
                Review = newReview.Review,
                Rating = newReview.Rating
            };

            dbContext.Reviews.Add(review);
            dbContext.SaveChanges();

            var averageRating = dbContext.Reviews
                .Where(review => review.ReceiverId == receiver.Id)
                .Select(review => review.Rating)
                .AsEnumerable()
                .DefaultIfEmpty(0)  // In case there are no reviews.
                .Average();

            receiver!.Rating = Convert.ToInt32(averageRating);
            receiver!.numOfReviews += 1;
            dbContext.SaveChanges();

            return Results.CreatedAtRoute("GetReview", new { id = review.Id }, review);
        }).WithParameterValidation();


        group.MapDelete("/{id}", [Authorize] (int id, ClaimsPrincipal claimsPrincipal, DoctorFinderContext dbContext) =>
        {
            
            var review = dbContext.Reviews.Find(id);
            if (review == null)
            {
                return Results.NotFound();
            }

            var receiver = dbContext.Doctors.FirstOrDefault(d => d.Id == review!.ReceiverId);

            var userId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null || review.SenderId.ToString() != userId)
            {
                return Results.Forbid();
            }
            dbContext.Reviews.Remove(review);
            dbContext.SaveChanges();
            
            var averageRating = dbContext.Reviews
                .Where(review => review.ReceiverId == receiver!.Id)
                .Select(review => review.Rating)
                .AsEnumerable()
                .DefaultIfEmpty(0)  // In case there are no reviews.
                .Average();

            receiver!.Rating = Convert.ToInt32(averageRating);
            receiver!.numOfReviews -= 1;
            
            dbContext.SaveChanges();
            return Results.Ok("Deleted Successfully");
        });
        

        return group;
    }

}