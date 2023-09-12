//  generate session
export function generateSessionToken() {
  const random_digit = Math.floor(Math.random() * 1000000 + 1);
  return String(random_digit);
}
