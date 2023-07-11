import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IFavorite {
  imdbID: string[];
}

const initialState: IFavorite = { imdbID: [] };

export const favoritesSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const currentFavorites = state.imdbID;
      currentFavorites.push(action.payload);
      state.imdbID = currentFavorites;
    },
    delFavorite: (state, action: PayloadAction<string>) => {
      const currentFavorites = state.imdbID;
      const index = currentFavorites.indexOf(action.payload, 0);
      if (index > -1) {
        currentFavorites.splice(index, 1);
      }
      state.imdbID = currentFavorites;
    },
  },
});

export const { addFavorite, delFavorite } = favoritesSlice.actions;
