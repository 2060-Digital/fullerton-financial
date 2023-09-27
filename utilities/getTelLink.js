export default function getTelLink(numberString) {
  if (typeof numberString !== "string") return null
  let digitsOnly = numberString.replace(/\D/g, "")
  if (!digitsOnly.startsWith("1")) digitsOnly = "1" + digitsOnly
  return `tel:+${digitsOnly}`
}
