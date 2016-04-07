# Hat selector exercise
     
## Approach

- Angular2 (ng2) using Typescript 1.8
- Favoured Webpack/CommonJS tooling over BrowserSync/SystemJS
- Bootstrap v3 CSS Framework
- Features:
    - SVG Component for including inline SVGs
    - Messages for handling & displaying user messages
    - Hats for handling the display & business logic for hat data
    
- ng2 services:
    - Hats service to fetch, store & reset hat data and handle errors
    
## Improvements/Considerations

To fully complete this project to production standards, the items that I would address are:

- Fix the leading zero on the trip input field if value entered via keys
- Unit testing
- End 2 end testing
- Test cross browser/device & fix any issues
- Provide `<noscript>` content for browsers where JS is disabled
- Minify/Uglify the JS/CSS/HTML resources for smaller payload size
- Test app performance and make improvements where necessary
- Adjust/refactor code based on peer feedback

## Install

`npm install`

## Run application

`npm run server`

Visit [http://localhost:3000/]().

### License
This project is released under the [MIT license](https://github.com/nijk/hat-selector/blob/master/LICENSE).
