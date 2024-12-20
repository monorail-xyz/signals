let xDisplayMode = 'light';

/**
 * Handle DOM updates and watch for required signals
 */
const observer = new MutationObserver(async (mutations) => {
    const signals = await window.fetchNetworkSignals();

    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const articles = node.getElementsByTagName('article');
                for (const article of articles) {
                    const tweetTextDiv = article.querySelector('[data-testid="tweetText"]');
                    if (tweetTextDiv?.textContent) {
                        const tweetText = tweetTextDiv.textContent.toLowerCase();

                        const hasMandatory = signals.mandatory.every(keyword => tweetText.includes(keyword));
                        const hasOptional = signals.optional.some(keyword => tweetText.includes(keyword));

                        // Only proceed if both conditions are met
                        if (hasMandatory && hasOptional) {
                            // Get list of all matched keywords for reference
                            const matchedKeywords = [
                                ...signals.mandatory.filter(keyword => tweetText.includes(keyword)),
                                ...signals.optional.filter(keyword => tweetText.includes(keyword))
                            ];
                            handleTweetDetection(tweetTextDiv, matchedKeywords);
                        }
                    }
                }
            }
        }
    }
});

/**
 * Handle the injection of content into the tweet
 */
async function handleTweetDetection(tweetTextDiv, matchedKeywords) {
    if (!tweetTextDiv.querySelector('.signals-info')) {
        console.log('Matched keywords:', matchedKeywords);

        // First inject loading state
        const loadingDiv = window.createLoadingDiv(xDisplayMode);
        tweetTextDiv.appendChild(loadingDiv);

        // Fetch the data for the matched keyworks
        const content = await window.fetchNetworkContent(matchedKeywords, xDisplayMode);
        console.log("content", content);
        if (content) {
            // Replace loading div with actual content
            const contentDiv = document.createElement('div');
            contentDiv.className = 'signals-info';
            contentDiv.innerHTML = content;
            loadingDiv.replaceWith(contentDiv);
            // Add any event listeners or dynamic behavior needed for the injected HTML
            // setupInjectedContent(contentDiv);
        } else {
            // Remove loading div if there was an error
            loadingDiv.remove();
        }
    }
}

xDisplayMode = determineDisplayMode();
observer.observe(document.body, {
    childList: true,
    subtree: true
});