import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Form } from 'react-router-dom';

export const desktopWidth = 312;
export const mobileWidth = 256;

export const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
export const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
 
export const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


export const StyledSelect = styled('select')`
  width: 340px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${({ theme }) => theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${({ theme }) => theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${({ theme }) => theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  margin: 5px;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
  @media (max-width: 600px) {
    width: ${desktopWidth+"px"}; // Adjust width for screens smaller than 600px
  }
`

export const StyledImage = styled('img')`
  width: 32px;
  height: 32px;  
  border-radius: 50%;  
  object-fit: cover;  
  border: 0px solid transparent;  
`;

export const StyledInput = styled('input')`
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${({ theme }) => theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${({ theme }) => theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${({ theme }) => theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${({ theme }) => theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  margin: 5px;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
  @media (max-width: 600px) {
    width: ${desktopWidth+"px"}; // Adjust width for screens smaller than 600px
  }
`;

export const FormControl = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

export const SubmitButton = styled('button')`
  padding: 10px 20px;
  font-size: 0.875rem;
  font-family: 'IBM Plex Sans', sans-serif;
  color: #fff;
  font-weight: bold;
  background-color: ${"#004bcc"};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${"#01348e"};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${blue[200]};
  }
`; 
export const StyledTextArea = styled('textarea')(({ theme }) => ({
  width: '80%',
  maxWidth: '375px', // Set a max width, adjust as needed
  minHeight: '150px', // Set a minimum height
  fontSize: '1rem', // Adjust font size
  padding: '12px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ccc'}`, // Border based on theme
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  margin: "8px",

  // Focused state
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main, // Primary color border on focus
    boxShadow: `0 0 0 3px ${theme.palette.primary.light}`, // Subtle shadow on focus
  },

  // Hover state
  '&:hover': {
    borderColor: theme.palette.primary.dark, // Darker border on hover
  },

  // Resize disabled (Optional)
  resize: 'none',
}));