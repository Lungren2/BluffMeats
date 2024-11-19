import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { Item } from "../models/item.model"
import { User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl = "http://localhost/api"
  headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  })

  constructor(private http: HttpClient) {}

  // Items endpoints

  /**
   * Returns an observable of all items in the inventory.
   * The returned observable emits a single array of items and then completes.
   * @returns {Observable<Item[]>} An observable of all items in the inventory.
   */
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/endpoints/read.php`)
  }

  /**
   * Creates a new item in the inventory.
   * Returns an observable of the created item.
   * @param item The item to be created.
   * @returns {Observable<Item>} An observable of the created item.
   */
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/endpoints/create.php`, item, {
      headers: this.headers,
    })
  }

  /**
   * Updates an item in the inventory by ID.
   * Returns an observable of the updated item.
   * @param item The item to be updated.
   * @returns {Observable<Item>} An observable of the updated item.
   */
  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/endpoints/update.php`, item, {
      headers: this.headers,
    })
  }

  /**
   * Deletes an item from the inventory by ID.
   * Returns an observable that completes when the item has been deleted.
   * @param id The ID of the item to delete.
   * @returns {Observable<void>} An observable that completes when the item has been deleted.
   */
  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/endpoints/delete.php`, {
      headers: this.headers,
      body: JSON.stringify({ id: id }),
    })
  }
}
