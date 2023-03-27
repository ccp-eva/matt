<img align="right" width="300" src="logo/matt-logo.svg">

# matt

> Moral Attitudes Study

---

## In Active Developlment

This repo is on active development and changes on a daily basis. Things will break and other things are no yet documented. Check back at a later time when things are more robust (March 2022).

## Development & Customization

### URL Parameters

You can modify the experiment by attaching various URL parameters, for example:  
https://ccp-odc.eva.mpg.de/matt/?id=12345&culture=DE_urban&webcam=true&adult=true

Culture parameters are composed of a country code (i.e, [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (e.g., DE)) and a suffix (i.e., rural or urban). For example: `de-urban`

- `id`: subject id, defaults to `demo`
- `culture`: this loads slides, sounds, and texts; defaults to `de-urban`
- `agegroup`: changes audio and text, defaults to `child` (`child` | `adult`)
- `input`: `audio` | `text` | `userchoice` (default)

### How To Add A New Culture

1. If necessary add new layers to illustrator if need to change or adjust visuals (see link to how to)
2. Create a new folder unter cultures using ISO 3166-1 alpha-2 country codes (e.g., pe-rural)
3. Copy and Paste another the audio and video folder from another culture into your new culture.
4. Modify you audio and video files accordingly, keep files names to avoid coding adjustments
5. Add translation keys into `translations.ts`
6. Add the slider order in `config.yaml`
7. Make sure to set the culture parameter, as it defaults to de-urban and not your new culture, unless you change it in config.yaml

### How To Add New Slide

1. Open Illustrator
2. Create a new layer or copy another as a template
3. If you have images follow the steps in: [#### ♲ Recycle/Reuse Objects]
4. If have text follow the steps in: [...]
5. Arrage the texts and objects to your needs
6. When done, Make sure that all Layers are visible in Illustrator
7. Save your Ai
8. Save a SVG Copy using Cmd+Option+S or File ⮕ Save a Copy
9. Filename must be `experiment.svg` and you can replace the existing one
10. Exporting Options should look like this:

| ![](docs/asset-export-settings.png) |
| :---------------------------------: |
|    _Illustrator Export Settings_    |

11. Run `npm run voxify`
12. Add the Illustrator layer name to config.yaml
13. Create a new TypeScript file with the camelCased name of your Illustrator file within the procedure folder (e.g., my-slide become mySlide.ts). You can use the `sTemplate.ts` file as a template or even better: use a similar slide as template.
14. For debuggin open DevTools: Cmd+Option+I
15. Open `custom.d.ts` if you need to store new response data
16. Response data is globally stored in `data` object within DevTools
17. Run `npm start`

#### ❡ Adding Text

1. Create a new rectangle in Illustrator. Its size defines the bounding box of the text, yet not determines the text size. Text size can be controlled in CSS within `styles.css`. Give this rectangle a name prefixed with text- (e.g., `text-objectChoiceRandom`). Use camelCase, avoid numbers.
2. Add a new key to all translation files within `src/cultures/xx-xx/translation.ts`. Use the identical id as defined prior in Illustrator, yet, without the prefix (e.g., `objectChoiceRandom`).  
   The **value** should be a valid HTML text node (usually, you will use `<p>`, or `<h1>`, `<h2>`, etc.). For example:

```javascript
export const translation = {
	objectChoiceRandom: '<p>Select a single arbitrary object!</p>',
	objectChoiceMultiple: '<p>Select multiple objects!</p>',
};
```

3. The text will automatically appear at the defined location of your rectangle.

#### ♲ Recycle/Reuse Objects

If you use an SVG object more than once, and your object is a more complex shape (involving `path`), you may opt-in to use object recycling following this steps:

1. Identify the object(s) you want to reuse in your composition, and follow the next steps:
2. **(Optional)** Configure Asset Export Settings:

|  ![](docs/asset-export-settings.png)   |
| :------------------------------------: |
| _Asset Export Settings in Illustrator_ |

3. Export your target object as SVG (this will be your **link**ed reference) and PNG (this will be your **p**lace**h**older for target location and size. Put those two files into `/assets/` directory.
4. Uniquely rename both files (e.g., `child.svg` and `child.png`, respectively)
5. Within Illustrator, create squares (make sure they are squares with the same width/height) having your desired target size and location within your composition (you can add a fill to make them visible, avoid strokes). Use the shapes you exported as a tempalte for location and width/height.
6. Provide a unique id for the **p**lace**h**older square. **Prefix the id with `ph-`**. For example `ph-child`.
7. Since you created your placeholder squares, you can delete the prior exported SVG object from your SVG composition.
8. Drag and drop the PNG(!) file into Illustrator (this will automatically be a linked file).  
   _Note_: You don’t need to place the PNG file in your square or resize it to match its bounding box. It can be at any location in your composition. **Only the placeholder rectangle defines your target location and size**:

|     ![](docs/reuse-objects-placeholder-processing-steps.png)     |
| :--------------------------------------------------------------: |
| _No need to adjust the png file to match the bounding box size!_ |

9. Provide a unique id for the linked PNG file. **Prefix the id with `link-`**. For example: `link-child`.  
   _Note_: The ids for the placeholder square and linked PNG should be identical apart from their prefix (`ph-child` & `link-child`).
10. If you re-use an object multiple times, incorporate other naming strategies to guarantee naming uniqueness (e.g., `link-slide2-child` and `ph-slide2-child` respectively). Or, if you use the same object multiple times on the same slide/layer, start numerating it (e.g., `link-slide2-child1`, `link-slide2-child2`, and `ph-slide2-child1`, `ph-slide2-child2`, respectively)
11. Profit

For further (implementation) details, see this issue: [#53](https://github.com/ccp-eva/matt/issues/53).

### Deploy to GitHub Staging Site

1. Push everything to develop
2. Switch to `main` branch: `git switch main`
3. Merge latest changes from `develop` into `main`: `git merge develop`
4. `git status` should show that you are ahead of `origin/main`
5. push to main: `git push`
6. This will trigger a [GitHub Action](https://github.com/ccp-eva/matt/actions)
7. After 2 to 3 minutes the website is live here: https://ccp-eva.github.io/matt/

### Deploy to MPI Server

todo

## Contributions

### Voice-over speakers

`de-urban`: _Wilma Weigelt_ (wiweit@googlemail.com)
