# Sample Size Calculator for A/B Testing

## Overview

Sample Size is a Chrome extension designed to help you quickly calculate the required sample size for your A/B tests. By inputting key metrics like baseline conversion rate, minimum detectable effect, statistical power, and significance level, this tool provides you with an accurate estimate of the number of subjects needed per variation to achieve statistically significant results.

## Features

- **Baseline Conversion Rate:** Input the current conversion rate of your control group.
- **Minimum Detectable Effect:** Specify the smallest change in conversion rate that you want to be able to detect.
- **Absolute vs Relative Difference:** Choose whether the minimum detectable effect is an absolute or relative difference.
- **Statistical Power (1-β):** Set the desired power of your test, representing the probability of detecting an effect if there is one.
- **Significance Level (α):** Adjust the significance level, which represents the probability of a Type I error (false positive).

## Credit

This tool was inspired by and built upon the work of Evan Miller, who collaborated in the development of this extension. The sample size calculator on [Evan Miller's website](https://www.evanmiller.org/ab-testing/sample-size.html) served as a foundation for the statistical calculations used in this tool. We highly recommend visiting his site for more in-depth information on A/B testing and statistical analysis.

## Installation

To install and run the Sample Size extension locally, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation Steps

1. **Clone the Repository:**

    ```
    git clone <repository-url>
    cd sample-size
    ```

2. **Install Dependencies:**

    Run the following command in the root directory of the project:

        npm install

3. **Build the Project:**

    To build the project for production, run:

        npm run build

    This will create a build folder containing the production-ready files.

4. **Load the Extension in Chrome:**

    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode" using the toggle in the top right corner.
    - Click the "Load unpacked" button.
    - Navigate to the `build` folder of the project and select it.

### Use the Extension:

The Sample Size icon should now appear in your Chrome toolbar. Click on it to open the popup and start calculating your sample size for A/B tests.

### Development:

If you want to make changes to the extension:

Start Development Server:

To start the development server with hot-reloading, run:

    npm start

This will start the app in development mode. You can then edit the code and see the changes reflected in real-time.

### Rebuild and Reload:

After making changes, rebuild the project using `npm run build`, and then reload the extension in Chrome by going to `chrome://extensions/` and clicking the "Reload" button for the Sample Size extension.

### License:

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
