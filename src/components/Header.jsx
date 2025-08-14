import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner container">
        <a href="/" className="brand">
          <div className="brand-logo"></div>
          <strong>TILERSHUB</strong>
        </a>
        <nav className="nav hstack">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/tilers">Tilers</NavLink>
          <NavLink to="/admin/login">Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}