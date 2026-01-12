# @dreso/lib

Shared Angular library for the Androide microfrontend architecture. Provides UI components, services, models, authentication, and theming.

## Installation

```bash
# Add as file dependency (for local development)
pnpm add @dreso/lib@file:../dreso-lib/dist/dreso
```

## Usage

### Styles

Single import for complete theme:

```scss
// styles.scss
@use "@dreso/lib/src/themes/androide";
```

### Components

```typescript
import {
  // Layout
  SidenavComponent,
  BreadcrumbComponent,
  
  // Menu
  VerticalMenuComponent,
  HorizontalMenuComponent,
  
  // User
  UserMenuComponent,
  MessagesComponent,
  
  // Common
  FullScreenComponent,
  FlagsMenuComponent,
  ApplicationsComponent,
} from '@dreso/lib';
```

### Services

```typescript
import {
  SettingsService,
  MenuService,
  AuthService,
} from '@dreso/lib';
```

### Models

```typescript
import { Menu, Settings } from '@dreso/lib';
```

### Auth

```typescript
import { AuthService, tokenInterceptor } from '@dreso/lib';

// Check authentication
authService.isAuthenticated();

// Set/get token
authService.setToken('token');
authService.getToken();
```

### Utils

```typescript
import { CustomOverlayContainer } from '@dreso/lib';
```

## Building

```bash
cd dreso-lib
pnpm install
npm run build
```

Output: `dist/dreso/`

## Structure

```
src/
├── components/
│   ├── layout/      # sidenav, breadcrumb
│   ├── menu/        # vertical-menu, horizontal-menu
│   ├── user/        # user-menu, messages
│   └── common/      # fullscreen, applications, flags-menu
├── services/
│   └── core/        # SettingsService, MenuService
├── models/
│   └── core/        # Menu, Settings
├── auth/
│   ├── services/    # AuthService
│   └── interceptors/# tokenInterceptor
├── pipes/
├── directives/
├── utils/
└── themes/
    ├── _androide.scss  # Main entry point
    ├── _theme.scss
    ├── styles/
    └── skins/
```
