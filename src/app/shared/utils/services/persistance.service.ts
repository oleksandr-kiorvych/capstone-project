import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  constructor() {}

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
