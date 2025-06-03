import { config } from '@/utils/env';

import { AuthenticationClient, ManagementClient } from 'auth0';

const auth0 = new AuthenticationClient({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
});

const auth0Management = new ManagementClient({
  domain: config.AUTH0_DOMAIN,
  clientId: config.AUTH0_MANAGEMENT_CLIENT_ID,
  clientSecret: config.AUTH0_MANAGEMENT_CLIENT_SECRET,
});

export { auth0, auth0Management };