// src/app/core/filter-sort.service.ts

//SOURCE: https://auth0.com/blog/real-world-angular-series-part-3/

// [WILL NEED TO CHANGE TO FIT FUNCITONALITIES]
import { Injectable } from "@angular/core";
import { DatePipe } from "@angular/common";
import * as Fuse from "fuse.js";

@Injectable()
export class FilterSortService {
  constructor(private datePipe: DatePipe) {}

  //CHECKS IF ARRAY CONTAINED ANY OBJECTS
  private _objArrayCheck(array: any[]): boolean {
    // Checks if the first item in the array is an object
    // (assumes same-shape for all array items)
    // Necessary because some arrays passed in may have
    // models that don't match {[key: string]: any}[]
    // This check prevents uncaught reference errors
    const item0 = array[0];
    const check = !!(
      array.length &&
      item0 !== null &&
      Object.prototype.toString.call(item0) === "[object Object]"
    );
    return check;
  }

  //FUSE SEARCH
  search(array, query: string) {
    //FUSE OPTIONS
    var options = {
      shouldSort: true,
      // tokenize: true,
      // matchAllTokens: true,
      findAllMatches: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["title", "artist", "genre", "album", "year"]
    };

    if (!query || !this._objArrayCheck(array)) {
      return array;
    }

    var fuse = new Fuse(array, options);

    var result = fuse.search(query);

    return result;
  }

  noSearchResults(arr: any[], query: string): boolean {
    // Check if array searched by query returned any results
    return !!(!arr.length && query);
  }

  //Used to filter out array (so, call filter(review[], rating, null) will give with null rating)
  filter(array: any[], property: string, value: any) {
    // Return only items with specific key/value pair
    if (!property || value === undefined || !this._objArrayCheck(array)) {
      return array;
    }
    const filteredArray = array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          if (key === property && item[key] === value) {
            return true;
          }
        }
      }
    });
    return filteredArray;
  }
}
