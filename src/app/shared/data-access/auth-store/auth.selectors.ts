import { createSelector } from '@ngrx/store';

import { IAppState } from '../../utils/interfaces/app-state.interface';

const currentUserSelector = (state: IAppState) => state.userSlice;

export const selectCurrentUser = createSelector(
  currentUserSelector,
  (state) => state.currentUser
);

export const selectCurrentUserLoading = createSelector(
  currentUserSelector,
  (state) => state.isLoading
);

export const selectCurrentUserError = createSelector(
  currentUserSelector,
  (state) => state.error
);
