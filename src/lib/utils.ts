type ClassName = string | false | null | undefined;

export function cn(...values: ClassName[]): string {
  return values.filter(Boolean).join(' ');
}
