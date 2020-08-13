![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Shared Exercise Store

The goal of this project is to build a flexible and easily extendable platform for exercises.
Those exercises can then be loaded as web components into exercising apps or on educational websites.
By providing high-level components for common exercise types like multiple-choice, even educators with
few programming language should be able to create new exercises (introducing those components is a plan for the future).

# Creating exercises

## Adding translations

This project uses [i18next](https://www.i18next.com/) for translations. There are no global translation files, instead,
every exercise has its own translations. This makes sure that the client does not load translations for exercises that
are not displayed.

Put the translations inside `${pathToComponentFolder}/locales/${exerciseId}/`.

Add your translations folder to the assets of the component so that they will be included in the build.
```javascript
@Component({
  assetsDirs: ['locales/breadth-first-search']
})
```

Translations can be nested. If the following json was your translation file, you would reference the string "Hello World!"
through "messages.greeting".

```json
{
  "messages": {
    "greeting": "Hello World!"
  }
}
```

Import `i18next-wc` so that you can use [i18next's](https://www.i18next.com/) web components for translations. Also,
you'll need to call `loadTranslations` in the `componentWillLoad` method. I decided to load translations within `componentWillLoad`
because this is the first lifecycle method that gets called. Therefore, the loading of the translations will start very early 
which will reduce loading times. Remember to return or await the Promise returned by `loadTranslations` so that the compnent
knows when the translations are loaded and the component can be displayed. Otherwise, the component might be rendered
before the translations are available which would look weird. The following is a minimal example of a component with translations.

```tsx
import {setupTranslations} from '../../../utils/translations';
import i18next from 'i18next';
import 'i18next-wc';

@Component({
  tag: 'exercise-example',
  assetsDirs: ['locales/example']
})
export class Example implements ComponentInterface {
  componentWillLoad(): Promise<void> | void {
    return loadTranslations('example');
  }

  render() {
    return (
        <p>
          <intl-message i18next={i18next} label="messages.greeting">
          </intl-message>
        </p>
    );
  }
}
```

## Testing

To test your component run `npm install` and `npm start`. This will open the exercise picker component in the browser
where you can pick the exercise that should be displayed and manually tested.

