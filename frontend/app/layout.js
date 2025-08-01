'use client';
import { Nunito } from 'next/font/google';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../public/template/css/styles.css';
import '../public/template/css/fontawesome-free/css/all.min.css';
import '../public/template/css/sb-admin-2.min.css';

const nunito = Nunito({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={nunito.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-solid fa-trowel-bricks"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            <sup>Gerenciamento de Estoque</sup>
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <Link className="nav-link" href="/">
            <i className="fas fa-home"></i>
            <span>Início</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Menu</div>

        <li className="nav-item">
          <Link className="nav-link" href="/produtos">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="me-2"
              style={{ opacity: 0.6, width: '1em', height: '1em' }}
            />
            <span>Produtos</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/categorias">
            <i className="fas fa-solid fa-list"></i>
            <span>Categorias</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/usuarios">
            <i className="fas fa-solid fa-users"></i>
            <span>Usuários</span>
          </Link>
        </li>
      </ul>

      {/* Topbar + Conteúdo */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <span className="navbar-brand mb-0 h1">Sistema de Gerenciamento de Estoque</span>
          </nav>
          <div className="container-fluid">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
