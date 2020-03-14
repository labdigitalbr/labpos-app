import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private _DB: any;
  user: Observable<Product>;

  uid: any;

  constructor(public http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,) {
    this._DB = firebase.firestore();
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log(user);
          return this.afs.doc<Product>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    );
  }

  getProducts(){
    return this.afs.collection<Product>(`products`).valueChanges()
  }
  
  getCategories(){
    return this.afs.collection<Category>(`categories`).valueChanges()
  }

  getCat(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection("categories").get().then((querySnapshot) => {

        let obj: any = [];

        querySnapshot
          .forEach((doc: any) => {
            obj.push({
              id: doc.id,
              data: doc.data()
            });
          });

        resolve(obj);
      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).get().then((querySnapshot) => {

        let obj: any = [];

        querySnapshot
          .forEach((doc: any) => {
            obj.push({
              id: doc.id,
              data: doc.data()
            });
          });

        resolve(obj);
      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).add(dataObj).then((obj: any) => {
        resolve(obj);
      })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  deleteDocument(collectionObj: string,
    docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }


  updateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

}
