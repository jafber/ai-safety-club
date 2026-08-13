const emailButton = document.querySelector('#email-button');

if (emailButton) {
  emailButton.addEventListener('click', () => {
    const address = ['klub-artificial-intelligence-sprecher', 'hpi', 'de'].join('@').replace('@de', '.de');
    window.location.href = `mailto:${address}`;
  });
}
