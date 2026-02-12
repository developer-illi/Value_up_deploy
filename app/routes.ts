import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('./features/main/layout.tsx', [index('./features/main/page.tsx')]),
  layout('./features/admin/auth-guard.tsx', [
    layout('./features/admin/layout.tsx', [route('admin', './features/admin/page.tsx')]),
  ]),
  route('/login', './features/auth/page.tsx'),
  ...prefix('api', [
    route('auth', './features/api/auth.tsx'),
    route('portfolio', './features/api/portfolio.tsx'),
    route('project', './features/api/project.tsx'),
    route('partner', './features/api/partner.tsx'),
    route('partner-ceo', './features/api/partner-ceo.tsx'),
    route('outro-message', './features/api/outro-message.tsx'),
    route('company-info', './features/api/company-info.tsx'),
    route('upload-image', './features/api/upload-image.tsx'),
    route('subscribe', './features/api/subscribe.tsx'),
    route('information', './features/api/information.tsx'),
  ]),
] satisfies RouteConfig
