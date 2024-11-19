import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { BehaviorSubject, Observable, tap } from "rxjs"
// import { User } from "../models/user.model"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface AuthResponse {
  message: string
  user: User
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()
  private apiUrl = "http://localhost/api"
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem("currentUser") || "null")
    )
    this.currentUser$ = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value
  }

  /**
   * Log in to the application.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns An Observable that emits the user information if the login is
   * successful, or an error if the login fails.
   */
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/endpoints/login.php`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.user) {
            localStorage.setItem("currentUser", JSON.stringify(response.user))
            this.currentUserSubject.next(response.user)
          }
        })
      )
  }

  /**
   * Registers a new user with the application.
   * @param name The name of the new user.
   * @param email The email of the new user.
   * @param password The password of the new user.
   * @returns An Observable that emits the user information if the registration is
   * successful, or an error if the registration fails.
   */
  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/endpoints/register.php`,
      {
        name,
        email,
        password,
      }
    )
  }

  /**
   * Logs the user out of the application by removing the user's information
   * from local storage and notifying any subscribers of the user's logout.
   */
  logout() {
    localStorage.removeItem("currentUser")
    this.currentUserSubject.next(null)
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === "admin"
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value
  }
}
