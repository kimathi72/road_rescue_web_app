import Alert from '@mui/material/Alert';

export class Log{
    static success(message){
        return <Alert severity='success'>{message}</Alert>
    }
    static error(message){
        return <Alert severity="error">{message}</Alert>
    }
    static warning(message){
        return <Alert severity="warning">{message}</Alert>
    }
    static info(message){
        return <Alert severity="info">{message}</Alert>
    }
    
  
    
}




      
      