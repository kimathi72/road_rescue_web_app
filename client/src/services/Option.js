export class Option{
    headerfn(){
        return {
         "Authorization": localStorage.getItem('jwt') && `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type" : "application/json"
    }
    }
     authorized(obj){
        return {
            method: obj.method,
            headers: this.headerfn(),
           body: obj.body && JSON.stringify(obj.body) 
        }
    }
  
    
}