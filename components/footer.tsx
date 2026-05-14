'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-6 pb-12 border-t border-border/40">
      <div className="w-full px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} Tang Yetong</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">About</a>
          <a href="#" className="hover:text-foreground transition-colors">Experience</a>
          <a href="#" className="hover:text-foreground transition-colors">Blog</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
