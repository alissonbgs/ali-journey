import {
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { SocialLink, SocialPlatform } from "./types";

type SocialLinksProps = {
  links: readonly SocialLink[];
};

const iconByPlatform: Record<SocialPlatform, typeof GithubLogoIcon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
};

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="home-social-row mt-8">
      {links.map((link) => {
        const Icon = iconByPlatform[link.platform];

        return (
          <a
            aria-label={link.ariaLabel}
            className="home-social-link"
            href={link.href}
            key={link.href}
            rel="noreferrer"
            target="_blank"
          >
            <Icon size={20} weight="fill" />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
