import {Title} from '../shared/ui';

export default function SecretRoom() {

  return(
    <>
      <Title
        text="Secret Room 🤙"
        size="4xl"
        shadow
        shadowText="Harry's Time"
      />
      <img src={`${import.meta.env.BASE_URL}/imgs/projects/secret.jpg`} alt="secret" />
      {'Congrats! You found Harry 🥸'}
    </>
  )
}