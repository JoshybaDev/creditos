import { Routes } from '@angular/router';
import { NofondpublicComponent } from './shared/pages/nofondpublic/nofondpublic.component';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard.routes').then(m => m.DASH_ROUTES),
        canActivate: [loggedGuard]
    },
    {
        path: '**',
        component: NofondpublicComponent
    }
];
