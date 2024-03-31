import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { toyService } from '../services/toy.service';

export function ToyReview({ toyToEdit, review, setReview }) {
  // const [value, setValue] = React.useState(2);


  async function onSaveReview() {
    try {
      await toyService.saveReview(toyToEdit._id, { reviews: review })
      setReview('')
      // setToyToEdit(toyToEdit)
      // onMessageSaved()
    } catch (err) {
      console.error('Failed to save message', err)
    }
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={review}
        onChange={(event, newReview) => {
          setReview(newReview)
        }}
      />
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled /> */}
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </Box>
  );
}