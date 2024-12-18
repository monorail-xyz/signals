const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const articles = node.getElementsByTagName('article');
                for (const article of articles) {
                    const tweetTextDiv = article.querySelector('[data-testid="tweetText"]');
                    if (tweetTextDiv?.textContent?.toLowerCase().includes('monad testnet')) {
                        if (!tweetTextDiv.querySelector('.monad-info')) {
                            const div = document.createElement('div');
                            div.className = 'monad-info';
                            div.innerHTML = `
                <div style="
                  padding: 5px !important;
                  border-radius: 10px;
                  margin: 5px 0;
                  color: white;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                  line-height: 16px;
                  border: 1px solid #f5cb4c;
                ">
                  <div style="margin: 0px; font-size: 16px; font-weight: 600; color: #333333; padding: 5px;">Monorail content area</div>
                </div>
              `;
                            tweetTextDiv.appendChild(div);
                        }
                    }
                }
            }
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});