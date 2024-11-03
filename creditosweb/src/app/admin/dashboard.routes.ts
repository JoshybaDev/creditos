import { Routes } from "@angular/router";
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersNewComponent } from "./users/users-new/users-new.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";
import { CustomersListComponent } from "./customers/customers-list/customers-list.component";
import { CustomersNewComponent } from "./customers/customers-new/customers-new.component";
import { CustomersEditComponent } from "./customers/customers-edit/customers-edit.component";

export const DASH_ROUTES: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: '', component: DashboardComponent },
            { path: 'users', component: UsersListComponent  },
            { path: 'users/new', component: UsersNewComponent  },
            { path: 'users/edit/:id', component: UsersEditComponent  },
            { path: 'customers', component: CustomersListComponent  },
            { path: 'customers/new', component: CustomersNewComponent  },
            { path: 'customers/edit/:id', component: CustomersEditComponent  },             
        ]
    }
]