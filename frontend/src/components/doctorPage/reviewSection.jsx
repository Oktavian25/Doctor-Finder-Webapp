import React, { useState } from "react";
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the Delete icon

export default function ReviewSection({ reviews, doctorData, user, handleDeleteRequest }) {
  const [open, setOpen] = useState(false);  // State to control the modal visibility
  const [selectedReviewId, setSelectedReviewId] = useState(null); // To store the review ID for deletion

  // Function to open the modal and set the review ID
  const handleClickOpen = (reviewId) => {
    setSelectedReviewId(reviewId); 
    setOpen(true);
  };

  // Function to handle the closing of the modal
  const handleClose = () => {
    setOpen(false);
    setSelectedReviewId(null); 
  };

  // Function to confirm the deletion and call the delete request
  const handleDeleteConfirm = async () => {
    if (selectedReviewId) {
      await handleDeleteRequest(selectedReviewId);
      handleClose(); 
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Reviews
      </Typography>
      {reviews.length > 0 ? (
        reviews
          .filter((review) => review.receiverId === doctorData.id) 
          .sort((a, b) => {
            if (user === null) return undefined;
            // Sort user reviews to the top
            const isUserA = a.senderId === user.id;
            const isUserB = b.senderId === user.id;
            return (isUserB ? 1 : 0) - (isUserA ? 1 : 0);
          })
          .map((review) => (
            <Box
              key={review.id}
              sx={{
                marginBottom: 2,
                paddingBottom: 2,
                borderBottom: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Box sx={{ display: "flex", position: "relative", right: "4px" }}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      style={{
                        fontSize: "24px",
                        color: value <= review.rating ? "#FFD700" : "#e0e0e0",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: "bold" }}>
                  {review.sender}
                </Typography>
                <Typography variant="body2" color="text.secondary" 
                sx={{
                  maxWidth: '1100px',
                  '@media (max-width: 1308px)': {
                    maxWidth: '950px',
                  },
                  '@media (max-width: 1156px)': {
                    maxWidth: '800px',
                  },
                  '@media (max-width: 1000px)': {
                    maxWidth: '700px',
                  },
                  '@media (max-width: 876px)': {
                    maxWidth: '600px',
                  },
                  '@media (max-width: 768px)': {
                    maxWidth: '460px',
                  },
                  '@media (max-width: 608px)': {
                    maxWidth: '440px',
                  },
                  '@media (max-width: 573px)': {
                    maxWidth: '360px',
                  },
                  overflowWrap: 'break-word'}} 
                >
                  {review.reviewMessage}
                </Typography>
              </Box>
              {user && review.senderId === user.id && (
                <Button
                  onClick={() => handleClickOpen(review.id)} 
                  sx={{
                    color: "white",
                    backgroundColor: "#D9544D",
                    width: 40,
                    height: 40,
                    minWidth: 0,
                    padding: 2,
                    marginLeft: 2,
                    "&:hover": { backgroundColor: "#b30000" },
                  }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No reviews yet. Be the first to leave a review!
        </Typography>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title" sx={{ color: "#D9544D" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to delete this review? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#555" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#D9544D",
              color: "white",
              "&:hover": { backgroundColor: "#b30000" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
