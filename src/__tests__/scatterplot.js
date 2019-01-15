import scatterplot, { selector, url } from '../js/scatterplot';

describe('scatterplot', () => {
  beforeEach(() => {
    const body = document.querySelector('body');
    const node = document.createElement('div');
    node.setAttribute('id', 'scatterplot');
    body.appendChild(node);
  });
  afterEach(() => {
    // Remove all body's children to make sure the tests are independent
    const body = document.querySelector('body');
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  });
  it('starts with <div id="scatterplot" />', () => {
    expect(document.querySelector('body')).not.toBeEmpty();
    const div = document.querySelector(selector);
    expect(div).toBeInTheDocument();
    expect(div).toBeVisible();
  });
  it('shows an error in #scatterplot (fetch not available)', async () => {
    await scatterplot(selector, url);
    expect(document.querySelector('.circles')).not.toBeInTheDocument();
    const div = document.querySelector(selector).firstChild;
    const h1Text = 'ReferenceError: fetch is not defined';
    expect(div.firstChild).toHaveTextContent(h1Text);
    const pText = `There was an error fetching the data at ${url}`;
    expect(div.lastChild).toHaveTextContent(pText);
  });
});
