import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-6 pb-12 border-t border-border/40">
      <div className="w-full px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {currentYear} Tang Yetong</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/experience" className="hover:text-primary transition-colors">Experience</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/hobbies" className="hover:text-primary transition-colors">Hobbies</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
