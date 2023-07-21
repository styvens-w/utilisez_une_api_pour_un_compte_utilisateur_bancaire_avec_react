import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "../utils/services/auth.service";

// Le store
const store = configureStore({
  reducer: {
    // On importe la propriété reducer de "authSlice" dans le magasin afin qu'elle se reflète dans l'objet d'état racine Redux.
    auth: authReducer,

    /**
     * Nous ajoutons le service d'authentification du fichier "/utils/services/auth.service.js" au store.
     * Un service RTKQ génère un « slice reducer » et un middleware personnalisé qui gère la récupération des données.
     * Les deux doivent être ajoutés au magasin Redux.
     */
    [authApi.reducerPath]: authApi.reducer,
  },

  /**
   * Les middlewares Redux permettent de changer le fonctionnement du store. Cela permet par exemple d’ajouter un
   * système de logging, ou bien de faciliter la manipulation d’action asynchrone.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
