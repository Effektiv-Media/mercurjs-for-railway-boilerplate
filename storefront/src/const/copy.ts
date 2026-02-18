export type StorefrontLocale = string

type TrustItem = { title: string; subtitle?: string }

type Copy = {
  home: {
    seo: { title: string; description: string }
    hero: {
      heading: string
      paragraph: string
      buttons: { buy: string; sell: string }
    }
    sections: { trending: string; categories: string }
    trustStrip: { items: TrustItem[] }
  }
}

const EN: Copy = {
  home: {
    seo: {
      title: "Home",
      description:
        "Welcome to Clickfynd — a deal-driven marketplace with fast delivery and secure payments.",
    },
    hero: {
      heading: "Find great deals in a flash",
      paragraph:
        "Shop thousands of products from multiple sellers — new drops every day.",
      buttons: { buy: "Shop now", sell: "Sell" },
    },
    sections: {
      trending: "Popular right now",
      categories: "SHOP BY CATEGORY",
    },
    trustStrip: {
      items: [
        { title: "Secure payments", subtitle: "Pay safely with trusted providers" },
        { title: "Fast delivery", subtitle: "Delivery to pickup point" },
        { title: "Easy returns", subtitle: "Simple support & returns" },
      ],
    },
  },
}

const SV: Copy = {
  home: {
    seo: {
      title: "Start",
      description:
        "Välkommen till Clickfynd — en deal-driven marknadsplats med snabb leverans och trygga betalningar.",
    },
    hero: {
      heading: "Fynda bra deals – snabbt",
      paragraph:
        "Shoppa bland tusentals produkter från flera säljare — nya fynd varje dag.",
      buttons: { buy: "Shoppa", sell: "Sälj" },
    },
    sections: {
      trending: "Populärt just nu",
      categories: "HANDLA EFTER KATEGORI",
    },
    trustStrip: {
      items: [
        { title: "Trygga betalningar", subtitle: "Säkra betalsätt" },
        { title: "Snabb leverans", subtitle: "Leverans till ombud" },
        { title: "Smidiga returer", subtitle: "Enkelt & snabbt" },
      ],
    },
  },
}

function normalizeLocale(locale: StorefrontLocale) {
  return (locale || "").toLowerCase()
}

export function getCopy(locale: StorefrontLocale): Copy {
  const l = normalizeLocale(locale)

  // Mercur regions use country codes (e.g. "se") in the URL.
  if (l === "se" || l === "sv") return SV

  return EN
}
