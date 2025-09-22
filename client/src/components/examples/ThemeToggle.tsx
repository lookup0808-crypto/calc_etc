import ThemeToggle from '../ThemeToggle'

export default function ThemeToggleExample() {
  return (
    <div className="p-6 bg-background">
      <div className="flex items-center gap-4">
        <span className="text-foreground">테마 전환:</span>
        <ThemeToggle />
      </div>
    </div>
  );
}