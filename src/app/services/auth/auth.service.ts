import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  testToken: string =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzQ4MDkwNjAsImV4cCI6MTY2NjM0NTA2MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIlVzZXJJRCI6IkE4QTY2OEY5LUI3MkItNDFGQy1CRDk3LTA4RDk5MkYyNTJBNiJ9.xg0Gei0s-PdLLOzxSeKBCdLDrk3_5eTNXlTmXm17bxg';

  public getToken(): string {
    // return localStorage.getItem('token');
    return this.testToken;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    return tokenNotExpired(token);
  }
}
function tokenNotExpired(token: string): boolean {
  throw new Error('Function not implemented.');
}
