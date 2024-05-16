import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@material-ui/core';
import { TextField, Typography } from "@mui/material"
import CommonButton from './commonButton';

function SearchBar({searchValue, onClick, onChange, placeholder, title, paid}){
    return(
        <Box sx={{alignItems:"center", marginLeft :{ xs:'150px'}}}>
            <Typography variant="h3" sx={{ marginLeft:"40vh",marginTop:"20px", fontWeight:"600", }}> {title} </Typography>
            <Box sx={{marginRight:'30px', marginLeft:'60px' }}>
                <form>
                    <SearchIcon sx={{marginRight:'30px', marginLeft:'30px',marginTop:'9px', }} />
                    <TextField p={3}
                        sx={{width:'50%', fontSize:'1.1rem',marginRight:'40px'}}
                        placeholder={placeholder}
                        label="searchValue"
                        name="searchValue"
                        variant="standard"
                        onChange={onChange}
                        value={searchValue}
                                />
                    { paid ? ( <CommonButton 
                        size='large'
                        variant = 'contained'
                        onClick={onClick}
                    >
                        Search
                    </CommonButton> ) : ( null ) }
                </form>
            </Box>
        </Box>
    )
}export default SearchBar