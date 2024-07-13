import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

function Signin(){
    return <div>
        <div style={{
            paddingTop: 100,
            marginBottom: 20,
            display:"flex",
            justifyContent:"center"
        }}>
            <Typography variant={'h5'}>
            Welcome to my portfolio !!
            </Typography>
        </div>
        
        <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style={{width: 350, padding: 25, }}>
            <TextField 
            fullWidth={true} 
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            />
            <br /> <br />
            <TextField
            fullWidth={true} 
            id="outlined-basic" 
            label="password" 
            variant="outlined" 
            />
            <br /> <br />
            <Button size={'large'} variant="contained">Sign in</Button>
            </Card>
            </div>
    </div>
}

export default Signin