import axios, { AxiosResponse } from "axios"

export function URLInput(props: { setWords: any; children: any }): JSX.Element {
  const { setWords } = props
  const countWords = async (event: any) => {
    event.preventDefault()
    let res: AxiosResponse<any>;

    try {
      res = await axios({
        method: "post",
        url: '/api/counter',
        data: {
          url: event.target.name.value
        }
      })
      setWords([res.data])

    } catch (error) {
      /* eslint-disable no-console */
      console.log(error)
    }

    // result.user => 'Ada Lovelace'
  }

  return (
    <form onSubmit={countWords}>
      <label htmlFor="name">URL</label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <button type="submit">Count</button>
    </form>
  )
}