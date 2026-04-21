import "./Header.css";

function Header({ title, subtitle }) {
  return (
    <header className="header-content">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
