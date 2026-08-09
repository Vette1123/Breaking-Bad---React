# Breaking Bad Cast

A character browser for *Breaking Bad* and *Better Call Saul*, built on the
public [breakingbadapi](https://breakingbadapi.com). Search the roster and get
back portraits, nicknames, occupations and status.

**[Live demo →](https://breakingbadchars.vercel.app/)**

## Features

- Character grid with portrait, name, nickname, occupation, status and season
  appearances
- Search by name, served directly by the API's `?name=` filter
- Loading spinner while a request is in flight
- Responsive grid that reflows from four columns down to one

## Stack

| | |
| --- | --- |
| Framework | React 18 (Create React App) |
| HTTP | axios |
| Styling | plain CSS |
| Data | [breakingbadapi](https://breakingbadapi.com) |

## How it works

The whole app is one piece of state in `App.js`. A `useEffect` keyed on the
current query calls the API, and `Search` and `CharacterGrid` are presentational
components below it — one lifts the query up, the other renders whatever came
back.

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

## Known limitations

Worth being explicit about, since this was an early learning project:

- **Search fires a request per keystroke.** The effect is keyed on `query` and
  `Search` updates it on every `onChange`, so typing "walter" issues six
  requests. Debouncing the input, or fetching the full cast once and filtering
  in memory, would both fix it — the API is small enough that either works.
- **No cancellation.** Because responses can land out of order, a slow early
  request can overwrite a fast later one. An `AbortController` tied to the
  effect's cleanup is the standard fix.
- **No error branch.** A failed request leaves the spinner up forever; there is
  no `catch` and no empty state.

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
