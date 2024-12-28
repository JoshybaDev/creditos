import { Routes } from '@angular/router';

import { NofondpublicComponent } from '@shared/pages/nofondpublic/nofondpublic.component';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin/admin.routes').then(m => m.DASH_ROUTES),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        component: NofondpublicComponent
    }
];
