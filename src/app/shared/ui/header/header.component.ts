import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Store, select } from '@ngrx/store';

import { selectCurrentUser } from '../../data-access/auth-store/auth.selectors';
import { IAppState } from '../../utils/app-state.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public currentUser$ = this.store.pipe(select(selectCurrentUser));

  constructor(private store: Store<IAppState>) {}
}
