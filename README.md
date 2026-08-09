# Breaking Bad Cast

A character browser for *Breaking Bad* and *Better Call Saul*, built on the
public [breakingbadapi](https://breakingbadapi.com). Search the roster and flip
a card to read the details.

**[Live demo →](https://breakingbadchars.vercel.app/)**

## Features

- Grid of character cards, portrait on the front
- **Flip on hover** — a CSS 3D transform turns the card to reveal its back
- Card back lists actor, nickname, birthday, status and how many seasons the
  character appears in
- Search by name, served by the API's own `?name=` filter
- Loading spinner while a request is in flight

## Stack

| | |
| --- | --- |
| Framework | React 18 (Create React App) |
| HTTP | axios |
| Styling | plain CSS (`transform-style: preserve-3d` for the flip) |
| Data | [breakingbadapi](https://breakingbadapi.com) |

## How it works

The whole app is one piece of state in `App.js`. A `useEffect` keyed on the
current query calls the API; `Search` lifts the query up and `CharacterGrid`
renders whatever came back.

```jsx
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      `https://www.breakingbadapi.com/api/characters?name=${query}`
    )
    setItems(result.data)
    setIsLoading(false)
  }
  fetchData()
}, [query])
```

`CharacterItem` is presentational — a `card-front` holding the image and a
`card-back` holding the list, rotated into view by CSS alone with no state
tracking which side is showing.

## Known limitations

Worth being explicit about, since this was an early learning project:

- **Search fires a request per keystroke.** The effect is keyed on `query` and
  the input updates it on every change, so typing "walter" issues six requests.
  Debouncing, or fetching the cast once and filtering in memory, would fix it —
  the dataset is small enough that either works.
- **No cancellation.** Responses can land out of order, so a slow early request
  can overwrite a fast later one. An `AbortController` in the effect's cleanup
  is the standard fix.
- **No error handling.** There is no `catch`; a failed request leaves the
  spinner up indefinitely, and there is no empty state for a search that
  matches nothing.
- **The flip is hover-only.** `.card:hover .card-inner` has no touch or focus
  equivalent, so on a phone — where most of the traffic to a demo like this
  actually lands — the entire back of the card is unreachable. Adding
  `:focus-within` and a tap-to-toggle class would fix both that and keyboard
  access.
- **Occupation is commented out** in `CharacterItem` — the API returns it as an
  array and rendering it was left unfinished.

## Running locally

```bash
git clone https://github.com/Vette1123/Breaking-Bad---React.git
cd Breaking-Bad---React
npm install
npm start
```

The app runs at `http://localhost:3000`. The API needs no key.

---

Built by [Mohamed Gado](https://mohamedgado.com) · 2022
