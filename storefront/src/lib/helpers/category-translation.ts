export const getCategoryTranslationKey = (handle: string) => {
  switch (handle) {
    case "electronics":
    case "elektronik":
      return "electronics"

    case "apparel":
    case "klader":
      return "apparel"

    case "home-&-garden":
    case "hem-och-tradgard":
      return "homeGarden"

    default:
      return null
  }
}