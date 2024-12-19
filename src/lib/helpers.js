/**
 * Determines if X is in light, dim or dark mode
 * 
 * @returns dark, light or dim
 */
window.determineDisplayMode = function (tolerance = 0) {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    const rgb = bgColor.match(/\d+/g).map(Number);

    const isClose = (a, b) => Math.abs(a - b) <= tolerance;

    if (isClose(rgb[0], 0) && isClose(rgb[1], 0) && isClose(rgb[2], 0)) {
        return 'dark';
    } else if (isClose(rgb[0], 255) && isClose(rgb[1], 255) && isClose(rgb[2], 255)) {
        return 'light';
    } else if (isClose(rgb[0], 21) && isClose(rgb[1], 32) && isClose(rgb[2], 43)) {
        return 'dim';
    }

    return 'light';
}

/**
 * createLoadingDiv creates a loading div that can be used to display loading state
 * while taking the display mode on X into account
 * 
 * @returns 
 */
window.createLoadingDiv = function (displayMode = 'light') {
    let railColor = '#FFB800';
    let borderColor = 'rgb(239, 243, 244)';
    let loadingTextColor = '#2c436a';

    if (displayMode === 'dark') {
        railColor = '#FFB800';
        borderColor = 'rgb(47, 51, 54)';
        loadingTextColor = '#9babc7';

    } else if (displayMode === 'dim') {
        railColor = '#FFB800';
        borderColor = 'rgb(56, 68, 77)';
        loadingTextColor = '#5d7296';
    }


    const div = document.createElement('div');
    div.className = 'signals-info loading';
    div.style = `
        margin-top: 10px;
        line-height: 0px;
        margin-bottom: 10px;
    `;
    div.innerHTML = `
    <div style="
        padding: 4px 8px;
        font-family: TwitterChirp, Roboto, Helvetica, Arial, sans-serif;
        overflow: hidden;
        position: relative;
        line-height: 4px;
        font-size: 12px;
        border-radius: 8px;
        margin: 8px 0;
        border-width: 1px;
        border-style: solid;
        border-color: ${borderColor};

    ">
      <div style="
        position: absolute;
        top: 0;
        left: -20%;
        width: 20%;
        height: 2px;
        background: ${railColor};
        animation: slide 1.6s infinite linear;
        line-height: 0px;
      "></div>
      <div style="color: ${loadingTextColor}; text-align: center; width: 100%">
        Interpreting Monorail Signal
      </div>
    </div>
    <style>
      @keyframes slide {
        0% { left: -20%; }
        50% { left: 100%; }
        100% { left: 100%; }
      }
    </style>
  `;
    return div;
}