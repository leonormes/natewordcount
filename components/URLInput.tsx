import axios from "axios"

export function URLInput(props: any) {
  const {setWords}=props
  const countWords = async (event: any) => {
    event.preventDefault()
    let res;

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