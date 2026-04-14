export type SocialIcon = "facebook" | "instagram" | "linkedin" | "tiktok"

const footerLinks = {
  customerServices: [
    { key: "faq", path: "/vanliga-fragor" },
    { key: "trackOrder", path: "/spara-order" },
    { key: "returns", path: "/returer" },
    { key: "delivery", path: "/leverans" },
    { key: "payment", path: "/betalning" },
  ],
  about: [
    { key: "aboutUs", path: "/om-oss" },
    { key: "contact", path: "/kontakt" },
  ],
  social: [
    {
      label: "Facebook",
      icon: "facebook" as SocialIcon,
      path: "https://facebook.com/clickfynd",
    },
    {
      label: "Instagram",
      icon: "instagram" as SocialIcon,
      path: "https://instagram.com/clickfynd",
    },
    {
      label: "LinkedIn",
      icon: "linkedin" as SocialIcon,
      path: "https://linkedin.com/company/clickfynd",
    },
    {
      label: "TikTok",
      icon: "tiktok" as SocialIcon,
      path: "https://tiktok.com/@clickfynd",
    },
  ],
}

export default footerLinks
