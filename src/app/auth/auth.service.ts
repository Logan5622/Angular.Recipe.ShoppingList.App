import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user";
import { Router } from "@angular/router";

export interface AuthResponseData{
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router){}
    
    user = new BehaviorSubject<User>(null);
    expirationTimer : any;

    signgUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-WJO9cv0FIfzJ1tjJMXEHskLcMh0UAUc',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleErrors), tap(
            responseData => {
                this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn)
            }
        ))
    }

    login(email : string, password: string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-WJO9cv0FIfzJ1tjJMXEHskLcMh0UAUc',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(
            this.handleErrors
        ), tap(
            responseData => {
                this.handleAuthentication(responseData.email,responseData.localId,responseData.idToken,+responseData.expiresIn)
            }
        ))
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userdata');
        if(this.expirationTimer){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
        }

    autoLogin(){
       const userdata : {
        email: string;
        userId: string;
        _token : string;
        _tokenExpirationDate: string;
       } = JSON.parse( localStorage.getItem('userdata'));
       
       if(!userdata){
        return;
       }
       const loadedUser = new User(userdata.email,userdata.userId,userdata._token, new Date(userdata._tokenExpirationDate));
       
       if(userdata._token){

            this.user.next(loadedUser); 
            const expirestime = new Date(userdata._tokenExpirationDate).getDate() - new Date().getTime();
            this.autoLogout(expirestime);
       }
       
    }
    
    autoLogout(expirationTimeOut: number){
         this.expirationTimer = setTimeout(()=>{
            this.logout();
        },expirationTimeOut);
    }
    
    private handleAuthentication(email: string, userId: string , token: string, expiresIn : number){
        // getTime return current timestamp in milliseconfd that's why we are mutlipe into 1000 in the tokens because token was in seconds
        const expirationDate = new Date( new Date().getTime() + ( expiresIn * 1000)); 
        const user = new User(
            email,
            userId,
            token,
            expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);  
        localStorage.setItem('userdata', JSON.stringify(user));
    }
    private handleErrors(errorRes : HttpErrorResponse){
        let errorMessage = 'An unexecpeted error occurred';
        if(!errorRes.error || !errorRes.error.error ){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message)
        {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email was already exists !! please use different email';
                break;
            case 'INVALID_PASSWORD' :
                errorMessage = 'It was an invalid passoword '
                break;
            case 'USER_DISABLED':
                errorMessage = 'This user profile was disabled !!'   
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email was not found '
            
        }
        return throwError(errorMessage);
    }
}