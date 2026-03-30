export const getCategoryTranslationKey = (handle: string) => {
  switch (handle) {
    case "elektronik":
      return "electronics"
    case "klader":
      return "apparel"
    case "hem-och-tradgard":
      return "homeGarden"
    default:
      return null
  }
}