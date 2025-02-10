import React from "react";
import { Box, Button } from "@mui/material"; // Import Material-UI components
import { Form } from "react-router-dom"; // Import Form from react-router-dom
import { Textarea } from "../../styled-tags/styledTags"; // Assuming Textarea is a custom styled component

export default function ReviewForm({
  handleReviewSubmit,
  handleReviewInput,
  handleRatingClick,
  reviewState,
  rating,
}) {
  return (
    <Box
      component={Form}
      method="post"
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "16px 0",
      }}
    >
      {/* Star Rating System */}
      <Box sx={{ display: "flex", marginBottom: 1 }}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingClick(value)}
            style={{
              cursor: "pointer",
              fontSize: "24px",
              color: value <= rating ? "#FFD700" : "#e0e0e0", // Gold for selected, gray for unselected
            }}
          >
            ★
          </span>
        ))}
      </Box>

      <Textarea
        aria-label="minimum height"
        minRows={3}
        placeholder="Write a review..."
        sx={{ resize: "none" }}
        name="review"
        value={reviewState}
        onChange={handleReviewInput}
      />
      <Button
        disabled={reviewState.length === 0 || rating === 0} // Disable if no review or rating is selected
        sx={{
          backgroundColor: "white",
          color: "black",
          alignSelf: "flex-end",
          marginTop: 1,
        }}
        type="submit"
        onClick={handleReviewSubmit}
      >
        Send
      </Button>
    </Box>
  );
}
