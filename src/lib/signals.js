let cachedSignals = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Fetch the signals for the network
 * 
 * @returns The keywords to be used for this initial set of signals as Array
 */
window.fetchNetworkSignals = async function () {
    // If cache is valid, return cached signals
    if (cachedSignals && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        console.log("RETURN CACHE");
        return cachedSignals;
    } else {
        console.log("FETCH NO CACHE");
    }

    try {
        const response = await fetch('https://signals.monorail.xyz/v1/network/signals');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const signals = await response.json();

        // Update cache
        cachedSignals = signals;
        lastFetchTime = Date.now();
        return signals;
    } catch (error) {
        console.error('Error fetching keywords:', error);
        return {
            mandatory: ["monad", "testnet"],
            optional: []
        };
    }
}