declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    ADMIN_USERNAME?: string;
    ADMIN_PASSWORD_SALT?: string;
    ADMIN_PASSWORD_HASH?: string;
    SITE_URL?: string;
    CONTACT_NOTIFICATION_URL?: string;
    CONTACT_NOTIFICATION_TOKEN?: string;
  }
}
