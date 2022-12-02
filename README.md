<img align="right" width="300" src="src/assets/matt-logo.svg">

# matt

> Moral Attitudes Study

---

## Development

todo

### URL Parameters

- `population`
-

### Adding Text

1. Create a new rectangle in Illustrator. Its size defines the bounding box of the text. Give this rectangle a name prefixed with text- (e.g., `text-objectChoiceRandom`). Use camelCase, avoid numbers.
2. Add a new key to all translation files within `src/populations/xx-xx/translation.ts`. Use the identical id as defined prior in Illustrator, yet, without the prefix (e.g., `objectChoiceRandom`).  
   The **value** should be a valid HTML text node (usually, you will use `<p>`, or `<h1>`, `<h2>`, etc.). For example:

```javascript
export const translation = {
	objectChoiceRandom: '<p>Select a single arbitrary object!</p>',
	objectChoiceMultiple: '<p>Select multiple objects!</p>',
};
```

1. The text will automatically appear at the defined location.

welcome: '<h1 class="heading">Willkommen und schön,<br>dass Du dabei bist!</h1>',
