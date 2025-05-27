import './UserAvatar.css'

type UserAvatarProps = {
  img: string;
}

export default function UserAvatar({img}: UserAvatarProps) {

  return (
    <div className="user-avatar d-flex justify-c align-c">
      <img src={img} alt="user-avatar"/>
    </div>
  )
}
