import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';

import {
  selectCurrentUser,
  selectCurrentUserLoading,
} from '../../data-access/selectors/auth.selectors';
import { IAppState } from '../../utils/interfaces/app-state.interface';
import { AuthActions } from '../../../auth/data-access/store/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public currentUser$ = this.store.pipe(select(selectCurrentUser));

  public isLoadingUser$ = this.store.pipe(select(selectCurrentUserLoading));

  constructor(private store: Store<IAppState>) {}

  public logOut() {
    this.store.dispatch(AuthActions.logout());
  }
}
