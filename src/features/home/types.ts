export type SocialPlatform = "github" | "linkedin";

export type SocialLink = {
  label: string;
  href: string;
  ariaLabel: string;
  platform: SocialPlatform;
};
