import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, updateUser } from "./authActions";

/**
 * On initialise userToken à partir du local storage.
 * On vérifie s'il y a un token stocké grâce à une condition ternaire et on récupère celui-ci.
 * S'il n'y en a pas, on définit la variable sur "null".
 */
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

// Le state initial
const initialState = {
  loading: false,
  loginSuccess: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

/**
 * createSlice permet de créer une tranche redux qui représente une seule unité d'état Redux.
 * Il s'agit d'un ensemble de logiques et d'actions de réducteur pour une seule fonctionnalité de votre application,
 * généralement définies ensemble dans un seul fichier.
 *
 * J'ai décidé de séparer les reducers et les actions en deux fichiers "authSlice et authAction" pour rendre mon code plus lisible.
 */
const authSlice = createSlice({
  // Le nom du slice
  name: "auth",

  // Le state initial
  initialState,

  // "reducers" permet de définir les actions et le reducer
  reducers: {
    // L'action logout (déconnexion)
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.loginSuccess = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },

    // L'action setCredentials qui permet de mettre à jour la valeur du store (quand un utilisateur est connecté).
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },

  /**
   * "extraReducers" permet à "createSlice" de répondre à d'autres types d'action en plus des types qu'il a générés.
   *
   * Comme les réducteurs de cas spécifiés avec extraReducers sont destinés à référencer des actions "externes", ils n'auront pas d'actions générées dans slice.actions.
   *
   * Comme pour reducers, ces réducteurs de cas seront également transmis à createReducer et pourront "muter" leur état en toute sécurité.
   *
   * La méthode d'utilisation recommandée d'extraReducers consiste à utiliser un rappel qui reçoit une "ActionReducerMapBuilder" instance.
   *
   * Les actions créées avec createAsyncThunk génèrent trois types d'action de cycle de vie possibles : 'pending', 'fulfilled' et 'rejected'.
   * On peut utiliser ces types d'action dans la propriété "extraReducers" de "authSlice" pour apporter les modifications appropriées à notre état.
   */
  extraReducers: (builder) => {
    // reducer pour la connexion
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.loginSuccess = false;
        state.error = null;
      })

      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.loginSuccess = true;
        state.userInfo = payload;
        state.userToken = payload.body.token;
      })

      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.loginSuccess = false;
        state.error = payload;
      });

    // reducer pour l'inscription
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true; // inscription réussie
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // reducer pour la mise à jour de l'utilisateur
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })

      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
