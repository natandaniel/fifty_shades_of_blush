import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header className="mdl-layout__header mdl-layout__header--waterfall portfolio-header">
        <div className="mdl-layout__header-row portfolio-logo-row">
          <span className="mdl-layout__title">
            <div className="portfolio-logo"></div>
          </span>
        </div>
        <div className="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
          <nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
            <a className="mdl-navigation__link is-active" href="index.html">Beauty</a>
            <a className="mdl-navigation__link is-active" href="fashion.html">Fashion</a>
            <a className="mdl-navigation__link is-active" href="travel.html">Travel</a>
            <a className="mdl-navigation__link is-active" href="lifestyle.html">Lifestyle</a>
          </nav>
        </div>
      </header>
      <div className="mdl-layout__drawer mdl-layout--small-screen-only">
        <nav className="mdl-navigation mdl-typography--body-1-force-preferred-font">
          <a className="mdl-navigation__link is-active" href="index.html">Beauty</a>
          <a className="mdl-navigation__link is-active" href="fashion.html">Fashion</a>
          <a className="mdl-navigation__link is-active" href="travel.html">Travel</a>
          <a className="mdl-navigation__link is-active" href="lifestyle.html">Lifestyle</a>
          <a className="mdl-navigation__link" href="about.html">About Me</a>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="mdl-grid portfolio-max-width">
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work01.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Blog template</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work07.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Sunt nulla</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work02.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Android.com website</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work03.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Dashboard template</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work04.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Text-heavy website</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work08.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Ex officia laborum</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work05.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Stand-alone article</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work06.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">MDL website</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
          <div className="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div className="mdl-card__media">
              <img className="article-image" src=" images/example-work09.jpg" border="0" alt="" />
            </div>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Consequat ut quis</h2>
            </div>
            <div className="mdl-card__supporting-text">
              Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.
                </div>
            <div className="mdl-card__actions mdl-card--border">
              <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="portfolio-example01.html">Read more</a>
            </div>
          </div>
        </div>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer__left-section">
            <div className="mdl-logo">Simple portfolio website</div>
          </div>
          <div className="mdl-mini-footer__right-section">
            <ul className="mdl-mini-footer__link-list">
              <li><a href="#">Help</a></li>
              <li><a href="#">Privacy & Terms</a></li>
            </ul>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
