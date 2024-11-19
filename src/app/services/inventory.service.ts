import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { Item } from "../models/item.model"

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  private items: Item[] = []

  /**
   * Returns an observable of all items in the inventory.
   * The returned observable emits a single array of items and then completes.
   * @returns {Observable<Item[]>} An observable of all items in the inventory.
   */
  getItems(): Observable<Item[]> {
    return of(this.items)
  }

  /**
   * Adds an item to the inventory.
   * Returns an observable of the added item.
   */
  addItem(item: Item): Observable<Item> {
    this.items.push(item)
    return of(item)
  }

  /**
   * Updates an item in the inventory by ID.
   * Returns an observable of the updated item, or the original item if the update was unsuccessful.
   */
  updateItem(item: Item): Observable<Item> {
    const index = this.items.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      this.items[index] = item
    }
    return of(item)
  }

  /**
   * Deletes an item from the inventory by ID.
   * Returns true if the item is found and deleted, false otherwise.
   * @param id The ID of the item to delete
   */
  deleteItem(id: string): Observable<boolean> {
    const index = this.items.findIndex((i) => i.id.toString() === id)
    if (index !== -1) {
      this.items.splice(index, 1)
      return of(true)
    }
    return of(false)
  }
}
