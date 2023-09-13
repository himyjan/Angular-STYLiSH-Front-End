import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import api from '../../utils/api';
import getJwtToken from '../../utils/getJwtToken';
import type { profile } from '../../types/profileType';

@Component({
  selector: 'Profile',
  standalone: true,
  template: `
    <div class="Wrapper">
      <div class="Title">
          會員基本資訊
      </div>
      <div *ngIf="profile()">
        <img src="profile().picture" />
        <div>{{ profile()!.name }}</div>
        <div>{{ profile()!.email }}</div>
        <button (click)="removeJwtToken()"></button>
      </div>
    </div>
  `,
  styles: [`
    .Wrapper {
      padding: 60px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .Title {
      padding-bottom: 16px;
      border-bottom: 1px solid #979797;
      font-size: 24px;
      font-weight: bold;
    }

    .Photo {
      margin-top: 24px;
    }

    .Content {
      margin-top: 24px;
    }

    .LogoutButton {
      margin-top: 24px;
    }
  `],
  imports: [CommonModule]
})
export class ProfileComponent {
  profile = signal<profile | null>(null);

  constructor() {
    async () => {
      let jwtToken = window.localStorage.getItem('jwtToken');

      if (!jwtToken) {
        try {
          jwtToken = await getJwtToken();
        } catch (e: unknown) {
          if (e instanceof Error) {
            window.alert(e.message);
          } else {
            window.alert('An unknown error occurred');
          }
          return;
        }
      }
      window.localStorage.setItem('jwtToken', jwtToken!);

      const { data } = await api.getProfile(jwtToken!);
      this.profile.set(data);
    }
  };

  removeJwtToken = () => {
    window.localStorage.removeItem('jwtToken');
  };
}
