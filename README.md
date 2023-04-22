# Cat App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Learn More

- use redux to store
    - list of cats
    - detail of a cat
    - filters applied
    - sorting
    - favorite list
    - users custom images
- lazy load all images
- unit tests
    - 100% for reducers
    - some for action creators
    - 80% outside reducers
- public git repository
- readme how to build/run/test the project
- live url

Home Page
    - get all cat breeds
        - at least once every 30 minutes
    - list of cat cards (flex box)
        - image
        - name
        - lifespan
        - imperial weight
        - origin
        - favorite button overlay
        - onClick -> details page
    - sorting (default=name) (default=asc)
        - name
        - imperial weight
        - lifespan
        - origin
    - filter (multiple filters at once)
        - name
        - lifespan
        - favorited
        - imperial weight
        - origin
    - persist favorite cats across page reloads

Details Page
    - detail component
        - all information on previous page
        - temperament
        - adaptability
        - affection level
    - add/remove to favorite list
    - replace image with a custom (upload an image)
        - use local storage or index DB
        - add/remove custom image (revert to API image)
        - update a custom with another custom (overwrite)
        - should be displayed the custom image on Home page
