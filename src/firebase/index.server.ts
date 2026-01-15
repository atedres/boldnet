'use server';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export async function initializeFirebase() {
  if (!getApps().length) {
    initializeApp();
  }
  return getSdks(getApp());
}

export async function getSdks(firebaseApp: FirebaseApp) {
  return {
    firestore: getFirestore(firebaseApp)
  };
}
