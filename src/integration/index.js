import React from 'react';
import ReactDOM from 'react-dom/client';
import Loader from './Loader';

class TargetEmbed {
  _ready;
  targetQuery;
  constructor() {
    this._ready = false;
    this.targetQuery = '.princess-embed-target';
  }

  test = () => {
    console.log('test');
  };
  render = (divs) => {
    let targetDivs = divs;

    if (!targetDivs) {
      targetDivs = document.querySelectorAll(this.targetQuery);
      if (!targetDivs) return;
    }

    if (!window.princess._ready) {
      console.log('rendering princess...');
      targetDivs.forEach((d) => {
        const root = ReactDOM.createRoot(d);
        root.render(
          <React.StrictMode>
            <Loader />
          </React.StrictMode>
        );
        // ReactDOM.render(
        //   <React.StrictMode>
        //     <Loader />
        //   </React.StrictMode>,
        //   d
        // );
      });

      window.princess._ready = true;
    }
  };

  init = (target) => {
    console.log('Princess Target initialized...');
    const readyEvent = new Event('target_ready', { bubbles: true });
    let divs = document.querySelectorAll(this.targetQuery);
    const search = setInterval(function () {
      console.log('searching DOM for Princess Target...');
      divs = document.querySelectorAll(target.targetQuery);
      if (divs) {
        console.log('found target');
        document.dispatchEvent(readyEvent);
        target.render(divs);
        clearInterval(search);
      }
    }, 1000);
  };
}
(() => {
  const target = new TargetEmbed();
  target.test();
  window.princess = target;
  target.init(target);
})();

export default TargetEmbed;
