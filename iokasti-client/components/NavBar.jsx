import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about" prefetch={false} >
          About
        </Link>
      </li>
      <li>
        <Link href="/projects">Projects</Link>
      </li>
      <li>
        <Link href="/news">News</Link>
      </li>
      <li>
        <Link href="/teaching">Teaching</Link>
      </li>
      <li>
        <Link href="/notebook">Notebook</Link>
      </li>
    </ul>
  </nav>
  );
};

export default NavBar;